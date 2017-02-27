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
    console.log("this.gareFiltrateCategorie");
    console.log(this.gareFiltrateCategorie.length);
    console.log(tipologiaId, categoriaId, regioneId, provinciaId)
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

    this.gareFiltrate = this.gareRicercate
    return this.gareFiltrate;
  }

  apriDettaglio(gara){
    this.navCtrl.push( DettagliPage, {
      gara:gara
    });
  }



}
