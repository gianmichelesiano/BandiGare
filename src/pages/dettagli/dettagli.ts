import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
import {InAppBrowser} from 'ionic-native';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { User } from '@ionic/cloud-angular';

@Component({
  selector: 'page-dettagli',
  templateUrl: 'dettagli.html'
})
export class DettagliPage {

  gara:any;
  arrayDownload:any;
  arrayInfoAggiuntive: any;
  
  url:string;
  pdf:string;
  anac:string;
  bandiDiGara:string;
  disciplinare:string;
  fascicolo:string;
  sito_www:string;
  sito_http:string;
  sito_guri:string;
  link:string;
  visible : boolean;

  gareObjet: FirebaseObjectObservable<any>;
  preferenzeSnap: FirebaseObjectObservable<any>;
  garaImportante: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire, public user:User, public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
  	this.gara = navParams.get('gara');


    this.visible = false;
    //this.preferenzeSnap = af.database.object('/preferenze/'+user.id+'/importanti');
    this.preferenzeSnap = af.database.object('/preferenze/'+user.id+'/importanti/'+this.gara.key, { preserveSnapshot: true });
    this.preferenzeSnap.subscribe(snapshot => {
                                    if (snapshot.val()){
                                      this.visible = snapshot.val().valore;
                                    }
                                  });

    

    if (this.gara.value.DOWNLOAD != ''){
      this.arrayDownload = JSON.parse(this.gara.value.DOWNLOAD);
      // ANAC
      this.url = this.arrayDownload["url"];
      this.pdf = this.arrayDownload["pdf"];
      this.anac = this.arrayDownload["anac"];
      // SCP
      this.bandiDiGara = this.arrayDownload["Bando di gara"];
      this.disciplinare = this.arrayDownload["Disciplinare di gara"];
      this.fascicolo = this.arrayDownload["fascicolo"];
    }

    if (this.gara.value.INFO_AGGIUNTIVE != ''){
      console.log(this.gara.value.INFO_AGGIUNTIVE);
      this.arrayInfoAggiuntive = JSON.parse(this.gara.value.INFO_AGGIUNTIVE);
      console.log(this.arrayInfoAggiuntive["sito_www"]);
      console.log(this.arrayInfoAggiuntive["sito_guri"]);
      //GURI
      this.sito_www = this.arrayInfoAggiuntive["sito_www"];
      this.sito_http = this.arrayInfoAggiuntive["sito_http"];
      this.sito_guri = this.arrayInfoAggiuntive["sito_guri"];
      //ETRU
      this.link = this.arrayInfoAggiuntive["link"];
    }
  }

	openUrl(url) {
	    url = url.replace("amp;","").replace('http://','').replace('https://','')
	    this.platform.ready().then(() => {
          open('//'+  url, "_blank", "location=no");
	    });
	} 

	condividi(){
	    SocialSharing.shareViaEmail('Body', 'Subject', ['gianmichele.siano@gmail.com']).then(() => {
	  		console.log("sul cesso");
			}).catch(() => {
			  console.log("sul gabin");
	    });
	}


  
  toggle(visible, gara) {
    console.log(gara.key)
    console.log(this.gareObjet)
    this.visible = !visible

    this.preferenzeSnap.set({valore: this.visible});
    return this.gara 
  }

}

