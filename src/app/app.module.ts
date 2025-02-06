import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {CircuitsListComponent} from './components/circuits-list/circuits-list.component';
import {CircuitsDetailComponent} from './components/circuits-detail/circuits-detail.component';
@NgModule({
  imports: [
    BrowserModule, HttpClientModule
  ]
})
export class AppModule { }
