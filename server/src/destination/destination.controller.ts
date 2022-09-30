import { Body, Controller, Get, Post, Query, UsePipes } from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { Destination } from "./dtos/destination.mongoose.schema";
import { JoiValidationPipe } from "./joi-validation.pipe";
import { GetDestinationsJoiSchema } from "./dtos/destination.joi.schema";

@Controller("destinations")
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  async createDestination(@Body() body: Destination): Promise<{
    success: boolean;
    data: Destination;
  }> {
    // Create destination
    const destination = await this.destinationService.createDestination(body);

    // Return response
    return { success: true, data: destination };
  }

  @Get()
  @UsePipes(new JoiValidationPipe(GetDestinationsJoiSchema))
  async getDestinations(@Query() query) {
    // Query destinations
    const destinations = await this.destinationService.queryDestinations(query);

    // Return response
    return { success: true, data: destinations };
  }
}
