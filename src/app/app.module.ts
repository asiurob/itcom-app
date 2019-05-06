// MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// COMPONENTES
import { AppComponent } from './app.component';
import { StarwarsCoverComponent } from './starwars-cover/starwars-cover.component';
import { BitcoinComponent } from './bitcoin/bitcoin.component';



@NgModule({
  declarations: [
    AppComponent,
    StarwarsCoverComponent,
    BitcoinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
