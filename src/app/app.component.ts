import { Component } from '@angular/core';
import { User } from './models/observables/user.model';
import { ObservableUserServices } from './services/observable-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'joven-claretiano';
  userData!: User;
  dashboard:boolean = false;

  constructor(private observableUserServices:ObservableUserServices) {
    this.observableUserServices.selectedUser$.subscribe((observableUser: User) => this.userData = observableUser);
  }
}
