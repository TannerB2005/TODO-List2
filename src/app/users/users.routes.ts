// import { Routes } from "@angular/router";
// import { NewTaskComponent } from "../tasks/new-task/new-task.component";
// import { TasksComponent } from "../tasks/tasks.component";

// export const routes: Routes = [
//     {
//         path: '', //this will redirect to the tasks child route
//         redirectTo: 'tasks',
//         pathMatch: 'full'
//     },
//     {
//         path: 'tasks', // <your-domain>/users/<uid>/tasks
//         component: TasksComponent // child routes also do not get the context from the path like the parent does
//     },
//     {
//         path: 'tasks/new',
//         component: NewTaskComponent
//     }
// ]
import { Routes } from '@angular/router';

import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';
import { canLeaveEditPage, NewTaskComponent } from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks, 
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage]
  },
];
