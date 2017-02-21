import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { OggiPage } from '../pages/oggi/oggi';
import { ScadenzaPage } from '../pages/scadenza/scadenza';
import { PreferitePage } from '../pages/preferite/preferite';
import { ImportantiPage } from '../pages/importanti/importanti';
import { RicercaPage } from '../pages/ricerca/ricerca';
import { AvanzataPage } from '../pages/avanzata/avanzata';


import { AggiornaPage } from '../pages/aggiorna/aggiorna';
import { PreferenzePage } from '../pages/preferenze/preferenze';

@Component({ 
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;
  pagesDestra : any;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Tutte', component: Page1 },
      { title: 'Ultime gare inserite', component: OggiPage },
      { title: 'Gare in scadenza', component: ScadenzaPage },
      { title: 'Preferite', component: PreferitePage },
      { title: 'Importanti', component: ImportantiPage },
      { title: 'Ricerca', component: RicercaPage },
      { title: 'Ricerca Avanzata', component: AvanzataPage },

    ];

    this.pagesDestra = [
        { title: 'Aggiorna', component: AggiornaPage },
        { title: 'Preferenze', component: PreferenzePage } 
    ];



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
