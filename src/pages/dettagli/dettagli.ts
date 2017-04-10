import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController  } from 'ionic-angular';
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

  objectInfoAggiuntive:any;
  
  mail:string;

  visible : boolean;

  gareObjet: FirebaseObjectObservable<any>;
  preferenzeSnap: FirebaseObjectObservable<any>;
  garaImportante: FirebaseObjectObservable<any>;




  constructor(public af: AngularFire, public user:User, public navCtrl: NavController, public navParams: NavParams, private platform: Platform, public alertCtrl: AlertController) {
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
    let etichetta = 'Link'
    let tipo = 'link'
    if (this.gara.value.DOWNLOAD != ''){
      let i = 1
      this.objectDownload = JSON.parse(this.gara.value.DOWNLOAD);

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
           etichetta = "Documento";
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
          etichetta = "LINK " + i;
          tipo = 'link'
          i++
        }
        if (this.objectDownload[key] != '') {
          this.arrayRetDownload.push({chiave:etichetta, valore : this.objectDownload[key], tipo: tipo})
        }
      }
    }
    // Aggiungere ingo aggiuntive
    if (this.gara.value.INFO_AGGIUNTIVE != '{}' && this.gara.value.INFO_AGGIUNTIVE != ''){
   
      
       this.objectInfoAggiuntive = JSON.parse(this.gara.value.INFO_AGGIUNTIVE);
       for (var key in this.objectInfoAggiuntive) {
         if (key.toUpperCase().includes('MAIL')){
               this.mail = this.objectInfoAggiuntive[key]
               console.log('mail')
         } else {
              if (key.toUpperCase().includes('LINK')){
                etichetta = "Apri sito web";
                tipo = 'link'
              } else if (key.toUpperCase().includes('SITO_GURI')){
                 etichetta = "Gazzetta Ufficiale";
                 tipo = 'link'
              } else if (key.toUpperCase().includes('SITO_WWW')){
                 etichetta = "Apri sito web";
                 tipo = 'link'
              }  else if (key.toUpperCase().includes('SITO_HTTP')){
                 etichetta = "Apri sito web";
                 tipo = 'link'
              }  else {
                console.log('non ce risorsa aggiuntiva')
              }
              if (this.objectInfoAggiuntive[key] != '' && this.arrayRetDownload['valore'] != this.objectInfoAggiuntive[key]) {
               this.arrayRetDownload.push({chiave:etichetta, valore : this.objectInfoAggiuntive[key], tipo: tipo})
              }
         }

       }
    } 

  }

  browser: InAppBrowser;
  openUrl(url, tipo) {
          console.log(tipo)
          if (tipo == 'link'){

                let prefix = 'http://';
                if (url.substr(0, prefix.length) !== prefix)
                {
                    url = prefix + url;
                }

                let options ='location=no,toolbar=yes,hidden=no';
                this.browser= new InAppBrowser(url,'_blank',options);

          } else if  (tipo == 'download') {
             let options ='location=no,toolbar=yes,hidden=no';
             url = 'https://docs.google.com/viewer?url=' + encodeURIComponent(url);   
             this.browser= new InAppBrowser(url,'_blank',options);
             open(url, '_blank', 'location=no');

          } else {
            this.showAlert() 
          }
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

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Attenzione!',
      subTitle: 'Non è possibile aprire questo link',
      buttons: ['OK']
    });
    alert.present();
  }


}

