import { Component, OnInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

interface FAQ {
  answer: string;
  question: string;
  id?: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit{

  currentPage = 'Our Vehicles';
  FAQCollection: AngularFirestoreCollection<FAQ>;
  FAQ: Observable<FAQ[]>
  FAQMenuIcon = 'keyboard_arrow_down';
  displayMenu = 'none';

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.FAQCollection = this.afs.collection('FAQ/sections/' + this.currentPage);
    this.FAQ = this.FAQCollection.valueChanges();
    console.log(this.FAQ);
    console.log(this.FAQCollection);
    console.log(this.currentPage);
  }

  FAQMenuOpen() {
    if (this.FAQMenuIcon == 'keyboard_arrow_down') {
      this.displayMenu = 'block';
      this.FAQMenuIcon = 'keyboard_arrow_up';
    } else {
      this.FAQMenuIcon = 'keyboard_arrow_down';
      this.displayMenu = 'none';
    }
  }

  pageChange(pageName) {
    this.currentPage = pageName;
    this.ngOnInit();
    this.displayMenu = 'none';
    this.FAQMenuIcon = 'keyboard_arrow_down';
  }
  click() {
    console.log(this.currentPage);
  }
}
