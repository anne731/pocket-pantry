import { Component, Input} from '@angular/core';
import { UserContext } from '../user-context';
import { PocketPantryService } from '../shared/services/pocketPantryService';

  @Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })

  export class LoginComponent {
    private _userName: string;
    private _password: string;
    public success: boolean;
    public error: boolean;
    public message: string;

    @Input()
      public set UserName(name: string) {
        this._userName = name;
      }
      public get UserName() {
        return this._userName;
      }
    @Input()
      public set PassWord(pw: string) {
        this._password = pw;
      }
      public get PassWord() {
        return this._password;
      }

    constructor(
      public context: UserContext,
      public pantrySvc: PocketPantryService
    ) { }

    public login() {
      this.pantrySvc.getUser(this._userName).subscribe(user => {
        console.log(user);
        if (user === null) {
          this.error = true;
          this.message = 'User does not exist';
        } else if (user.password === this._password) {
          this.success = true;
          this.error = false;
        } else {
          this.error = true;
          this.message = 'Incorrect password';
        }
      });
    }

  }
