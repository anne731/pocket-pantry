import {
  Component
} from '@angular/core';
import { UserContext } from './user-context';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {

  constructor (
    public user : UserContext
  ) {

  }

}
