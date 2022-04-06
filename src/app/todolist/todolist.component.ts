import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  taskList:any[]=[]
  newTodoForm  = this.formBuilder.group({
    itemName:''
  })


  constructor(
    private formBuilder:FormBuilder
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


}
