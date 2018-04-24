import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth} from '@ionic/cloud-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

import firebase from 'firebase';
/*
  Generated class for the Logout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {
  public fireAuth: any;
  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public auth:Auth,) {

      this.storage.set('email', null);
      this.storage.set('password', null);
      this.fireAuth = firebase.auth();
	  	this.auth.logout();
	    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
