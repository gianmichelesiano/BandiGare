import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Auth } from '@ionic/cloud-angular';
import { LoginPage } from '../login/login'
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  
  public gare = [];
  public gareFiltrateLavori = [];
  public gareFiltrateServizi = [];
  public gareFiltrateForniture = [];
  public doughnutChartLabels:string[] = ['Lavori', 'Servizi', 'Forniture'];
  public doughnutChartData:number[] = [10,20,30];
  public doughnutChartType:string = 'doughnut';
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Nord', 'Centro', 'Sud'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80], label: 'Lavori'},
    {data: [28, 48, 40], label: 'Servizi'},
    {data: [28, 48, 40], label: 'Forniture'}
  ];
 


  constructor(public navCtrl: NavController, private auth:Auth,  public navParams: NavParams,  storage: Storage) {
    if(!this.auth.isAuthenticated()) {
        this.navCtrl.setRoot(LoginPage)
    }
    storage.get('gareDB').then((val) => {
      for (var key in val) {    
            this.gare.push({key: key, value: val[key]});
      }
      this.doughnutChartData = this.doDataGrafico();
      this.barChartData = this.doGraficoBarre();   
    })

  }

doGraficoBarre(){
  //REGIONE
  let arrRegioniNord = ["PIEMONTE","LOMBARDIA", "TRENTINO-ALTO ADIGE", "EMILIA-ROMAGNA", "VENETO" , "FRIULI-VENEZIA GIULIA", "VALLE D'AOSTA", "LIGURIA", "VALLE D AOSTA"]
  let arrRegioniCentro = ["LAZIO","TOSCANA", "ABRUZZO", "MARCHE", "UMBRIA" ]
  let arrRegioniSud = ["CAMPANIA","PUGLIA", "SARDEGNA", "BASILICATA", "SICILIA", "CALABRIA", "MOLISE"]
  let arrCategorie = ["LAVORI","SERVIZI","FORNITURE" ]
  let arr = [];

  let datiLavori = [];
  let datiServizi = [];
  let datiForniture = [];


  for (let i=0; i<arrCategorie.length; i++) { 
        let totRegioni = 0
        for (let j=0; j<arrRegioniNord.length; j++) { 
              let arrTemp = [];
              arrTemp = this.gare.filter( function (el) { 
                  return el['value']['REGIONE'] == arrRegioniNord[j] &&  el['value']['TIPOLOGIA'] == arrCategorie[i]
              })     
              totRegioni = totRegioni  + arrTemp.length
        } 
        if (i==0){  datiLavori.push(totRegioni);    }
        if (i==1){  datiServizi.push(totRegioni);   }
        if (i==2){  datiForniture.push(totRegioni );}
  }

  for (let i=0; i<arrCategorie.length; i++) {
        let totRegioni = 0
        for (let j=0; j<arrRegioniCentro.length; j++) { 
             console.log(arrCategorie[i]+arrRegioniCentro[j])
              let arrTemp = [];
              arrTemp = this.gare.filter( function (el) { 
                  return el['value']['REGIONE'] == arrRegioniCentro[j] &&  el['value']['TIPOLOGIA'] == arrCategorie[i]
              })
              console.log(arrTemp.length);
              totRegioni = totRegioni  + arrTemp.length
        }
        if (i==0){  datiLavori.push(totRegioni);    }
        if (i==1){  datiServizi.push(totRegioni);   }
        if (i==2){  datiForniture.push(totRegioni );}


  }

  for (let i=0; i<arrCategorie.length; i++) {
        let totRegioni = 0 
        for (let j=0; j<arrRegioniSud.length; j++) { 
            console.log(arrCategorie[i]+arrRegioniSud[j])
              let arrTemp = [];
              arrTemp = this.gare.filter( function (el) { 
                  return el['value']['REGIONE'] == arrRegioniSud[j] &&  el['value']['TIPOLOGIA'] == arrCategorie[i]
              })
              console.log(arrTemp.length);
              totRegioni = totRegioni  + arrTemp.length
        }
        if (i==0){  datiLavori.push(totRegioni);    }
        if (i==1){  datiServizi.push(totRegioni);   }
        if (i==2){  datiForniture.push(totRegioni );}
  }

  arr.push({data:datiLavori, label:"Lavori"});
  arr.push({data:datiServizi, label:"Servizi"});
  arr.push({data:datiForniture, label:"Forniture"});


  return arr;
}

  doDataGrafico(){
    let arr = [];
    this.gareFiltrateLavori = this.gare.filter( function (el) { 
      return el['value']['TIPOLOGIA'] == "LAVORI"
    })
    arr.push(this.gareFiltrateLavori.length);

    this.gareFiltrateServizi = this.gare.filter( function (el) { 
      return el['value']['TIPOLOGIA'] == "SERVIZI"
    })
    arr.push(this.gareFiltrateServizi.length);

    this.gareFiltrateForniture = this.gare.filter( function (el) { 
      return el['value']['TIPOLOGIA'] == "FORNITURE"
    })
    arr.push(this.gareFiltrateForniture.length);
    
    return arr;
  }

 // events
  public chartClicked(e:any):void {
  }
 
  public chartHovered(e:any):void {
  }

}
