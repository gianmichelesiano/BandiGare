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


  
  tipologie: Tipologia[];
  categorie: Categoria[];
  provincie: Provincia[];
  regioni: Regione[];

  public gare = [];
  public gareFiltrate = [];

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
    this.gareFiltrate = this.gare.filter( function (el) { 
    	return el['value']['PROVINCIA'] == provinciaId && el['value']['CATEGORIA_PREVALENTE']== categoriaId 
    })
   if  (this.gareFiltrate.length == 0){
   	  let toast = this.toastCtrl.create({
	    message: 'Nessuna gara trovata',
	    duration: 2000,
	    position: 'middle'
  	  });
	  toast.present();
   }
    return this.gareFiltrate;
  }

  apriDettaglio(gara){
    this.navCtrl.push( DettagliPage, {
      gara:gara
    });
  }

}
