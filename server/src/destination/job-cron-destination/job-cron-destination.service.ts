import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Cron, CronExpression } from "@nestjs/schedule";
import {
  Destination,
  DestinationDocument,
} from "../dtos/destination.mongoose.schema";
import { lastValueFrom } from "rxjs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class JobCronDestinationService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Destination.name)
    private destinationModel: Model<DestinationDocument>
  ) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async updatePreviousMonthDestinationWeather() {
    const previousMonth =
      new Date().getMonth() === 0 ? 1 : new Date().getMonth();

    // Get all destinations
    const allDestinationsResponse = await lastValueFrom(
      this.httpService.get(`${process.env.LOCAL_SERVER_HOST}/destinations`, {
        params: { month: previousMonth },
      })
    );

    // Go through every destination
    for await (const destination of allDestinationsResponse.data.data) {
      // Get monthly data for the current destination
      console.log("destination", destination);
      const monthlyAggregationResponse = await lastValueFrom(
        this.httpService.get(process.env.OPENWEATHER_API_MONTHLY_AGGREGATION, {
          params: {
            lat: destination.lat,
            lon: destination.lon,
            month: previousMonth,
            appid: process.env.OPENWEATHER_API_KEY,
          },
        })
      );
      const averageTemperature =
        monthlyAggregationResponse.data.result.temp.mean;

      // Find destination by id and Update it
      const filter = destination._id;
      const update = {
        $set: {
          [`weather.${previousMonth - 1}`]: {
            month: previousMonth,
            season: destination.weather.season,
            averageTemperature,
          },
        },
      };
      await this.destinationModel.findByIdAndUpdate(filter, update);
    }
  }
}
