import {Continents} from "./continents.enum";
import {Seasons} from "./seasons.enum";

export interface IDestination {
    _id: string,
    __v: number,
    city: string,
    continent: Continents,
    country: string,
    range: {
        startDate: string,
        endDate: string
    },
    rating: number,
    season: {
        type: Seasons,
        degrees: number
    }
}