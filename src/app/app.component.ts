import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ElasticSearchService } from './elasticsearch.service';
import { PlayApiService } from './play-api.service';
import {FormControl} from '@angular/forms';

import { Sentences } from './sentences';
import { Sentence } from './sentence';
import { querySample } from './querySample';

//import { querySample } from './querySample';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';


@
Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  
  sentences: Sentences[];
  sentence: Sentence[] = [];
  sliderValue: number = 75;
  howManyDocuments: number = 1;

  isOpen: boolean = false

  playtest:String;
  status: string;

  stateCtrl: FormControl;
  /*sentenceCtrl: FormControl;*/
  filteredStates: Observable<any[]>;
  /*filteredSentence: Observable<any[]>;*/

  currentValue = "";
  currentValueNER = "";
  currentValueAnalogies = "";
  thumbLabel = true;

  querySamples: querySample[] = [
    {
      _query: "Car crashes in New York.",
    },
    {
      _query: "Fashion in Paris.",
    },
    {
      _query: "Car chase New York.",
    },
    {
      _query: "Steel industry America.",
    },
    {
      _query: "Street car race.",
    },
    {
      _query: "China's coal industry.",
    },
    {
      _query: "Enterprise acquisition in New York.",
    }
    

  ];

  

  constructor(private es: ElasticSearchService, private play: PlayApiService, private cd: ChangeDetectorRef){
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(query => query ? this.filterQueries(query) : this.querySamples.slice())
    );
    /*this.sentenceCtrl = new FormControl();
    this.filteredSentence = this.sentenceCtrl.valueChanges
    .pipe(
      map(sentence => this.filterSentence("query"))
    )*/
  }
  filterQueries(name: string) {

    return this.querySamples.filter(query =>
      query._query.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  /*filterSentence(name: string) {
    console.log(this.sentence)
    return this.sentence
  }*/

  ngOnInit(): void {
      this.es.isAvailable().then(() => {
          this.status = "OK"
      }, (err) => {
          this.status = "ERROR"
          console.error('Server is down', err);
      }).then(() => {
        //elasticsearch
        this.cd.detectChanges();
      })
    }


    deleteContent(){
      this.sentence = []
    }

    getcurrentValue(){
      if(!(this.currentValue=="")){
        return "<span>query: </span>"+"<h3>"+this.currentValue+"</h3>"
      }
    }
    getcurrentValueNER(){
      if(!(this.currentValueNER=="")){
        return "<span>NER + lemma + lowercase: </span>"+"<h3>"+this.currentValueNER.trim()+"</h3>"
      }
    }
    getcurrentValueAnalogies(){
      if(!(this.currentValueAnalogies=="")){
        return "<span>analogies: </span>"+"<h3>"+this.currentValueAnalogies+"</h3>"
      }
    }



    setcurrentValue(value:string){
      this.play.getNer(value).subscribe(result=>{
        let parsedJSON = JSON.parse(JSON.stringify(result));
        this.currentValueNER = parsedJSON})
      this.play.getAnalogies(value).subscribe(result=>{
        let parsedJSON = JSON.parse(JSON.stringify(result));
        this.currentValueAnalogies = parsedJSON})
      this.currentValue = value
    }


    getOpacity(op:number){
      if(op == 0){
        return 'inherit'        
      }else{
      return 'rgba(237, 20, 61,'+(op)+')'
      }
    }

    

    getSimilarities(query:string): void{
      let matches = {"match":{"nerNorm":query}}
      this.es.search(matches,this.howManyDocuments)
      .then((val)=>this.sentences = val.hits.hits)
      .catch((err)=>console.log("error while parsing: ",err))
      .then((val)=> {
        this.sentences.forEach(sentence=>{
          this.play.search(sentence._source["text"]["string"],query).subscribe(result=>{
          let parsedJSON = JSON.parse(JSON.stringify(result));
         parsedJSON.forEach(element => {
          if(element[1]*100>this.sliderValue){
            const sentences=sentence._source["text"]["string"]
            const id = sentence._source["id"]
            const sentenceNEW = element[0].map(x=>{
              console.log(x[0])
              return [x[0].replace('\\ n', '<br>'),x[1]]
            })
            const originalSentence = element[2]
            
            
            
            //.replace(/\\n/g, '<br>')
            const similarity = Math.round((element[1]*100)*100)/100
             this.sentence.unshift(new Sentence(sentences,sentenceNEW,id,similarity,originalSentence))
          }
         });
          })
      })
      })
    }

     
      //this.sentences = [{ "id": 0, "text": "Satz1" },{ "id": 1, "text": "Satz2" }];
  
    }
