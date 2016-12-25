"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var todo_service_1 = require("../services/todo.service");
require("rxjs/add/operator/map");
var TodosComponent = (function () {
    function TodosComponent(_todoServices) {
        this._todoServices = _todoServices;
        this.title = 'todos works!';
    }
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todos = [];
        this._todoServices.getTodos()
            .map(function (res) { return res.json(); })
            .subscribe(function (todos) { return _this.todos = todos; });
    };
    TodosComponent.prototype.addTodo = function ($event, todoText) {
        var _this = this;
        if ($event.which === 1) {
            var result = void 0;
            var newTodo_1 = {
                text: todoText,
                isCompleted: false
            };
            result = this._todoServices.saveTodo(newTodo_1);
            result.subscribe(function (x) {
                _this.todos.push(newTodo_1);
                todoText = "";
            });
        }
    };
    TodosComponent.prototype.updateStatus = function (todo) {
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        this._todoServices.updateTodo(_todo).map(function (res) { return res.json(); }).subscribe(function (data) {
            todo.isCompleted = !todo.isCompleted;
        });
    };
    TodosComponent.prototype.setEditState = function (todo, state) {
        if (state) {
            todo.isEditMode = state;
        }
        else {
            delete todo.isEditMode;
        }
    };
    TodosComponent.prototype.updateTodoText = function ($event, todo) {
        var _this = this;
        if ($event.which === 13) {
            todo.text = $event.target.value;
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            this._todoService.updateTodo(_todo)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.setEditState(todo, false);
            });
        }
    };
    TodosComponent.prototype.deleteTodo = function (todo) {
        var todos = this.todos;
        this._todoServices.deleteTodo(todo._id).map(function (res) { return res.json(); }).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < todos.length; i++) {
                    if (todos[i]._id == todo._id) {
                        todos.splice(i, 1);
                    }
                }
            }
        });
    };
    return TodosComponent;
}());
TodosComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'todos',
        templateUrl: 'todos.component.html'
    }),
    __metadata("design:paramtypes", [todo_service_1.TodoServices])
], TodosComponent);
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map