import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment } from '../../environments/environment';
import { Quote } from '../quote-class/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteRequestService {
  
  quote!: Quote;

  constructor(private http:HttpClient) {
    this.quote=new Quote("","",0,"");
   }

   quoteRequest(){
     interface ApiResponse{
       quote:string;
       author:string;
       id:number;
        permalink:string;
     }
     let promise = new Promise((resolve,reject)=>{
       this.http.get<ApiResponse>(environment.apiUrl).subscribe(response=>{
         this.quote.quote = response.quote
         this.quote.author = response.author
         this.quote.id = response.id
         this.quote.permalink = response?.permalink
         resolve(0)
       },
       error=>{
         this.quote.quote = "Never, never, never give up"
         this.quote.author = "Winston Churchill"
         this.quote.id = 0
         this.quote.author = "http://"

         reject(error)
       })
     })
     return promise
   }
}
