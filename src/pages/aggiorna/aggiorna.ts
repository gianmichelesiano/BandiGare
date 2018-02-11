import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,Platform } from 'ionic-angular';
import { User } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Page1 } from '../page1/page1'
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';


@Component({
  selector: 'page-aggiorna',
  templateUrl: 'aggiorna.html'
})


export class AggiornaPage {

  notificheSnap: FirebaseObjectObservable<any>;
  gare: FirebaseObjectObservable<any>;

  constructor(public platform: Platform, public navCtrl: NavController, public user:User, public push: Push, public navParams: NavParams, storage: Storage, public af: AngularFire, public loadingCtrl:LoadingController) {



  	// CARICA TUTTE LE GARE NEL DATABASE
    let loader = this.loadingCtrl.create({
    content: "Attendere il caricamento delle gare..."
    });
    loader.present();
    this.gare = af.database.object('/gare', { preserveSnapshot: true  });
    this.gare.subscribe(snapshot => {
        storage.set('gareDB', snapshot.val());
        this.navCtrl.setRoot(Page1)
        
    });
    this.gare.subscribe(() => loader.dismissAll());

    if (this.platform.is('android')) {  
      this.push.register().then((t: PushToken) => {
         return this.push.saveToken(t);
      }).then((t: PushToken) => {
         this.notificheSnap = this.af.database.object('/utenti/'+this.user.id+'/notifiche/', { preserveSnapshot: true });
         this.notificheSnap.set({pushToken:t.token});
      });
    }

    
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AggiornaPage');
  }
}
