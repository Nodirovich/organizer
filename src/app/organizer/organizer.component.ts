import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksService, Task } from '../shared/tasks.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup
  tasks: Task[] = []

  constructor(public dateService: DateService, private tasksService: TasksService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })

    this.dateService.date.pipe(
      switchMap(value => this.tasksService.loadTasks(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })
  }

  submit() {
    const {title} = this.form.value

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.tasksService.create(task).subscribe(task => {
      this.tasks.push(task)
      this.form.reset()
    }, err => console.error(err))

    this.form.value.title = ''
  }

  remove(task) {
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter( t => t.id !== task.id)
    }, err => console.error(err))
  }

}
