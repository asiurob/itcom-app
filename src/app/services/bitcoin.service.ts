import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_BACKEND } from '../globals/variables';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor( public _http: HttpClient ) { }

  // CONSTRUIMOS LA PETICIÓN PARA PEDIR LA INFORMACIÓN
  BitcoinData( lapsus: String ): Observable<any> {
    if ( lapsus && lapsus.trim() !== '' ) {
      return this._http.get( `${ URL_BACKEND }/bitcoin-data/${ lapsus }` )
      .pipe(
        catchError( ( err: any ) => {
          console.log( err );
          // SI HAY UN ERROR EN EL HTTP SE MOSTRARÁ UN ERROR
          alert( `Error en la petición ( ${ err.status } - ${ err.error.message || err.statusText } )` );
          return throwError( err );
        }));
    }
  }
}
