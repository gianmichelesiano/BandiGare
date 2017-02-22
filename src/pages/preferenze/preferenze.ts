import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { User } from '@ionic/cloud-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { MyDataService } from '../../services/mydataservice';
import { Categoria } from '../../services/categoria';
import { Provincia } from '../../services/provincia';


@Component({
  selector: 'page-preferenze',
  templateUrl: 'preferenze.html',
  providers: [ MyDataService]
})
export class PreferenzePage {


 contac = [
  	{ mail:"mail",  checked: true},
  	{notifica:"notifica",  checked: true}
  ];


  preferenzaCategoria:any;
  preferenzaProvincia:any;

  preferenzaMail:any;
  preferenzaNotifica:any;

  locVar:any;

  categorie: Categoria[];
  provincie: Provincia[];


  selectedCategoria:Categoria = new Categoria('TT', 0, 'Tutte le categorie');
  selectedProvincia:Provincia = new Provincia('TT', 0, 'Tutte le provincie' );
  
  preferenzeSnap: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public user:User, private _mydataService: MyDataService, af: AngularFire, public loadingCtrl:LoadingController, private toastCtrl: ToastController) {


  	this.categorie = this._mydataService.getCategoria();
  	this.provincie = this._mydataService.getProvincia();



    this.preferenzeSnap = af.database.object('/preferenze/'+user.id, { preserveSnapshot: true });

    let loader = this.loadingCtrl.create({
    content: "Sto caricando le preferenze..."
    });
    loader.present();
    this.preferenzeSnap.subscribe(snapshot => {

    		this.locVar = snapshot.val();
    		if (this.locVar ==null) {
    			this.preferenzaCategoria = [];
    			this.preferenzaProvincia = [];
    			this.preferenzaMail = false;
    			this.preferenzaNotifica = false;

    		} else {
    			this.preferenzaCategoria = this.locVar['categoria'];
    			this.preferenzaProvincia = this.locVar['provincia'];
	  			this.preferenzaMail = this.locVar['mail'];
	  			this.preferenzaNotifica = this.locVar['notifiche'];
  			}
  			loader.dismissAll();
    });
  }



  salvePreferenze( mail, notifiche, categoria, provincia ){
  	this.preferenzeSnap.set({mail:mail, notifiche:notifiche,  categoria:categoria, provincia:provincia});
	  	let toast = this.toastCtrl.create({
	    message: 'Preferenze Salvate',
	    duration: 2000,
	    position: 'down'
  	});
	 toast.present();
  }
 }

