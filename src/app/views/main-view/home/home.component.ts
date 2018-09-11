import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  testimonialsArray = [
    "'Their work on our website and Internet marketing has made a significant different to our business. We’ve seen a 425% increase in quote requests from the website which has been pretty remarkable – but I’d always like to see more!'",
    "'The price tag of Enchanting Business Blogging was hefty. Would it be worth the money. I can confirm that it definitely was.'",
    "'We were able to test our way from a 5% conversion rate, all the way up to 20%. Without driving any more traffic, our client is getting four times the leads that he was getting before.'",
    "'I’ve published the new copy on my website; and it has already increased both calls and leads coming through the web form. I can’t wait to start writing my email series, which I’m sure will further help grow my business.'",
    "'Not only was the course both fun and challenging but Henneke’s direct feedback for improving my writing was invaluable. She has a calm and logical method of teaching that truly connected and inspired me. I can’t speak highly enough of this course.'"
  ]
  counter = 1;
  previousCounter = 1;
  currentTestimonial = "zzz";
  homePageBannerHeadings: 'block';

  constructor() { 
    
  }

  ngOnInit() {
    this.testimonialsLoop();
  }

  async testimonialsLoop() {
    this.currentTestimonial = this.testimonialsArray[this.counter];
    await this.delay(9000);
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
