import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent {
  public nav = [
    {
      titleKey: 'app_nav_home',
      path: '/'
    },
    {
      titleKey: 'Login',
      path: '/login'
    },{
      titleKey: 'Pantry',
      path: '/pantry-component'
    },{
      titleKey: 'Fridge',
      path: '/fridge-component'
    }

  
  ];
}
