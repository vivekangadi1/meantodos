import { Component,OnInit } from '@angular/core';
import { TodoServices } from '../services/todo.service';
import  'rxjs/add/operator/map';
import { Todo } from '../todo';
@Component({
  moduleId:module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html'
})
export class TodosComponent implements OnInit {
  title = 'todos works!';
  todos:Todo[];
  constructor(private _todoServices:TodoServices){

  }
  ngOnInit(){

    this.todos=[];
    this._todoServices.getTodos()
      .map(res =>res.json())
      .subscribe(todos=>this.todos=todos)
  }
  addTodo($event:any,todoText:String){
      if($event.which === 1){
        let result : any ;
        let newTodo:any ={
          text:todoText,
          isCompleted:false
        }
        result = this._todoServices.saveTodo(newTodo);
        result.subscribe( x => {
          this.todos.push(newTodo)
          todoText="";
        })
      }
  }
  updateStatus(todo:any){
    var _todo={
       _id : todo._id,
      text  : todo.text,
      isCompleted:!todo.isCompleted
        };
        this._todoServices.updateTodo(_todo).map(res=>res.json()).subscribe(data =>{
          todo.isCompleted=!todo.isCompleted;
        });
  }
  setEditState(todo, state){
    if(state){
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }
  
  updateTodoText($event, todo){
    if($event.which === 13){
      todo.text = $event.target.value;
      var _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };
      
      this._todoService.updateTodo(_todo)
      .map(res => res.json())
      .subscribe(data => {
        this.setEditState(todo, false);
      });
    }
  }
  deleteTodo(todo:any){
    var todos = this.todos;

    this._todoServices.deleteTodo(todo._id).map(res => res.json()).subscribe(data =>{
      if(data.n==1){
        for(var i=0;i<todos.length;i++){
          if(todos[i]._id==todo._id){
            todos.splice(i,1)
          }
        }
      }
    })
  }
}
