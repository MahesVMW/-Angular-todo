import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators}from '@angular/forms'
import { Itask } from '../model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoform !:FormGroup;
  tasks:Itask []=[];
  inprogress :Itask []=[];
  done:Itask []=[];
  updateIndex!:any;
  isEditEnabled:boolean=false;
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
   this.todoform=this.fb.group({
    item:['',Validators.required]
   })
  }
  addTask(){
    this.tasks.push({
      description:this.todoform.value.item,
      done:false
    });
    this.todoform.reset();
  }
  
  onEdit(item:Itask, i: number){
      this.todoform.controls['item'].setValue(item.description);
      this.updateIndex = i;
      this.isEditEnabled=true;
  }
  updateTask(){
    this.tasks[this.updateIndex].description=this.todoform.value.item;
    this.tasks[this.updateIndex].done=false;
    this.todoform.reset();
    this.updateIndex=undefined;
    this.isEditEnabled=true;
    
  }
  deleteTask(i: number)
  {
    this.tasks.splice(i,1)
  }
  deleteinprogressTask(i: number)
  {
    this.inprogress.splice(i,1)
  }
  deletedoneTask(i: number)
  {
    this.done.splice(i,1)
  }
 
  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
