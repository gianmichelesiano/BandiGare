import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DettagliPage } from '../dettagli/dettagli'

@Component({
  selector: 'page-oggi',
  templateUrl: '../template-gare/template-gare.html'
})
export class OggiPage {
  public gare = [];
  public gareFiltrate = [];
  public gareOrdinate = [];
  numGareInfinite : number = 10;
  visible : boolean = false;
  private titolo: string 
;
  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage,) {
    this.titolo = "Ultime gare inserite";
    storage.get('gareDB').then((val) => {
      for (var key in val) {    
            this.gare.push({key: key, value: val[key]});
      }
      this.gareOrdinate = this.ordinaGare();
      this.gareFiltrate = this.getGare();
    })

  }

  ordinaGare(){
  	let arr = []
	arr = this.gare.sort(function(x, y){
	    return x.value.DATA_INSERIMENTO - y.value.DATA_INSERIMENTO;
	})
    return arr.reverse();
  }

  getGare() {
  	let arr = []
    for (let i = 0; i < this.numGareInfinite; i++) {
      arr.push( this.gareOrdinate[i]);
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
    let lung = this.gareFiltrate.length

    if (lung < this.gareOrdinate.length){
      if (this.gareOrdinate.length-lung<this.numGareInfinite){
        console.log(this.numGareInfinite)
        this.numGareInfinite = this.gareOrdinate.length-lung
        for (let i = lung; i < lung + this.numGareInfinite; i++) {
            this.gareFiltrate.push( this.gareOrdinate[i] );
        }
        this.visible = true;
        infiniteScroll.enable(false);

      }
      console.log(this.numGareInfinite)
      setTimeout(() => {
        for (let i = lung; i < lung + this.numGareInfinite; i++) {
          this.gareFiltrate.push( this.gareOrdinate[i] );
        }

        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 500);
    }
    infiniteScroll.enable(false);
  }


}





