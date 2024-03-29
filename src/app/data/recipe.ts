import {Ingredient} from "./ingredient";

export interface Recipe {
    id: string;
    name: string;
    preperation_time: string;
    total_time: string;
    photo: string;
    persons: number;
    ingredients: Ingredient[];
    steps: string[];
    created: string;
}
