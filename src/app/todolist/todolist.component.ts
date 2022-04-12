import { Component, OnInit } from '@angular/core';

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



  newTodoForm  = this.formBuilder.group({
    itemName:''
  })


  constructor(
    private formBuilder:FormBuilder, private alertService:AlertService
  ) { }
 

 

  ngOnInit(): void {

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
