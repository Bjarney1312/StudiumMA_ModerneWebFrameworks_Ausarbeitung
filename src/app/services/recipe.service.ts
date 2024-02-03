import { Injectable } from '@angular/core';
import {Recipe} from "../data/recipe";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeURL = 'api/recipes';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  /*---------------------------------------------------------------------------------------------------
                                                Funktionen
  -----------------------------------------------------------------------------------------------------*/

  /** GET - Request: Holt alle Rezepte vom Server */
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeURL).pipe(
      catchError(this.handleError<Recipe[]>('getRecipes', []))
    );
  }

  /** GET - Request: Holt ein Rezept mit einer bestimmten ID vom Server */
  getRecipe(id: string): Observable<Recipe> {
    const url = `${this.recipeURL}/${id}`;
    return this.http.get<Recipe>(url).pipe(
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  /** PUT - Request: Aktualisiert ein Rezept auf dem Server */
  updateRecipe(recipe: Recipe): Observable<any> {
    return this.http.put(this.recipeURL, recipe, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateRecipe'))
    );
  }

  /** POST - Request: Fügt dem Server ein neues Rezept hinzu */
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipeURL, recipe, this.httpOptions).pipe(
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  /** DELETE - Request: Entfernt ein Rezept vom Server */
  deleteRecipe(id: string): Observable<Recipe> {
    const url = `${this.recipeURL}/${id}`;

    return this.http.delete<Recipe>(url, this.httpOptions).pipe(
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  /** GET - Request: Sucht nach einem Rezept mit einem bestimmten Nachnamen */
  searchRecipes(term: string): Observable<Recipe[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Recipe[]>(`${this.recipeURL}/?name=${term}`).pipe(
      catchError(this.handleError<Recipe[]>('searchRecipes', []))
    );
  }

  /**
   * Handler für fehlgeschlagene HTTP-Requests. Die Applikation wird fortgesetzt.
   *
   * @param operation - Name der Operation die fehlgeschlagen ist.
   * @param result - Optional als Ergebnis für das Observable
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
