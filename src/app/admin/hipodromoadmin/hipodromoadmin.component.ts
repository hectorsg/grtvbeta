import { Component, OnInit } from '@angular/core';
import { TriviaService } from 'src/app/servicios/trivia.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-hipodromoadmin',
  templateUrl: './hipodromoadmin.component.html',
  styleUrls: ['./hipodromoadmin.component.scss'],
})
export class HipodromoadminComponent implements OnInit {

  public  hipodromosAll:any;
  public addHipodromo:string;

    //Objetos para la subida de imagen
    uploadPercent : Observable<number>;
    urlImage : Observable<number>;
    public url:string;


    uploadPercent2 : Observable<number>;
    urlImage2 : Observable<number>;
    public url2:string;






    public theHipodromo:any;
    public  ingresarRaces : string;
    //objetos para crear hipodromo
    public nombre : string;
    public pais : string;
    public link : string;
    public resumen : string;
    public historia : string;
    public clima : string;
    public semanaActiva : boolean;
    public actividadHoy:boolean;
    public videoEnVivo : boolean;
    public carreras : number;
    public dia : string;
    public mes : string;
    public hora : string;

    //objetos para crear carrera
    public shortRace :string;
    public pote:string;
    public dayOfTheWeek:string;
    public distancia:string;
    public lastT:string;
    public type:string;
    public uidNum: number;
    public hipodromoActivo:string;
    //objetos para actualizar
    public carrerasArray : any;
    public diaDeLaSemana : string;
    public editRaceModal:string;
    public RaceUseId : string;
    public webHipodromo:string;
    

  constructor(public storage : AngularFireStorage,public app : TriviaService, public db : AngularFirestore,
              public toastController : ToastController, public modal : ModalController) { }

  ngOnInit() {
 
  }

  ionViewDidEnter(){
    this.app.getHipodromo().subscribe(item =>{
      this.hipodromosAll = item
    })

    this.semanaActiva= false
    this.actividadHoy = false
    this.videoEnVivo =false

    let d = new Date();
    let today = d.getDay();


    switch(today) {
      case 0:
        this.diaDeLaSemana = "Dom";
        break;
      case 1:
        this.diaDeLaSemana = "Lun";
        break;
      case 2:
        this.diaDeLaSemana = "Mar";
        break;
      case 3:
        this.diaDeLaSemana = "Mie";
        break;
      case 4:
        this.diaDeLaSemana = "Jue";
        break;
      case 5:
        this.diaDeLaSemana = "Vie";
        break;
      case 6:
        this.diaDeLaSemana = "Sab";
    }
  }

  viewHipodromo(item){
    this.theHipodromo = item
  }

  volverAddHipodromo(){
    this.addHipodromo = null
    this.nombre =null
    this.pais =null
    this.link=null
    this.resumen= null
    this.historia=null
    this.clima=null
    this.semanaActiva=null
    this.actividadHoy=null
    this.videoEnVivo=null
    this.carreras=null
    this.dia=null
    this.mes=null
    this.hora=null
    this.url=null
    this.uploadPercent=null
    this.urlImage =null
      this.webHipodromo = null
    this.uploadPercent2 =null
    this.urlImage2 =null
  }
  openRaceEdit(item){
      this.editRaceModal = 'bottom: 0%; box-shadow: 0px -14px 36px 0px rgba(0, 0, 0, 0.33);'
      this.dayOfTheWeek = item.day
      this.distancia = item.distancia
      this.lastT = item.lastype
      this.pote = item.pote
      this.hipodromoActivo = item.semanaActiva
      this.shortRace = item.shortRaceName
      this.type = item.type
      this.uidNum = item.uid

      this.RaceUseId = item.id
  }
  cerrarRaceEdit(){
    this.editRaceModal = 'bottom: -55%;box-shadow:none;'
    this.dayOfTheWeek = null
    this.distancia = null
    this.lastT = null
    this.pote = null
    this.hipodromoActivo = null
    this.shortRace = null
    this.type = null
    this.uidNum = null
  }
  enterRace(){
    this.ingresarRaces = 'ingresar'
  }

  enterActualizar(){
   this.actividadHoy = this.theHipodromo.actividad
   this.clima = this.theHipodromo.clima
    this.videoEnVivo = this.theHipodromo.enVivo
    this.historia = this.theHipodromo.historiados
    this.resumen = this.theHipodromo.historiauno
    this.link = this.theHipodromo.link
    this.nombre = this.theHipodromo.nombre
    this.carreras = this.theHipodromo.nrocarreras
    this.pais = this.theHipodromo.pais
    this.semanaActiva = this.theHipodromo.semanaActiva
    this.app.getRaces(this.theHipodromo.id, this.diaDeLaSemana).subscribe(item =>{
      this.carrerasArray = item
    })
    this.ingresarRaces = 'actualizar'
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

   onUploads(e){
    // console.log('estas en la funcion', e.target.files[0])
 
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent2 = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage2 = ref.getDownloadURL())).subscribe();
 
    
   }
  addHipo(){
    this.addHipodromo = 'hola'
    this.semanaActiva= false
    this.actividadHoy = false
    this.videoEnVivo =false
    }

  addedHipodromo(){
    let d = new Date();
    let year = d.getFullYear()
    this.db.collection('hipodromos').add({
      actividad:this.actividadHoy,
      clima:this.clima,
      cover:this.url,
      enVivo:this.videoEnVivo,
      falta:`${this.mes} ${this.dia}, ${year} ${this.hora}:00 GMT-04:00`,
      historiados:this.historia,
      historiauno:this.resumen,
      link:this.link,
      nombre:this.nombre,
      nrocarreras:this.carreras,
      pais:this.pais,
      semanaActiva:this.semanaActiva,
      web:this.webHipodromo
    }).then(()=>{
      this.HipodromoBeenPost();
      this.addHipodromo = null

    this.nombre =null
    this.pais =null
    this.link=null
    this.resumen= null
    this.historia=null
    this.clima=null
    this.semanaActiva=null
    this.actividadHoy=null
    this.videoEnVivo=null
    this.carreras=null
    this.dia=null
    this.mes=null
    this.hora=null
    this.url=null
    this.uploadPercent=null
    this.urlImage =null
      this.webHipodromo = null
    this.uploadPercent2 =null
    this.urlImage2 =null

    })
  }

  verUid(){
    if(this.shortRace === 'C1'){
      this.uidNum = 1
    }
    if(this.shortRace === 'C2'){
      this.uidNum = 2
    }
    if(this.shortRace === 'C3'){
      this.uidNum = 3
    }
    if(this.shortRace === 'C4'){
      this.uidNum = 4
    }
    if(this.shortRace === 'C5'){
      this.uidNum = 5
    }
    if(this.shortRace === 'C6'){
      this.uidNum = 6
    }
    if(this.shortRace === 'C7'){
      this.uidNum = 7
    }
    if(this.shortRace === 'C8'){
      this.uidNum = 8
    }
    if(this.shortRace === 'C9'){
      this.uidNum = 9
    }
    if(this.shortRace === 'C10'){
      this.uidNum = 10
    }
    if(this.shortRace === 'C11'){
      this.uidNum = 11
    }
    if(this.shortRace === 'C12'){
      this.uidNum = 12
    }
    if(this.shortRace === 'C13'){
      this.uidNum = 13
    }
    if(this.shortRace === 'C14'){
      this.uidNum = 14
    }
    if(this.shortRace === 'C15'){
      this.uidNum = 15
    }
    if(this.shortRace === 'C16'){
      this.uidNum = 16
    }
    if(this.shortRace === 'C17'){
      this.uidNum = 17
    }
    if(this.shortRace === 'C18'){
      this.uidNum = 18
    }
    if(this.shortRace === 'C19'){
      this.uidNum = 19
    }
    if(this.shortRace === 'C20'){
      this.uidNum = 20
    }
    if(this.shortRace === 'C21'){
      this.uidNum = 21
    }
    if(this.shortRace === 'C22'){
      this.uidNum = 22
    }
    if(this.shortRace === 'C23'){
      this.uidNum = 23
    }
    if(this.shortRace === 'C24'){
      this.uidNum = 24
    }
    if(this.shortRace === 'C25'){
      this.uidNum = 25
    }
  }

  addCarrera(){
    let d = new Date();
    let year = d.getFullYear()

    let dateComplete:string = this.dia + ' de '+this.mes+' de '+ year
    
    this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').add({
      day:this.dayOfTheWeek,
      distancia:this.distancia,
      lastype  : this.lastT,
      pote:this.pote,
      retrospecto: this.url2,
      retroPng:this.url,
      semanaActiva:this.hipodromoActivo,
      shortRaceName:this.shortRace,
      type  : this.type,
      uid:this.uidNum,
      shortDate:dateComplete
    }).then(i=>{
      this.carreraAdded()

      this.ingresarRaces = null
      this.dia = null
      this.mes = null
      this.dayOfTheWeek = null
      this.distancia=null
      this.lastT=null
      this.pote=null
      this.url2 = null
      this.url = null
      this.hipodromoActivo=null
      this.shortRace=null
      this.type=null
      this.uidNum=null

      this.uploadPercent=null
      this.urlImage =null
  
      this.uploadPercent2 =null
      this.urlImage2 =null
    })
  }

  updateHipodromo(){

    let d = new Date();
    let year = d.getFullYear()

    this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
      actividad:this.actividadHoy
      })

    if(this.actividadHoy){
   
    }

    if(this.clima){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        clima:this.clima
       })
    }
    if(this.url){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        
        cover:this.url
           })
    }

    if(this.videoEnVivo){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        
        enVivo:this.videoEnVivo
               })
    }

    if(this.mes && this.dia && this.hora){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        
        falta:`${this.mes} ${this.dia}, ${year} ${this.hora}:00 GMT-04:00`
        })
    }

    if(this.historia){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        
     
        historiados:this.historia
          })
    }

    if(this.resumen){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        
        historiauno:this.resumen
              })
    }
   

      

  if(this.link){
    this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        
      link:this.link
      })
  }

  if(this.nombre){
    this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        
      nombre:this.nombre
        })
  }

  if(this.carreras){
    this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        
      nrocarreras:this.carreras,
            })
  }

  if(this.pais){
    this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        
        
      pais:this.pais,
      })
  }
  this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        
    semanaActiva:this.semanaActiva
      })
 

    if(this.webHipodromo){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).update({
        
        web:this.webHipodromo
          })
    }

    this.ingresarRaces=null
  }

  updateRaces(){
    let d = new Date();
    let year = d.getFullYear()


    if(this.dayOfTheWeek){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({

        day:this.dayOfTheWeek
      })

    }

    if(this.distancia){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({

        distancia:this.distancia
      })
    }

    if(this.lastT){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({

        lastype  : this.lastT
      })
    }

    if(this.pote){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({
        
    pote:this.pote
      })
    }

    if(this.url2){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({
        
    retrospecto: this.url2
          })
    }

    if(this.url){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({
        
    retroPng:this.url
              })
    }
    if(this.hipodromoActivo){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({
        
    semanaActiva:this.hipodromoActivo
                  })
    }

    if(this.shortRace){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({
        
      shortRaceName:this.shortRace
                      })

    }
    if(this.type){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({
        
    type  : this.type
                        })
    }

    if(this.uidNum){
      this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({
        
    uid:this.uidNum
                            })
    }

    if(this.dia && this.mes){
      
    let dateComplete:string = this.dia + ' de '+this.mes+' de '+ year
      this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({
        
    shortDate:dateComplete
                                })
    }

    this.cerrarRaceEdit()

  }

  eliminarCarrera(){
    this.db.collection('hipodromos').doc(this.theHipodromo.id).collection('carreras').doc(this.RaceUseId).update({
      semanaActiva:false
    }).then(i=>{
      this.cerrarRaceEdit()
    })
  }
 

  async HipodromoBeenPost(){
    const toast = await this.toastController.create({
      message: 'Hipodromo Publicado.',
      duration: 2000,
      position:'bottom',
      color:'success'
    });
    toast.present();
  }

  async carreraAdded(){
    const toast = await this.toastController.create({
      message: 'Hipodromo Publicado.',
      duration: 2000,
      position:'bottom',
      color:'success'
    });
    toast.present();
  }

  cerrarModal(){
    this.modal.dismiss()
  }


  changeDay(dayC){
    this.carrerasArray= null;
    this.diaDeLaSemana = dayC
    this.app.getRaces(this.theHipodromo.id, dayC).subscribe(item =>{
      this.carrerasArray = item
      
    })
  }

}
