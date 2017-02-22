import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { LoginPage } from '../login/login'
import { Storage } from '@ionic/storage';
import { AngularFire} from 'angularfire2';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  items = [];
  constructor(public navCtrl: NavController, public user:User, public auth:Auth, storage: Storage, af: AngularFire, public loadingCtrl:LoadingController) {
        if(!this.auth.isAuthenticated()) {
          this.navCtrl.setRoot(LoginPage)
        }

        // carica tutte le gare
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
