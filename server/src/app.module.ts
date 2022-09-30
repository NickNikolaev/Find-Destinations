import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DestinationController } from "./destination/destination.controller";
import { DestinationService } from "./destination/destination.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Destination,
  DestinationMongooseSchema,
} from "./destination/dtos/destination.mongoose.schema";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { JobCronDestinationService } from "./destination/job-cron-destination/job-cron-destination.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGODB_DATABASE_NAME,
    }),
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationMongooseSchema },
    ]),
  ],
  controllers: [AppController, DestinationController],
  providers: [AppService, DestinationService, JobCronDestinationService],
})
export class AppModule {}
