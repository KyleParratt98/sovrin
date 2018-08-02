import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      recaptchaReactive: new FormControl(null, Validators.required)
    });
  }

}
