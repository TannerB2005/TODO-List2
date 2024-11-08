import { CanMatchFn, RedirectCommand, Routes, Router } from '@angular/router';
import { inject } from '@angular/core';

import { routes as userRoutes } from './users.routes'; //naming it as the name will cause a name clash, instead give it a alias that still shows how its split
import { NoTaskComponent } from '../tasks/no-task/no-task.component';
import { resolveTitle, resolveUserName, UserTasksComponent } from './user-tasks/user-tasks.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 1) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized')); 
}
export const routes: Routes = [
    { 
        path: '', // <your-domain>
        component: NoTaskComponent,
        title: 'No task selected'
    },
    {
        path: 'users/:userId', //<your-domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutes, //the children are in users.routes.ts
        canMatch: [dummyCanMatch],
        data: {
            message: 'Hello!'
        },
        resolve: {
            userName: resolveUserName
        },
        title: resolveTitle
    },
    {
        path: '**', //this is for a route that is not made
        component: NotFoundComponent,
    },
];