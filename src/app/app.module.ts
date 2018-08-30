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
import { AgmCoreModule } from '@agm/core';

//Angular Material Imports
import {MatButtonModule, MatDialogModule, MatTableModule, MatIconModule, MatTabsModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';

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
import { ProfileComponent } from './views/main-view/my-account/profile/profile.component';
import { PaymentsComponent } from './views/main-view/my-account/payments/payments.component';
import { YourTransfersComponent } from './views/main-view/my-account/your-transfers/your-transfers.component';
import { TransferDetailsDialog } from './views/main-view/my-account/your-transfers/transfer-details-dialog/transfer-details-dialog.component';
import { PrintableInvoiceComponent } from './views/main-view/my-account/your-transfers/transfer-details-dialog/printable-invoice/printable-invoice.component';

// Services
import { CountryCallCodesService } from './repeated-code/country-call-codes';
import { UserProfileService } from './services/user-profile-service';



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
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB68mpC9K_kN8JFsHQfcj3TU2lm728CrQk'
    })
  ],
  entryComponents: [ TransferDetailsDialog ],
  providers: [
    CountryCallCodesService,
    UserProfileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
