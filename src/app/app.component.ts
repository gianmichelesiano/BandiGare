import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Auth } from '@ionic/cloud-angular';
import { LoadingController } from 'ionic-angular';

import { Page1 } from '../pages/page1/page1';
import { OggiPage } from '../pages/oggi/oggi';
import { ScadenzaPage } from '../pages/scadenza/scadenza';
import { PreferitePage } from '../pages/preferite/preferite';
import { ImportantiPage } from '../pages/importanti/importanti';
import { RicercaPage } from '../pages/ricerca/ricerca';
import { AvanzataPage } from '../pages/avanzata/avanzata';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { LogoutPage } from '../pages/logout/logout';



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
  loader: any;

  constructor(public platform: Platform,  public storage: Storage, public auth:Auth, public loadingCtrl: LoadingController) {
    this.initializeApp();
    this.presentLoading();

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
        { title: 'Preferenze', component: PreferenzePage },
        { title: 'Logout', component: LogoutPage } 
    ];
  }


  initializeApp() {
    this.platform.ready().then(() => {


      this.storage.get('introShown').then((result) => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      console.log("Inizo");
      //result = false;
      //this.storage.set('introShown', false);
      if(result){
        if(this.auth.isAuthenticated()) {
          this.rootPage = Page1;
        } else {
          this.rootPage = LoginPage;
        }
      } else {
        this.rootPage = IntroPage;
        this.storage.set('introShown', true);
      }
      this.loader.dismiss();
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Autenticazione..."
    });
    this.loader.present();
  }
}
