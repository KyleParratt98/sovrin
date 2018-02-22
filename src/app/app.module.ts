// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/app-routing.module';

// Third party imports


// Components
import { AppComponent } from './app.component';
import { MainViewComponent } from './views/main-view/main-view.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { HeaderComponent } from './views/main-view/header/header.component';
import { FooterComponent } from './views/main-view/footer/footer.component';
import { HomeComponent } from './views/main-view/home/home.component';
import { ContactUsComponent } from './views/main-view/contact-us/contact-us.component';

// Services


@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    AdminViewComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
