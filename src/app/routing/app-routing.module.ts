// Angular imports
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MainViewComponent } from '../views/main-view/main-view.component';
import { AdminViewComponent } from '../views/admin-view/admin-view.component';
import { HomeComponent } from '../views/main-view/home/home.component';
import { ContactUsComponent } from '../views/main-view/contact-us/contact-us.component';
import { AboutUsComponent } from '../views/main-view/about-us/about-us.component';
import { BookOnlineViewComponent } from '../views/main-view/book-online-view/book-online-view.component';
import { FaqComponent } from '../views/main-view/faq/faq.component';
import { MyAccountComponent } from '../views/main-view/my-account/my-account.component';
import { PrintableInvoiceComponent } from '../views/main-view/my-account/your-transfers/transfer-details-dialog/printable-invoice/printable-invoice.component';
import { LoginComponent } from '../views/login/login.component';
import { SignupComponent } from '../views/login/signup/signup.component';
import { MapRouteComponent } from '../components/book-online/map-route/map-route.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'mv', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'sign-up', component: SignupComponent},
    {path: 'map-route', component: MapRouteComponent},
    
        { path: 'mv', component: MainViewComponent,
        children: [
            {path: 'home', component: HomeComponent, outlet: 'mainViews'},
            {path: '', redirectTo: '/mv/(mainViews:home)', pathMatch: 'full'},
            {path: 'contact-us', component: ContactUsComponent, outlet: 'mainViews'},
            {path: 'about-us', component: AboutUsComponent, outlet: 'mainViews'},
            {path: 'my-account', component: MyAccountComponent, outlet: 'mainViews'},
            {path: 'faq', component: FaqComponent, outlet: 'mainViews'},
            {path: 'book-online', component: BookOnlineViewComponent, outlet: 'mainViews'},
            {path: 'print', component: PrintableInvoiceComponent, outlet: 'mainViews'},
          ]},
          
        { path: 'admin-view', component: AdminViewComponent,
        children: [
            {path: 'home', component: HomeComponent, outlet: 'mainViews'},
            {path: '', redirectTo: '/admin-view/(adminViews:home)', pathMatch: 'full'},
          ]},
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule {
  
  }