import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Page1 } from '../page1/page1'


@Component({
  selector: 'page-aggiorna',
  templateUrl: 'aggiorna.html'
})
export class AggiornaPage {

  gare: FirebaseObjectObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage, af: AngularFire, public loadingCtrl:LoadingController) {
  	// CARICA TUTTE LE GARE NEL DATABASE
    let loader = this.loadingCtrl.create({
    content: "Attendere il caricamento delle gare..."
    });
    loader.present();
    this.gare = af.database.object('/gare', { preserveSnapshot: true  });
    this.gare.subscribe(snapshot => {
        storage.set('gareDB', snapshot.val());
        
    });
    this.gare.subscribe(() => loader.dismissAll());
    this.navCtrl.setRoot(Page1)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AggiornaPage');
  }
}
