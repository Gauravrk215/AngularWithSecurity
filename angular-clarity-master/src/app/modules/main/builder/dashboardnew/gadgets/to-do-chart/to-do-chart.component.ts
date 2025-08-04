import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do-chart',
  templateUrl: './to-do-chart.component.html',
  styleUrls: ['./to-do-chart.component.scss']
})
export class ToDoChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  data: any;
  todo: string;
  todoList = ['todo 1'];

  public addTodo(todo: string) {
    this.todoList.push(todo);
}

public removeTodo(todoIx: number) {
    if (this.todoList.length) {
        this.todoList.splice(todoIx, 1);
    }
}
}
