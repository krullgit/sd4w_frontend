import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';


import {Observable} from 'rxjs';


@Injectable()
export class PlayApiService {
  baseUrl = 'http://localhost:9000/';

  constructor(private http: HttpClient) { }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
      }

      private extractData(res: Response) {
        let body = res.json();
              return body;
          }
  
  search(doc2:string,doc1:string) {
    //let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;

    return this.http.post(this.baseUrl,{
      "doc2":doc2,
      "doc1":doc1
    })

  }
  getNer(sentence:string) {
    return this.http.post(this.baseUrl+'getner',{
      "sentence":sentence
    })
  }

  
  getAnalogies(sentence:string) {
    return this.http.post(this.baseUrl+'getanalogies',{
      "sentence":sentence
    })
  }
}
