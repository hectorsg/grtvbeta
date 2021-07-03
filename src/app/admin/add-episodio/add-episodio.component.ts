import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-add-episodio',
  templateUrl: './add-episodio.component.html',
  styleUrls: ['./add-episodio.component.scss'],
})
export class AddEpisodioComponent implements OnInit {
  //Objetos para la subida de imagen
  uploadPercent : Observable<number>;
  urlImage : Observable<number>;
  public url:string;

  //Strings para los datos de el episodio
  public EpisodioLongDate:string;
  public EpisodioShortDate:string;
  public day:string;
  public FullMonth:string;
  public nombre : string;
  public capituloNro:number;
  public categoria : string;
  public horario : string;
  public descripcion : string;
  public episodioId:string;
  public link:string;
  public destacado:boolean;
  public semanaIsActive:boolean;
  public year:number;
  public dayOfTheWeek:string;
  public mesEstreno:string;
  public diaEstreno:string
  public hora:string;
  public pais : string;
  public propio:boolean;

  constructor(public storage : AngularFireStorage, public modal : ModalController, 
              public action : ActionSheetController, public db:AngularFirestore) { }

  ngOnInit() {

    this.semanaIsActive = false
    this.destacado = false
    this.propio = false

    let d = new Date();
    let n = d.getMonth()
    let day = d.getDate()
    let year = d.getFullYear()
    this.year = year
    let today = d.getDay();


    switch(today) {
      case 0:
        this.day = "Dom";
        break;
      case 1:
        this.day = "Lun";
        break;
      case 2:
        this.day = "Mar";
        break;
      case 3:
        this.day = "Mie";
        break;
      case 4:
        this.day = "Jue";
        break;
      case 5:
        this.day = "Vie";
        break;
      case 6:
        this.day = "Sab";
    }

    switch(n) {
      case 0:
        this.FullMonth = "Enero";
        break;
      case 1:
        this.FullMonth = "Febrero";
        break;
      case 2:
        this.FullMonth = "Marzo";
        break;
      case 3:
        this.FullMonth = "Abril";
        break;
      case 4:
        this.FullMonth = "Mayo";
        break;
      case 5:
        this.FullMonth = "Junio";
        break;
      case 6:
        this.FullMonth = "Julio";
        break;
      case 7:
          this.FullMonth = "Agosto";
          break; 
      case 8:
          this.FullMonth = "Septiembre";
          break; 
          
      case 9:
          this.FullMonth = "Octubre";
          break; 
      case 10:
          this.FullMonth = "Noviembre";
          break; 
          
      case 11:
          this.FullMonth = "Diciembre";
          break;
    }
     this.episodioId = Math.random().toString(36).substring(2);
  }

  dissmissModal(){
    this.modal.dismiss()
  }

  onUpload(e){
    // console.log('estas en la funcion', e.target.files[0])
 
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
 
    
   }


   async PublicarAction() {
    const actionSheet = await this.action.create({
      header: 'Estas seguro?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Todo correcto, publicar',
        role: 'destructive',
        icon: 'walk',
        handler: () => {
         this.publicar();
        }
      }  ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  publicar(){
    switch(this.mesEstreno) {
      case '1':
        this.FullMonth = "Enero";
        break;
      case '2':
        this.FullMonth = "Febrero";
        break;
      case '3':
        this.FullMonth = "Marzo";
        break;
      case '4':
        this.FullMonth = "Abril";
        break;
      case '5':
        this.FullMonth = "Mayo";
        break;
      case '6':
        this.FullMonth = "Junio";
        break;
      case '7':
        this.FullMonth = "Julio";
        break;
      case '8':
          this.FullMonth = "Agosto";
          break; 
      case '9':
          this.FullMonth = "Septiembre";
          break; 
          
      case '10':
          this.FullMonth = "Octubre";
          break; 
      case '11':
          this.FullMonth = "Noviembre";
          break; 
          
      case '12':
          this.FullMonth = "Diciembre";
          break;
    }

    let endHourCode = this.mesEstreno +'/'+this.diaEstreno+ '/'+ this.year + ' '+ this.hora
    this.EpisodioLongDate = this.diaEstreno + ' de ' + this.FullMonth + ' de ' + this.year;
    this.EpisodioShortDate = this.dayOfTheWeek +' '+ this.diaEstreno +'/'+this.mesEstreno;


    this.db.collection('episodios').add({
      nombre:this.nombre,
      capitulo:this.capituloNro,
      link:this.link,
      categoria:this.categoria,
      horario:this.horario,
      descripcion:this.descripcion,
      cover:this.url,
      shortDate:this.EpisodioShortDate,
      longDate:this.EpisodioLongDate,
      day:this.dayOfTheWeek,
      destacado:this.destacado,
      endHour:endHourCode,
      semanaActiva:this.semanaIsActive,
      horaEnd:this.hora,
      pais:this.pais,
      propio:this.propio

    }).then(item =>{
      this.db.collection('catepisodios').doc(this.categoria).set({
        name:this.categoria
      }).then(i=>{
        this.modal.dismiss()
      })
    })
  }

}
