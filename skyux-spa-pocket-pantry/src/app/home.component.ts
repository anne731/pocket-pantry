import {
  Component
} from '@angular/core';
import { UserContext } from './user-context';

import { NgIf, //DatePipe 
} from '@angular/common';

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
