import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  burgerIcon = 'menu';
  burgerDisabled = false;

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  async burgerToggle() {
    await this.delay(1);
    this.burgerDisabled = true;
    await this.delay(180);
    console.log('burger toggle');
    if (this.burgerIcon == 'menu')
      this.burgerIcon = 'close';
    else 
      this.burgerIcon = 'menu';
    this.burgerDisabled = false;
  }

  async closeBurger() {
    await this.delay(1);
    this.burgerDisabled = true;
    await this.delay(120);
    this.burgerIcon = 'menu';
    this.burgerDisabled = false;
  }

  myAccountClick() {
    this.router.navigateByUrl('/mv/(mainViews:my-account)');
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
