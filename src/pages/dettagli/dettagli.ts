import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
import {InAppBrowser} from 'ionic-native';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { User } from '@ionic/cloud-angular';

declare var window: any;

@Component({
  selector: 'page-dettagli',
  templateUrl: 'dettagli.html'
})

export class DettagliPage {

  gara:any;
  arrayDownload:any;
  public arrayRetDownload = [];

  objectDownload:any;
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

  constructor(public af: AngularFire, public user:User, public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
  	this.gara = navParams.get('gara');

   
    this.visible = false;
    //this.preferenzeSnap = af.database.object('/preferenze/'+user.id+'/importanti');
    this.preferenzeSnap = af.database.object('/utenti/'+user.id+'/importanti/'+this.gara.key, { preserveSnapshot: true });
    this.preferenzeSnap.subscribe(snapshot => {
                                    if (snapshot.val()){
                                      this.visible = snapshot.val().valore;
                                    }
                                  });

 //Object {SCHEMA DOM DI PARTECIPAZIONE: "https://www.serviziocontrattipubblici.it/PubbAvvis…egato.do?codice=144260&entita=BANDI_GARA&nr_doc=3", planimetria01: "https://www.serviziocontrattipubblici.it/PubbAvvis…egato.do?codice=144260&entita=BANDI_GARA&nr_doc=5", computo metrico: "https://www.serviziocontrattipubblici.it/PubbAvvis…egato.do?codice=144260&entita=BANDI_GARA&nr_doc=4", AVVISO DI RETTICA CIG: "https://www.serviziocontrattipubblici.it/PubbAvvis…egato.do?codice=144260&entita=BANDI_GARA&nr_doc=6", Bando di gara: "https://www.serviziocontrattipubblici.it/PubbAvvis…egato.do?codice=144260&entita=BANDI_GARA&nr_doc=1"…}

    if (this.gara.value.DOWNLOAD != ''){
      let i = 0
      this.objectDownload = JSON.parse(this.gara.value.DOWNLOAD);
      let etichetta = ''
      let tipo = 'link'
      for (var key in this.objectDownload) {
        if (key.toUpperCase().includes('AVVISO')){
          etichetta = "Avviso";
          tipo = 'download'
        } else if (key.toUpperCase().includes('DISCIP')){
              etichetta = "Disciplinare di gara";
              tipo = 'download'
        } else if (key.toUpperCase().includes('BANDO')){
           etichetta = "Bando di gara";
           tipo = 'download'
        } else if (key.toUpperCase().includes('RETTI')){
           etichetta = "Rettifica";
           tipo = 'download'
        } else if (key.toUpperCase().includes('SCHEMA')){
           etichetta = "Schema di gara";
           tipo = 'download'
        } else if (key.toUpperCase().includes('PLANIM')){
           etichetta = "Planimetria";
           tipo = 'download'
        }  else if (key.toUpperCase().includes('COMPUT')){
           etichetta = "Computo Metrico";
           tipo = 'download'
        }  else if (key.toUpperCase().includes('PDF')){
           etichetta = "Documemento";
           tipo = 'download'
        }  else if (key.toUpperCase().includes('URL')){
           etichetta = "Apri sito web";
           tipo = 'link'
        }  else if (key.toUpperCase().includes('ANAC')){
           etichetta = "Pagina ANAC";
           tipo = 'link'
        } else if (key.toUpperCase().includes('FASCICOLO')){
           etichetta = "Fascicolo di gara";
           tipo = 'link'
        }  else {
          let i = 0
          etichetta = "LINK" + i;
          tipo = 'link'
          i++
        }
        this.arrayRetDownload.push({chiave:etichetta, valore : this.objectDownload[key], tipo: tipo})
      }
    }
  }

  browser: InAppBrowser;
  openUrl(url) {

          let options ='location=no,toolbar=yes,hidden=no';
          this.browser= new InAppBrowser(url,'_blank',options);
          //this.browser.show();
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

