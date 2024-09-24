import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//COMPONENTS
import { ClienteFormComponent } from './cliente/components/cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente/components/cliente-list/cliente-list.component';

//EXTRAS
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,

    //COMPONENTS
    ClienteFormComponent,
    ClienteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //EXTRAS
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
