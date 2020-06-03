import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'star-wars';
  routes: any[];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.routes = this.router.config.filter((route) => route.path !== '');
  }
}
