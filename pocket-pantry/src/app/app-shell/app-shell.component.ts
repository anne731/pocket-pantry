import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css']
})
export class AppShellComponent implements OnInit {
  title = "Pocket Pantry";

  constructor() { }

  ngOnInit() {
  }

}
