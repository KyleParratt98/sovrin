// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Third party imports
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { environment } from '../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { AgmCoreModule } from '@agm/core';

//Angular Material Imports
import {MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule, MatExpansionModule, MatFormFieldModule, MatInputModule} from '@angular/material';


// Components
import { AppComponent } from './app.component';
import { MainViewComponent } from './views/main-view/main-view.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { HeaderComponent } from './views/main-view/header/header.component';
import { FooterComponent } from './views/main-view/footer/footer.component';
import { HomeComponent } from './views/main-view/home/home.component';
import { ContactUsComponent } from './views/main-view/contact-us/contact-us.component';
import { AboutUsComponent } from './views/main-view/about-us/about-us.component';
import { FaqComponent } from './views/main-view/faq/faq.component';
import { MyAccountComponent } from './views/main-view/my-account/my-account.component';
import { BookOnlineComponent } from './views/main-view/book-online/book-online.component';
import { ContactUsMapComponent } from './views/main-view/contact-us/contact-us-map/contact-us-map/contact-us-map.component';

// Services


@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    AdminViewComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    FaqComponent,
    MyAccountComponent,
    BookOnlineComponent,
    ContactUsMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    AngularFontAwesomeModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule, 
    MatExpansionModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB68mpC9K_kN8JFsHQfcj3TU2lm728CrQk'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
