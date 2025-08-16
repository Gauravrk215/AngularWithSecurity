import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DashrunnerService } from '../dashrunner.service';
import { DashboardContentModel } from 'src/app/models/builder/dashboard';
import { ActivatedRoute, Router } from '@angular/router';
import { Dashboard3Service } from 'src/app/services/builder/dashboard3.service';

@Component({
  selector: 'app-todo-runner',
  templateUrl: './todo-runner.component.html',
  styleUrls: ['./todo-runner.component.scss']
})
export class TodoRunnerComponent implements OnInit {
  @ViewChild('contentContainer') contentContainerRef!: ElementRef;
  @Output() buttonClicked = new EventEmitter<void>();
  constructor( private Dashtestservive:DashrunnerService,private route: ActivatedRoute,private dashboardService: Dashboard3Service,
    private router : Router) { }

    loading = false;
    givendata;
    error;
    XAxis;
    YAxis;
  
    editId;
    public DashtestboardArray: DashboardContentModel[] = [];
    workflowLine;
    TableName;

  list;
  data: any;
  todo: string = '';
  // todoList = ['todo 1'];
  todoList = {
    listName: "title123",
    List:['todo 1','todo 2'],
  }
  ngOnInit(): void {
    this.editId = this.route.snapshot.params.id;
    console.log(this.editId);
    // this.getbyId();

    this.dashboardService.getById(this.editId).subscribe((data)=>{
      console.log(data);
      this.workflowLine = data.dashbord1_Line[0].model;
      const dash = JSON.parse(this.workflowLine) ;
      // this.DashtestboardArray = dash.dashboard;
      // console.log(this.DashtestboardArray);

      const ChartObject = dash.dashboard.filter(obj => obj.name === "To Do Chart");
      console.log(ChartObject);
      for (let i = 0; i < ChartObject.length; i++) {
        const ids = this.Dashtestservive.gettodo();
        // console.log(ids);
        if (ids.includes(ChartObject[i].chartid)) {
          // If the chartid is already in the ids array, continue to the next iteration
          continue;
        }
        this.Dashtestservive.settodo(ChartObject[i].chartid);
        const id = ids[i];
        console.log(id);
      
        if (ChartObject[i].chartid === id) {
          this.TableName = ChartObject[i].table;
          this.XAxis = ChartObject[i].xAxis;
          this.YAxis = ChartObject[i].yAxis;
          console.log(this.TableName);
          this.Dashtestservive.getChartData(this.TableName,"Todo List",this.XAxis,this.YAxis).subscribe((Ldata) => {
            console.log(Ldata);
            this.todoList.listName = Ldata.listName;
            this.todoList.List = Ldata.List;
            
           },(error) => {
            console.log(error);
           });
          break; // No need to continue the loop once the correct placeholder is found
        }
      }
    });
  }





  public addTodo(todo: string) {
    this.todoList.List.push(todo);
    this.todo = ''; // Clear the input field after adding a todo
}

public removeTodo(todoIx: number) {
    if (this.todoList.List.length) {
        this.todoList.List.splice(todoIx, 1);
    }
}

generatePDFFile(){
  this.buttonClicked.emit();
  const content = this.contentContainerRef.nativeElement;
  const filename = 'Todolist.pdf'; // You can provide any desired filename here

  this.Dashtestservive.generatePDF(content, filename);
}
}
