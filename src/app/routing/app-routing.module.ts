// Angular imports
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MainViewComponent } from '../views/main-view/main-view.component';
import { AdminViewComponent } from '../views/admin-view/admin-view.component';
import { HomeComponent } from '../views/main-view/home/home.component';
import { ContactUsComponent } from '../views/main-view/contact-us/contact-us.component';


const appRoutes: Routes = [
    { path: '', redirectTo: 'mv', pathMatch: 'full'},
    
        { path: 'mv', component: MainViewComponent,
        children: [
            {path: 'home', component: HomeComponent, outlet: 'mainViews'},
            {path: '', redirectTo: '/mv/(mainViews:home)', pathMatch: 'full'},
            {path: 'contact-us', component: ContactUsComponent, outlet: 'mainViews'},
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