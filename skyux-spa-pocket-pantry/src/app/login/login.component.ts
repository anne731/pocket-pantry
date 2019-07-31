import { Component, Input} from '@angular/core';

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

    constructor() { }
    }

  }
