import { Component } from '@angular/core';
import { TasksServiceService } from '../tasks-service.service';
import { Task } from '../task';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {



  form: FormGroup = new FormGroup ({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    priority_level: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    progress_level: new FormControl('', [Validators.required])

  });
 // getter methods
  get title(){
    return this.form.get('title');
  }
  get description(){
    return this.form.get('description');
  }
  get date(){
    return this.form.get('date');
  }
  get time(){
    return this.form.get('time');
  }
  get priority_level(){
    return this.form.get('priority_level');
  }
  get category(){
    return this.form.get('category');
  }
  get progress_level(){
    return this.form.get('progress_level');
  }


  constructor(private service: TasksServiceService, private router: Router){}



add_task() {
  let x = <Task>this.form.value;  //for new tasks, add time and date together for the time property
  x.time = x.date + ' ' + this.form.get('time')?.value;
  this.service.addTask(x).subscribe({
    next: (result: any) => {
      console.log(result.task.title + ' has been added successfully');
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
    }
  });
  this.form.reset();
 // this.router.navigate(['home']);
}


}
