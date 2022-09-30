import { Injectable } from "@nestjs/common";
import {
  Destination,
  DestinationDocument,
} from "./dtos/destination.mongoose.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class DestinationService {
  constructor(
    @InjectModel(Destination.name)
    private destinationModel: Model<DestinationDocument>
  ) {}

  /**
   * Create destination
   * @param body
   */
  createDestination(body: Destination): Promise<Destination> {
    const destination = new this.destinationModel({
      continent: body.continent,
      country: body.country,
      rating: body.rating,
    });
    return destination.save();
  }

  /**
   * Query destinations
   * @param query
   */
  async queryDestinations(query) {
    // Filter destinations by continent
    const filter = {
      continent: {
        $in: Array.isArray(query.continents)
          ? query.continents
          : [query.continents],
      },
    };
    const destinations = await this.destinationModel.find(filter).lean();

    // Filter destinations by season and Map destination.weather to single object
    return destinations
      .filter((destination) => {
        // If query.seasons is array -> Leave it, Else -> convert it to one
        const seasonsArray = Array.isArray(query.seasons)
          ? query.seasons
          : [query.seasons];

        // Get destinations, whose season includes query.seasons
        return seasonsArray.includes(
          destination.weather.at(query.month - 1).season
        );
      })
      .map((destination) => ({
        ...destination,
        weather: destination.weather.at(query.month - 1),
      }));
  }
}
