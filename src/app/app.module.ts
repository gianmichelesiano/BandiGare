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
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { LogoutPage } from '../pages/logout/logout';
import { Storage } from '@ionic/storage';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { AngularFireModule } from 'angularfire2';
import { LOCALE_ID } from '@angular/core';


export function provideStorage() {
  return new Storage(['sqlite', 'websql', 'indexeddb'], { name: 'bandigare' });
}


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'e4895f7a'
  }
};

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyAecCiVjizFOWgZM4KuSpdzDcyyEw1MBl0",
    authDomain: "bandigare-8096d.firebaseapp.com",
    databaseURL: "https://bandigare-8096d.firebaseio.com",
    storageBucket: "bandigare-8096d.appspot.com",
    messagingSenderId: "1009811970424"
};

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
    AvanzataPage,
    LoginPage,
    IntroPage,
    LogoutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    CloudModule.forRoot(cloudSettings)
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
    AvanzataPage,
    LoginPage,
    IntroPage,
    LogoutPage
  ],
    providers: [
              { provide: ErrorHandler, useClass: IonicErrorHandler},
              { provide: LOCALE_ID, useValue: "it-IT" },
              { provide: Storage, useFactory: provideStorage }
            ]
})
export class AppModule {}
