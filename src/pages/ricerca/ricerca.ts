import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { MyDataService } from '../../services/mydataservice';
import { Tipologia } from '../../services/tipologia';
import { Categoria } from '../../services/categoria';
import { Regione } from '../../services/regioni';
import { Provincia } from '../../services/provincia';
import { DettagliPage } from '../dettagli/dettagli'




@Component({
  selector: 'page-ricerca',
  templateUrl: 'ricerca.html',
  providers: [ MyDataService]
})
export class RicercaPage {

  categoria:string = '';
  regione:string = '';
  provincia:string = '';


  selectedTipologia:Tipologia = new Tipologia(0, ''); 
  selectedCategoria:Categoria = new Categoria('TT', 0, '');
  selectedRegione:Regione = new Regione(0, '');
  selectedProvincia:Provincia = new Provincia('TT', 0, '' );

 numGareInfinite : number = 10;
 visible : boolean = false;
  
  tipologie: Tipologia[];
  categorie: Categoria[];
  provincie: Provincia[];
  regioni: Regione[];

  public gare = [];
  public gareFiltrate = [];
  public gareRicercate = [];
  public gareOrdinate = [];
  public gareFiltrateCategorie = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _mydataService: MyDataService, storage: Storage, private toastCtrl: ToastController) {
  	this.tipologie = this._mydataService.getTipologia();
  	this.regioni = this._mydataService.getRegioni();

  	storage.get('gareDB').then((val) => {
      for (var key in val) {    
            this.gare.push({key: key, value: val[key]});
      }
    })

  }

  onSelectTipologia(tipologiaid) {
    this.categorie = this._mydataService.getCategoria().filter((item)=> item.tipologiaid == tipologiaid);
  }

  onSelectRegione(regioneid) {
    this.provincie = this._mydataService.getProvincia().filter((item)=> item.regioneid == regioneid);
  }

 doRicerca(tipologiaId, categoriaId, regioneId, provinciaId){
    this.gareFiltrate = [];
    console.log(tipologiaId, categoriaId, regioneId, provinciaId)

    let boolVal = true;
    if (tipologiaId == 0){
        let toast = this.toastCtrl.create({
        message: 'Inserire la tipologia',
        duration: 2000,
        position: 'middle'
        });
        toast.present();
        boolVal = false;
    } else if (categoriaId.length > 2 ) {
      this.gareFiltrateCategorie = this.gare.filter( function (el) { 
          return el['value']['CATEGORIA_PREVALENTE']== categoriaId  
      })
    } else if (categoriaId.length == 2 && categoriaId != "TT") {
      this.gareFiltrateCategorie = this.gare.filter( function (el) { 
          return el['value']['CPV'].substring(0, 2) == categoriaId  
      })
    } else {
      let tipologiaRicerca = this.tipologie[tipologiaId-1]["name"]
      this.gareFiltrateCategorie = this.gare.filter( function (el) { 
          return el['value']['TIPOLOGIA'].toUpperCase() == tipologiaRicerca.toUpperCase()
      })
    }
    if (provinciaId == 'TT' && regioneId > 0  ) {
      let regioneRicerca = '';
      for (let i=0; i<this.regioni.length; i++) {
        if (this.regioni[i].id == regioneId)
         regioneRicerca = this.regioni[i].name
      }
      this.gareRicercate = this.gareFiltrateCategorie.filter( function (el) { 
          return  el['value']['REGIONE'].toUpperCase() == regioneRicerca.toUpperCase()
      })

    } else if (provinciaId == 'TT'){
       this.gareRicercate = this.gareFiltrateCategorie
    } else {
      this.gareRicercate = this.gareFiltrateCategorie.filter( function (el) { 
          return  el['value']['PROVINCIA'] == provinciaId
      })
    }

   if  (this.gareRicercate.length == 0  && boolVal==true){
       let toast = this.toastCtrl.create({
      message: 'Nessuna gara trovata',
      duration: 2000,
      position: 'middle'
      });
    toast.present();
   }


    this.gareOrdinate = this.gareRicercate
    if (this.gareOrdinate.length<this.numGareInfinite){
      this.numGareInfinite = this.gareOrdinate.length
      console.log(this.numGareInfinite)
      this.visible = true;
    }
    for (let i = 0; i < this.numGareInfinite; i++) {
      this.gareFiltrate.push( this.gareOrdinate[i]);
    }

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
        console.log(this.gareFiltrate.length)
        setTimeout(() => {
          for (let i = lung; i < lung + this.numGareInfinite; i++) {
            this.gareFiltrate.push( this.gareOrdinate[i] );
          }

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }
    //infiniteScroll.enable(false);
  }



}
