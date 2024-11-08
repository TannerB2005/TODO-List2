import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { RouterLink, Router, CanDeactivate, CanDeactivateFn } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false
  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted = true;

    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true, //continue on 16
    });
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.submitted) {
    return true; // this checks if you are using the submit button instead of the cancel button, if you are it will automatically return true
  }
  if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()) {
    return window.confirm('Do you really want to leave? You will lose the entered data.')
  }
  return true;
}
//this guard will return true if there is no value, if there is value it will ask if you want to