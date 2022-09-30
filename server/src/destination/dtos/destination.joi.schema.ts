import * as Joi from "joi";
import { Continents } from "./continents.enum";
import { Seasons } from "./seasons.enum";

export const GetDestinationsJoiSchema = Joi.object({
  month: Joi.number().integer().min(1).max(12).required(),
  continents: Joi.alternatives(
    Joi.string().valid(...Object.values(Continents)),
    Joi.array().items(...Object.values(Continents))
  ).default(Object.values(Continents)),
  seasons: Joi.alternatives(
    Joi.string().valid(...Object.values(Seasons)),
    Joi.array().items(...Object.values(Seasons))
  ).default(Object.values(Seasons)),
});
