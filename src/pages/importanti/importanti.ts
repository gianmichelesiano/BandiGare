import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DettagliPage } from '../dettagli/dettagli'
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { User } from '@ionic/cloud-angular';

@Component({
  selector: 'page-importanti',
  templateUrl: '../template-gare/template-gare.html'
})
export class ImportantiPage {

  public gare = [];
  public gareRicercate = [];
  public gareFiltrate = [];
  public gareOrdinate = [];

  numGareInfinite : number = 10;
  visible : boolean = false;
  private titolo: string 

  preferenzeSnap: FirebaseObjectObservable<any>;


  constructor(public navCtrl: NavController, public user:User, public navParams: NavParams, storage: Storage, public af: AngularFire, public loadingCtrl:LoadingController) {
    this.titolo = "Gare Importanti";
    storage.get('gareDB').then((val) => {
      for (var key in val) {    
            this.gare.push({key: key, value: val[key]});
      }
    
    let loader = this.loadingCtrl.create({
      content: "Sto caricando le preferenze..."
    });
    loader.present();

    let arrRet= [];
    let arr= [];
    console.log("avvio")
    this.preferenzeSnap = this.af.database.object('/preferenze/'+this.user.id+'/importanti/', { preserveSnapshot: true });
    this.preferenzeSnap.subscribe(snapshot => {
                        let gareImportanti = snapshot.val();
                        for (var key in gareImportanti) {
                          if (gareImportanti[key].valore){
                              arr.push(key)
                          }
                        }
                        this.gareRicercate =   this.gare.filter(function(el){
                                return arr.indexOf(el.key) > -1;
                        });
                      });
                      if (this.numGareInfinite > this.gareRicercate.length){
                            this.numGareInfinite = this.gareRicercate.length
                      }
                      for (let i = 0; i < this.numGareInfinite; i++) {
                         this.gareFiltrate.push( this.gareRicercate[i]);
                         console.log(this.gareFiltrate.length)
                      }
     loader.dismissAll();

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
    let lung = this.gareFiltrate.length
    if (lung < this.gareRicercate.length){
      if (this.gareRicercate.length-lung<this.numGareInfinite  ){

        this.numGareInfinite = this.gareRicercate.length-lung
        for (let i = lung; i < lung + this.numGareInfinite; i++) {
            this.gareFiltrate.push( this.gareRicercate[i] );
        }
        this.visible = true;
        infiniteScroll.enable(false);

      }
  
      setTimeout(() => {
        for (let i = lung; i < lung + this.numGareInfinite; i++) {
          this.gareFiltrate.push( this.gareRicercate[i] );
        }

        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 500);
  }
  infiniteScroll.enable(false);
  }

}

