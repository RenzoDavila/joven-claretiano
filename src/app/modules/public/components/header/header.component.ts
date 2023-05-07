import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/observables/user.model';
import { ObservableUserServices } from 'src/app/services/observable-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  userData!: User;

  constructor(private observableUserServices:ObservableUserServices, public router: Router) {
    this.observableUserServices.selectedUser$.subscribe((observableUser: User) => this.userData = observableUser);
  }

  ngOnInit(): void {
    if (this.router.url.includes('/dashboard') && this.userData.codigo == '') {
      this.router.navigate(['/']);
    }
  }

}
