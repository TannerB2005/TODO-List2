import { Component, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
   userName = input.required<string>();
   message = input.required<string>();
   // private activatedRoute = inject(ActivatedRoute);
   
//    ngOnInit(): void {
//     this.activatedRoute.data.subscribe({
//       next: data => {
//         console.log(data);
//       }
//     })
//    }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot, 
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName = 
  usersService.users.find(
    (u) => u.id === activatedRoute.paramMap.get('userId')
  )?.name || '';
  return userName;
  }; //no subscription is needed for this method because it takes the data already and has it reexecuted when a new user is needed, with input binding enabled, the resolved data will be awaitable to that target component as a input property

  export const resolveTitle: ResolveFn<string> = (
    activatedRoute,
    routerState
  ) => {
    return resolveUserName(activatedRoute, routerState) + '\'s Tasks' // Max's Tasks, this dynamically assigns a name to each title
  }