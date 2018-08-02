import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location, PopStateEvent } from "@angular/common";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  subscription: Subscription
  constructor(private router: Router, private location: Location) {

  }
  ngOnInit() {
    let x = document.getElementsByClassName('content-wrapper')[0];
    this.location.subscribe((ev:PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.subscription = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => x.scrollTo(0,0)); 
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
