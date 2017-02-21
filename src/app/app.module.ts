import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { OggiPage } from '../pages/oggi/oggi';
import { AggiornaPage } from '../pages/aggiorna/aggiorna';
import { PreferenzePage } from '../pages/preferenze/preferenze';
import { ScadenzaPage } from '../pages/scadenza/scadenza';
import { PreferitePage } from '../pages/preferite/preferite';
import { ImportantiPage } from '../pages/importanti/importanti';
import { RicercaPage } from '../pages/ricerca/ricerca';
import { AvanzataPage } from '../pages/avanzata/avanzata';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    AggiornaPage,
    PreferenzePage,
    OggiPage,
    ScadenzaPage,
    PreferitePage,
    ImportantiPage,
    RicercaPage,
    AvanzataPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    AggiornaPage,
    PreferenzePage,
    OggiPage,
    ScadenzaPage,
    PreferitePage,
    ImportantiPage,
    RicercaPage,
    AvanzataPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
