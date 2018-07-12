// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Third party imports
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = environment.firebaseConfig
import { AngularFirestoreModule } from 'angularfire2/firestore'

//Angular Material Imports
import {MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule, MatExpansionModule, MatFormFieldModule} from '@angular/material';


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
    BookOnlineComponent
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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
