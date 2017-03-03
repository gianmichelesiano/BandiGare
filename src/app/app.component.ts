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

import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { LogoutPage } from '../pages/logout/logout';

import { AggiornaPage } from '../pages/aggiorna/aggiorna';
import { PreferenzePage } from '../pages/preferenze/preferenze';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';


@Component({ 
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;
  pagesDestra : any;
  loader: any;

  constructor(public platform: Platform, public push: Push,  public storage: Storage, public auth:Auth, public loadingCtrl: LoadingController) {
    this.initializeApp();
    this.presentLoading();

    this.pages = [
      { title: 'Home', component: Page1 },
      { title: 'Ricerca', component: RicercaPage },
      { title: 'Gare importanti', component: ImportantiPage },
      { title: 'Gare preferite', component: PreferitePage },
      { title: 'Ultime gare inserite', component: OggiPage },
      { title: 'Gare in scadenza', component: ScadenzaPage },     
    ];
    this.pagesDestra = [
        { title: 'Aggiorna', component: AggiornaPage },
        { title: 'Preferenze', component: PreferenzePage },
        { title: 'Rivedi Introduzione', component: IntroPage },
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
          //this.rootPage = Page1;
          this.rootPage = AggiornaPage;
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

     if (this.platform.is('android')) {  
        this.push.register().then((t: PushToken) => {
          return this.push.saveToken(t);
        }).then((t: PushToken) => {
          console.log('Token saved:', t.token);
        });

        this.push.rx.notification()
        .subscribe((msg) => {
          alert(msg.title + ': ' + msg.text);
        });
     } 
     else {
       console.log('non sono andorid')
     }
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
