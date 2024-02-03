import {Inject, Injectable} from '@angular/core';
import {Favorites} from "../data/favorites";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    favoriteURL = 'api/favorites';
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private http: HttpClient) {
    }

    /*---------------------------------------------------------------------------------------------------
                                                Funktionen
    -----------------------------------------------------------------------------------------------------*/

    /** GET - Request: Holt alle Favoritenlisten vom Server */
    getFavorites(): Observable<Favorites[]> {
        return this.http.get<Favorites[]>(this.favoriteURL).pipe(
            catchError(this.handleError<Favorites[]>('getFavorites', []))
        );
    }

    /** GET - Request: Holt eine Favoritliste mit einer bestimmten ID vom Server */
    getFavorite(id: string): Observable<Favorites> {
        const url = `${this.favoriteURL}/${id}`;
        return this.http.get<Favorites>(url).pipe(
            catchError(this.handleError<Favorites>(`getFavorite id=${id}`))
        );
    }

    /** POST - Request: Fügt dem Server eine neue Favoritenliste hinzu */
    addFavorites(favorites: Favorites): Observable<Favorites> {
        return this.http.post<Favorites>(this.favoriteURL, favorites, this.httpOptions).pipe(
            catchError(this.handleError<Favorites>('addFavorites'))
        );
    }

    /** PUT - Request: Aktualisiert eine Favoritenliste auf dem Server */
    updateFavorites(favorites: Favorites): Observable<any> {
        return this.http.put(this.favoriteURL, favorites, this.httpOptions).pipe(
            catchError(this.handleError<any>('updateFavorites'))
        );
    }

    /** DELETE - Request: Entfernt eine Favoritenliste vom Server */
    deleteFavorites(id: string): Observable<Favorites> {
        const url = `${this.favoriteURL}/${id}`;

        return this.http.delete<Favorites>(url, this.httpOptions).pipe(
            catchError(this.handleError<Favorites>('deleteFavorites'))
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
