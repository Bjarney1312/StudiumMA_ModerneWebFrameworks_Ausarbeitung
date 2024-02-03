import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Recipe} from "../data/recipe";
import {Favorites} from "../data/favorites";

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

    /**
     * Erstellt eine Datenbank mit Beispielrezepten für die Anwendung.
     */
    createDb() {
        let recipes: Recipe [] = [
            {
                "id": "0",
                "name": "Hühner-Kokos-Suppe",
                "preperation_time": "15 Minuten",
                "total_time": "30 Minuten",
                "photo": "https://i.ibb.co/tqyXVyB/Huehner-Kokos-Suppe.jpg",
                "persons": 2,
                "ingredients": [
                    {
                        "ingredient": "Limette",
                        "amount": 1,
                        "unit": "Stk."
                    },
                    {
                        "ingredient": "Karotten",
                        "amount": 2,
                        "unit": "Stk."
                    },
                    {
                        "ingredient": "Blumenkohl",
                        "amount": 200,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Hähnchenbrutstfilet",
                        "amount": 200,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Zitronengrasstängel",
                        "amount": 1,
                        "unit": "Stk."
                    },
                    {
                        "ingredient": "Rapsöl",
                        "amount": 1,
                        "unit": "TL"
                    },
                    {
                        "ingredient": "Gemüsebrühe",
                        "amount": 500,
                        "unit": "ml"
                    },
                    {
                        "ingredient": "Kokosmilch",
                        "amount": 5,
                        "unit": "EL"
                    },
                    {
                        "ingredient": "Trockene Mie-Nudeln",
                        "amount": 80,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Erbsen (TK)",
                        "amount": 50,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Salz und Pfeffer",
                        "amount": 1,
                        "unit": ""
                    }
                ],
                "steps": [
                    "1 TL Limettenschale abreiben und Limettenhälfte auspressen. Karotten schälen und in feine Streifen schneiden. Blumenkohl waschen und in kleine Röschen teilen. Zitronengras waschen. Hähnchenbrustfiltet trocken tupfen und in Streifen schneiden.",
                    "Öl in einem Topf auf mittlerer Stufe erhitzen, Karotten, Blumenkohl und Zitronengras darin ca. 3 Minuten anschwitzen und mit Brühe und Kokosmilch ablöschen. Hähnchenbrust dazugeben und 10-12 Minuten garen.",
                    "Nudeln und Erbsen ca. 5 Minuten vor Ende der Garzeit dazugeben und mitgaren. Zitronengras entfernen, Suppe mit Salz und Pfeffer abschmecken und mit 1 TL Limettensaft und Limettenschale verfeinern. Hühner-Koko-Suppe servieren."
                ],
                "created": "03.02.2024"
            },
            {
                "id": "1",
                "name": "Kartoffelsuppe mit Hackbällchen",
                "preperation_time": "20 Minuten",
                "total_time": "50 Minuten",
                "photo": "https://i.ibb.co/TPd0W4k/Kartoffelsuppe.jpg",
                "persons": 4,
                "ingredients": [
                    {
                        "ingredient": "mehligkochende Kartoffeln",
                        "amount": 600,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Karotten",
                        "amount": 400,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Zwiebel",
                        "amount": 1,
                        "unit": "Stk."
                    },
                    {
                        "ingredient": "Bund Schnittlauch",
                        "amount": 1,
                        "unit": "Stk."
                    },
                    {
                        "ingredient": "Tatar",
                        "amount": 400,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Olivenöl",
                        "amount": 1,
                        "unit": "TL"
                    },
                    {
                        "ingredient": "Gemüsebrühe",
                        "amount": 1.5,
                        "unit": "l"
                    },
                    {
                        "ingredient": "Paniermehl",
                        "amount": 1,
                        "unit": "EL"
                    },
                    {
                        "ingredient": "Crème légère",
                        "amount": 100,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Salz und Pfeffer",
                        "amount": 1,
                        "unit": ""
                    }
                ],
                "steps": [
                    "Kartoffeln, Karotten und Zwiebel schälen und in Würfel schneiden. Schnittlauch waschen, trocken schütteln und in Ringe schneiden. Öl in einem Topf auf mittlerer bis hoher Stufe erhitzen und Gemüse darin ca. 5 Minuten anbraten. Mit Brühe ablöschen und ca. 15 Minuten köcheln lassen.",
                    "Tatar mit 2 TL Schnittlauch und Paniermehl vermischen, mit Salz und Pfeffer würzen und zu 16 kleinen Bällchen formen. Crème légère zur Suppe geben, pürieren und mit Salz und Pfeffer abschmecken. Hackbällchen zufügen und in der Suppe 8-10 Minuten garen. Kartoffelsuppe mit restlichem Schnittlauch garnieren und servieren.",
                ],
                "created": "03.02.2024"
            },
            {
                "id": "2",
                "name": "Gemüsecouscous mit Hähnchenbrust",
                "preperation_time": "25 Minuten",
                "total_time": "40 Minuten",
                "photo": "https://i.ibb.co/nmLqjH0/Gemuesecouscous.jpg",
                "persons": 2,
                "ingredients": [
                    {
                        "ingredient": "rote Paprika",
                        "amount": 1,
                        "unit": "Stk."
                    },
                    {
                        "ingredient": "Staudensellerie",
                        "amount": 1,
                        "unit": "Stk."
                    },
                    {
                        "ingredient": "Zwiebel",
                        "amount": 1,
                        "unit": "Stk."
                    },
                    {
                        "ingredient": "Mangold",
                        "amount": 200,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Hähnchenbrustfilet",
                        "amount": 240,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Olivenöl",
                        "amount": 1,
                        "unit": "TL"
                    },
                    {
                        "ingredient": "trockener Couscous",
                        "amount": 100,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Gemüsebrühe",
                        "amount": 300,
                        "unit": "ml"
                    },
                    {
                        "ingredient": "Limettensaft",
                        "amount": 1,
                        "unit": "EL"
                    },
                    {
                        "ingredient": "Kreuzkümmel, Salz und Pfeffer",
                        "amount": 1,
                        "unit": ""
                    }
                ],
                "steps": [
                    "Zwiebel schälen. Paprika waschen und entkernen. Staudensellerie waschen und mit Zwiebel und Paprika würfeln. Mangold waschen, trocken schleudern, Blätter in feine Streifen und Stiele in Würfel schneiden. Hähnchenbrustfilet trocken tupfen und in Streifen schneiden.",
                    "Öl in einer Pfanne auf hoher Stufe erhitzen, Hähnchenbrust darin ca. 5 Minuten rundherum braten, mit Salz und Pfeffer würzen und herausnehmen. Zwiebeln, Paprika, Staudensellerie und Mangoldwürfel im Bratensatz auf mittlerer Stufe ca. 5 Minutenbraten.",
                    "Couscous und Mangoldstreifen dazugeben, mit Brühe und Limettensaft ablöschen und ca. 5 Minuten köcheln lassen. Hähnchen dazugeben und kurz erwärmen. Gemüsecouscous mit Kreuzkümmel, Salz und Pfeffer würzen und servieren."
                ],
                "created": "03.02.2024"
            },
            {
                "id": "3",
                "name": "Orientalischer Reissalat",
                "preperation_time": "15 Minuten",
                "total_time": "35 Minuten",
                "photo": "https://i.ibb.co/HgN2yvH/Reissalat.jpg",
                "persons": 1,
                "ingredients": [
                    {
                        "ingredient": "trockener Langkornreis",
                        "amount": 70,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Kurkuma",
                        "amount": 1,
                        "unit": "TL"
                    },
                    {
                        "ingredient": "Cocktailtomaten",
                        "amount": 150,
                        "unit": "g"
                    },
                    {
                        "ingredient": "Salatgurke",
                        "amount": 0.5,
                        "unit": "Stk."
                    },
                    {
                        "ingredient": "Römersalatherz",
                        "amount": 1,
                        "unit": "Stk."
                    },
                    {
                        "ingredient": "Sesamöl",
                        "amount": 1,
                        "unit": "TL"
                    },
                    {
                        "ingredient": "Paprikapulver",
                        "amount": 0.5,
                        "unit": "TL"
                    },
                    {
                        "ingredient": "Limettensaft",
                        "amount": 2,
                        "unit": "TL"
                    },
                    {
                        "ingredient": "Kreuzkümmel",
                        "amount": 0.25,
                        "unit": "TL"
                    },
                    {
                        "ingredient": "Rosinen",
                        "amount": 2,
                        "unit": "TL"
                    },
                    {
                        "ingredient": "Salz und Pfeffer",
                        "amount": 1,
                        "unit": ""
                    }
                ],
                "steps": [
                    "Reis nach Packungsanweisung in Saltwasser mit 1/2 TL Kurkuma garen und abkühlen lassen. Tomaten waschen und halbieren. Gurke waschen und würfeln. Salat waschen, trocken schleudern und in feine Streifen schneiden.",
                    "Reis mit Öl, restlichem Kurkuma, Paprikapulver, Limettensaft und Kreuzkümmel verrühren und mit Salz und Pfeffer würzen. Tomaten, Gurken, Rosinen und Salat unterheben und mit Salz und Pfeffer abschmecken. Orientalischen Reissalat servieren."
                ],
                "created": "03.02.2024"
            },
        ];

        let favorites: Favorites[] = [
            {
                "id": "1",
                "favorite_recipe_ids": ["0"],
            }
        ];

        if (localStorage.getItem('recipes') !== null && localStorage.getItem('favorites') !== null) {
            recipes = JSON.parse(<string>localStorage.getItem('recipes')) || []
            favorites = JSON.parse(<string>localStorage.getItem('favorites')) || []
            return {recipes, favorites};
        } else {
            localStorage.setItem('recipes', JSON.stringify(recipes))
            localStorage.setItem('favorites', JSON.stringify(favorites))
            return {recipes, favorites};
        }
    }
}
