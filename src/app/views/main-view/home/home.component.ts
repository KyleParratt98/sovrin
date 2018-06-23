import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  testimonialsArray = [
    "1",
    "2",
    "3",
    "4",
    "5"
  ]
  counter = 1;
  previousCounter = 1;
  currentTestimonial = "zzz";

  constructor() { 
    
  }

  ngOnInit() {
    this.testimonialsLoop();
  }

  async testimonialsLoop() {
    this.currentTestimonial = this.testimonialsArray[this.counter];
    await this.delay(1000);
    this.counter = this.randomInt(0,4);
    if (this.previousCounter == this.counter) {
      this.counter = this.randomInt(0,4);
      if (this.previousCounter == this.counter) {
        this.counter = this.randomInt(0,4);
        if (this.previousCounter == this.counter) {
          this.counter = this.randomInt(0,4);
        }
      }
    }
    this.previousCounter = this.counter;
    this.testimonialsLoop();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }

}
