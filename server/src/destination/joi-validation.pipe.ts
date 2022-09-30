import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import * as Joi from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(query) {
    // Validate joi schema
    const { value, error } = Joi.compile(this.schema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(query);

    // If error -> Throw it
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      throw new BadRequestException(errorMessage);
    }

    // Add value to request query
    Object.assign(query, value);
    return value;
  }
}
