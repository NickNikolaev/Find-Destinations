import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import * as Double from "@mongoosejs/double";

export type DestinationDocument = Destination & Document;

@Schema()
export class Destination {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  lat: Double;

  @Prop()
  lon: Double;

  @Prop()
  continent: string;

  @Prop({ type: Object })
  country: {
    isoCode: string;
    name: string;
  };

  @Prop()
  rating: number;

  @Prop()
  weather: [
    {
      season: string;
      month: number;
      averageTemperature: Double;
    }
  ];
}

export const DestinationMongooseSchema =
  SchemaFactory.createForClass(Destination);
