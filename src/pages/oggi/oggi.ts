import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DettagliPage } from '../dettagli/dettagli'

/*
  Generated class for the Oggi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-oggi',
  templateUrl: 'oggi.html'
})
export class OggiPage {
  public gare = [];
  public gareFiltrate = [];
  numGareInfinite : number = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage,) {
    storage.get('gareDB').then((val) => {
      for (var key in val) {    
            this.gare.push({key: key, value: val[key]});
      }
      console.log( this.gare.length)
      this.gareFiltrate = this.getGare();
    })

  }

  getGare() {
  	let arr = []
    for (let i = 0; i < this.numGareInfinite; i++) {
      arr.push( this.gare[i]);
    }
    return arr
  }

  apriDettaglio(gara){
    this.navCtrl.push( DettagliPage, {
      gara:gara
    });
  }

  loadMore(infiniteScroll) {
    console.log('Begin async operation');
    let lung = this.gareFiltrate.length;
    if (lung < this.gare.length){
	    setTimeout(() => {
	      for (let i = lung; i < lung + this.numGareInfinite; i++) {
	        this.gareFiltrate.push( this.gare[i] );
	      }

	      console.log('Async operation has ended');
	      infiniteScroll.complete();
	    }, 500);
	}
  }

}



