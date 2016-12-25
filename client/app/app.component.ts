import { Component } from '@angular/core';
import { TodosComponent } from './component/todos.component';
import { TodoServices } from './services/todo.service';
import  { Http } from '@angular/http'

@Component({
 selector: 'app-root',
  templateUrl: 'app/app.component.html',
  
  providers :[TodoServices] 
 
})
export class AppComponent {
  title = 'app works!';
}
