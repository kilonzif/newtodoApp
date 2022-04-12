import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../quote-class/quote'

// import Alert service
import { AlertService } from '../alert-service/alert.service';



//import Tasks Class from TaskLists


import  { Tasks } from '../data/TaskList';


import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit {

  //instance of class
  taskItems:Tasks[]=[
    new Tasks(1,'Attend morning standup',true),
    new Tasks(2,'Attend evening checkout',false),
  ];

  taskList:any[]=[];
  quote!:Quote;



  newTodoForm  = this.formBuilder.group({
    itemName:''
  })


  constructor(
    private formBuilder:FormBuilder, private alertService:AlertService, private http:HttpClient
  ) { 

  }
 

 

  ngOnInit(): void {
      interface ApiResponse{
        author:string;
        quote:string;
        id:number;
        permalink:string;
      
      }     
  
      this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
        // Succesful API request
        this.quote = new Quote(data.author, data.quote, data.id,data.permalink)
      },err=>{
          this.quote = new Quote("Winston Churchill","Never never give up!",0,"")
          console.log("An error occurred")    
      })     

  }
  
  completed:boolean =false;

  addTask(){
    
    let val =this.newTodoForm.value.itemName

    this.taskList.push({
      id:this.taskList,name:val,completed:false
    });

    console.log(this.taskList);
    this.newTodoForm.reset();
  }


  deleteTask(index:any){
    this.alertService.alertMe("The Todo Item has been deleted");
    this.taskList.splice(index,1);

  }

  

  markAsDone(todo:any){
    //strikethrough
    todo.completed = true;
    todo.completed === true ?
          this.taskList.push(this.taskList.splice(this.taskList.indexOf(todo), 1)[0]) :
          this.taskList.unshift(this.taskList.splice(this.taskList.indexOf(todo), 1)[0])
    console.log(todo);
  }


  /** Using Classes */

  addTaskItem (){
    let newItem =this.newTodoForm.value.itemName
    this.taskItems.push(new Tasks(3,newItem,false) );
    console.log(this.taskItems);
    
    this.newTodoForm.reset();
  }





}
