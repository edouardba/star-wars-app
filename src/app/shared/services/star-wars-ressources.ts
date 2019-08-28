import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StarWarsApi } from 'src/environments/config';

@Injectable()
export class StarWarsRessourcesService {

    constructor(private _http: HttpClient){}

    getAllRessources(): Observable<any> {
        return this._http.get<any>(StarWarsApi.GetAll);        
    }

    onSearch(ressource: String, search): Observable<any[]> {
        return this._http.get<any[]>(StarWarsApi.GetAll + ressource,
        {
            params: {
                search : search
            }
        })
    }

    getDetails(ressource: String, url: string): Observable<any> {
        return this._http.get<any>(url);
    }

}