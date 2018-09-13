// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Third party imports
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { environment } from '../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AgmCoreModule } from '@agm/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Angular Material Imports
import { MatCheckboxModule, MatSliderModule, MatButtonModule, MatChipsModule, MatStepperModule,  MatDialogModule, MatTableModule, MatIconModule, MatTabsModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatTooltipModule} from '@angular/material';

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
import { BookOnlineComponent } from './components/book-online/book-online.component';
import { ContactUsMapComponent } from './views/main-view/contact-us/contact-us-map/contact-us-map.component';
import { ProfileComponent } from './views/main-view/my-account/profile/profile.component';
import { PaymentsComponent } from './views/main-view/my-account/payments/payments.component';
import { YourTransfersComponent } from './views/main-view/my-account/your-transfers/your-transfers.component';
import { TransferDetailsDialog } from './views/main-view/my-account/your-transfers/transfer-details-dialog/transfer-details-dialog.component';
import { PrintableInvoiceComponent } from './views/main-view/my-account/your-transfers/transfer-details-dialog/printable-invoice/printable-invoice.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/login/signup/signup.component';
import { BookOnlineViewComponent } from './views/main-view/book-online-view/book-online-view.component';


// Services
import { CountryCallCodesService } from './services/country-call-code-service';
import { UserProfileService } from './services/user-profile-service';
import { FormatService } from './services/format.service';



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
    ContactUsMapComponent,
    ProfileComponent,
    PaymentsComponent,
    YourTransfersComponent,
    TransferDetailsDialog,
    PrintableInvoiceComponent,
    LoginComponent,
    SignupComponent,
    BookOnlineViewComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    AngularFontAwesomeModule,
    MatSidenavModule,
    MatChipsModule,
    MatToolbarModule,
    MatStepperModule,
    MatListModule, 
    MatExpansionModule,
    MatSliderModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB68mpC9K_kN8JFsHQfcj3TU2lm728CrQk',
      libraries: ["places"]
    })
  ],
  entryComponents: [ TransferDetailsDialog ],
  providers: [
    CountryCallCodesService,
    UserProfileService,
    MatDatepickerModule,
    FormatService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-in'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
