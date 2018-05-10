// Angular imports
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MainViewComponent } from '../views/main-view/main-view.component';
import { AdminViewComponent } from '../views/admin-view/admin-view.component';
import { HomeComponent } from '../views/main-view/home/home.component';
import { ContactUsComponent } from '../views/main-view/contact-us/contact-us.component';
import { AboutUsComponent } from '../views/main-view/about-us/about-us.component';
import { BookOnlineComponent } from '../views/main-view/book-online/book-online.component';
import { FaqComponent } from '../views/main-view/faq/faq.component';
import { MyAccountComponent } from '../views/main-view/my-account/my-account.component';


const appRoutes: Routes = [
    { path: '', redirectTo: 'mv', pathMatch: 'full'},
    
        { path: 'mv', component: MainViewComponent,
        children: [
            {path: 'home', component: HomeComponent, outlet: 'mainViews'},
            {path: '', redirectTo: '/mv/(mainViews:home)', pathMatch: 'full'},
            {path: 'contact-us', component: ContactUsComponent, outlet: 'mainViews'},
            {path: 'about-us', component: AboutUsComponent, outlet: 'mainViews'},
            {path: 'my-account', component: MyAccountComponent, outlet: 'mainViews'},
            {path: 'faq', component: FaqComponent, outlet: 'mainViews'},
            {path: 'book-online', component: BookOnlineComponent, outlet: 'mainViews'},
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