import { DomSanitizer } from '@angular/platform-browser';
import { AccService } from './../../servicios/acc.service';
import { AuthService } from './../../servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, IonSlides, ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import sortBy from 'sort-by';
import * as numeral from 'numeral'


@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.scss'],
})
export class AccComponent implements OnInit {

  public gustavoDato:string;
  public datoSpan:string;
  public sliderLoad:string;


  //posibles para apùestale con cariño
  //Boton de comenzar partida
  public comenzarPartida : boolean;
  public month:string;
  public dateFalta:string;
  public JugadaIdNew:string;
  public gameStart:boolean;
  public dateFaltaGame:string;
  public apuestaConfirmada:boolean;
  public apuestaADD:boolean;
  public raceRun : boolean;
  public results:boolean;
  public apuestaActive:string;
  public posicionesActive:string;
  public resultadosActive:string;
  public mustLogin:string;
  public entrarSalaP:boolean;
  //Variables para crear partida
  public participantesMax : string;
  public pais:string;
  public isPublic:boolean;
  public myUser:any;
  public playersArray:any;
  public salaInfo:any;
  public isChecked:boolean;

  //Variables para ingresar a la partida
  public inputEntrarSala:string;

  //variable a la hora de apostar
  public apuestaList:any;
  public betIsDone:string;
  public videosDisponibles:any;
  public carreraSala:any;
  public confirmCaballosJugada:string;
  public UnselectedHorse:string;
  public ConfirmedHorseJugadores:any;
  public HowManyPlayers:any;
  public MiSeleccionArray:any;
  public ApuestasArraySala:any;
  public confirmRestartGame:string;
  public howManyRestartSala:any;
  public carreraVistaPlayers:any;
  public salaAllArray:any;
  public salasDisponibles:any;
  public thereIsActiveSalas:any;
  public puntosAcumulados:number;

  public UserGame:any;

  constructor(public modal : ModalController, public toastController: ToastController,
              public db : AngularFirestore, public auth:AuthService, public afAuth : AngularFireAuth,
                public appSer : AccService, public sanitaizer : DomSanitizer) { }

  @ViewChild('acc', { static: false}) accSlide: IonSlides;
  @ViewChild('listslider', {static:false}) sliderList:IonSlides;

  accslider = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400,
    direction:'vertical'
  }

  ngOnInit() {

   
  }

  ionViewDidEnter(){
    this.isPublic= false
    this.accSlide.update().then(item =>{
      this.afAuth.onAuthStateChanged((user)=>{
        if(user){
          this.sliderLoad = 'opacity:1';
          this.showDato();
          this.appSer.salaALL().subscribe(item =>{
            this.salaAllArray = item
            this.salasDisponibles = this.salaAllArray.filter(item => item.isPublicRoom === true && item.partidaDisponible === true );
          })
          this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
            this.myUser = item;
            
          })
         }else{
           this.mustLogin = 'opacity:1';
         }
        }
    ) })
    
    this.accSlide.lockSwipes(true);

    let d = new Date();
    let n = d.getMonth();

    switch(n) {
      case 0:
        this.month = "January";
        
        break;
      case 1:
        this.month = "February";
        
        break;
      case 2:
        this.month = "March";
        
        break;
      case 3:
        this.month = "April";
        
        break;
      case 4:
        this.month = "May";
        
        break;
      case 5:
        this.month = "June";
        
        break;
      case 6:
        this.month = "July";
        
        break;
        case 7:
        this.month = "August";
        
        break;
        case 8:
        this.month = "September";
        
        break;
        case 9:
        this.month = "October";
        
        break;
        case 10:
        this.month = "November";
        
        break;
        case 11:
        this.month = "December";
        
        break;
    } 

  }

  async showDato(){
    this.sleep(3500);
    this.gustavoDato = 'bottom:0;display:flex;'
    this.datoSpan='bottom: 15%;display:flex;'
   
  }
 

  dismissModal(){
    this.modal.dismiss()
  }

 
  async juegoRapido(){
     this.accSlide.lockSwipes(false)
     this.accSlide.slideTo(0)
     this.accSlide.lockSwipes(true)

     if(this.salasDisponibles.length > 0){
      await  this.sleep(2000);
      this.thereIsActiveSalas = true
     }
 
   }
  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   crearSala(){
    this.accSlide.lockSwipes(false)
    this.accSlide.slideTo(2)
    let idF =Math.random().toString(36).substring(2);
    let idS =Math.random().toString(36).substring(2);
    this.JugadaIdNew = idF+idS
    this.accSlide.lockSwipes(true)
    this.thereIsActiveSalas = null
   }
   howTo(){
    this.accSlide.lockSwipes(false)
    this.accSlide.slideTo(3)
    this.accSlide.lockSwipes(true)
    this.thereIsActiveSalas = null
   }
   backtoStart(){
    this.accSlide.lockSwipes(false)
    this.accSlide.slideTo(1)
    this.accSlide.lockSwipes(true)
    
   }
   async goToSala(){
    this.accSlide.lockSwipes(false)
    this.thereIsActiveSalas = null
  
    
    this.accSlide.slideTo(4)
    this.accSlide.lockSwipes(true)
   
   }

   getLink(){
    return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file='+this.carreraSala.comentario)
   }

   getLinkRace(){
    return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file='+this.carreraSala.carrera)
   }


   CountDown(){
     
    let d = new Date();
    let n = d.getDay();
    let f = d.getDate()
    let m = d.getMonth();
    let h = d.getHours()
    let s = d.getSeconds()
    
    let y = d.getFullYear()
    let min = d.getMinutes()

   
    this.db.collection('videosacc').doc(this.salaInfo.carreraRandom).valueChanges().subscribe(item =>{
      this.carreraSala = item
    })

    if(this.myUser.uid === this.salaInfo.adminId){
      console.log('comenzando la partida')
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).update({
        gameStarted:true
      }).then(o=>{
        console.log('partida Comenzada')
      })
    }

   
    this.appSer.apuestasArray().subscribe(item=>{
      this.apuestaList = item;
    })

    
    
    
    this.comenzarPartida = true

    console.log('comenzando el Countdown')
    const topDate = new Date(`${this.month} ${f}, ${y} ${h}:${min}:${s+10} GMT-04:00`);
  
    const updateClock = (date) => {
      if(!date) return;
      let end = date.getTime();
      let now = Date.now();
      let diff = end - now;
      if(diff < 0) { // <- si el reloj ya mostró todo en cero, lo remuevo del DOM
        this.dateFalta=null
        this.comenzarPartida = null
        clearInterval(interval);
        
        console.log(' ')
      } else {
        let days = Math.floor(diff / 86400000);
        diff = diff % 86400000
        let hours = Math.floor(diff / 3600000);
        diff = diff % 3600000;
        let minutes = Math.floor(diff / 60000);
        diff = diff % 60000;
        let seconds = Math.floor(diff / 1000);
      
        this.dateFalta = seconds + ' seg'

        if(seconds === 0){
          this.comenzarPartida = false
          this.gameStart = true

         

          console.log( '')
          this.dateFalta=null
          clearInterval(interval);
          this.CountDownGame();

        }
        
      }
    }
    
    // se llama a la función una vez para que pinte el resultado inmediatamente
    updateClock(topDate);
    // se hace uso de setInterval para cambiar el contador cada 1 segundo
    const interval = setInterval(updateClock, 1000, topDate)
  }

  cancelarEmergencia(){
    
  }


  CountDownGame(){
    let d = new Date();
    let n = d.getDay();
    let f = d.getDate()
    let m = d.getMonth();
    let h = d.getHours()
    let s = d.getSeconds()
    
    let y = d.getFullYear()
    let min = d.getMinutes()

   

  
    this.appSer.horseSelectedUsers(this.salaInfo.uid).subscribe(item =>{
      this.ConfirmedHorseJugadores = item
    })
    this.appSer.knowHowManyPlayers(this.salaInfo.uid).subscribe(item =>{
      this.HowManyPlayers = item
      console.log(this.HowManyPlayers.length)
    })
    
    
    
    this.comenzarPartida = true


console.log('comenzando countdownGame')
    
    const topDate = new Date(`${this.month} ${f}, ${y} ${h}:${min+3}:${s} GMT-04:00`);
  
    const updateClock = (date) => {
      if(!date) return;
      let end = date.getTime();
      let now = Date.now();
      let diff = end - now;
      if(diff < 0) { // <- si el reloj ya mostró todo en cero, lo remuevo del DOM
        clearInterval(interval);
        this.dateFaltaGame=null
        this.comenzarPartida = null
        this.apuestaADD = true
        console.log(' ')
      } else {
        let days = Math.floor(diff / 86400000);
        diff = diff % 86400000
        let hours = Math.floor(diff / 3600000);
        diff = diff % 3600000;
        let minutes = Math.floor(diff / 60000);
        diff = diff % 60000;
        let seconds = Math.floor(diff / 1000);

        if(minutes > 0 && seconds >0){
          if(minutes===1){
            this.dateFaltaGame = minutes +':'+seconds +' Min'
          }else{
            this.dateFaltaGame = minutes +':'+seconds +' Min'
          }
            
          
        }
        if(minutes === 0 && seconds >0){
          
            this.dateFaltaGame = seconds +' Seg'
            
          
        }
      
        

        
        
      }
    }
    
    // se llama a la función una vez para que pinte el resultado inmediatamente
    updateClock(topDate);
    // se hace uso de setInterval para cambiar el contador cada 1 segundo
    const interval = setInterval(updateClock, 1000, topDate)
  }

  copyToClipBoard(){
    navigator.clipboard.writeText(this.JugadaIdNew).then(item=>{
      this.codigoCopiado()
    }).catch(e => console.error(e));
  }
  async codigoCopiado(){
    const toast = await this.toastController.create({
      message: 'El codigo fue copiado al portapapeles.',
      duration: 2000,
      position:'bottom',
      color:'success'
    });
    toast.present();
  }
  async NoExistenCarrreras(){
    const toast = await this.toastController.create({
      message: 'Lo sentimos. En este momento no disponemos de suficientes carreras para este pais',
      duration: 4000,
      position:'bottom',
      color:'danger'
    });
    toast.present();
  }

  apuestaConfirmadas(){
    this.apuestaConfirmada = true
    this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
      betConfirmed:true
    }).then(item=>{
     this.betIsDone= 'pointer-events:none;opacity:0.6;'
    })
  }
  dismissApuesta(){
    this.apuestaConfirmada = null
    this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
      betConfirmed:false
    }).then(item=>{
      this.betIsDone= null
     })
  }

 async resultsDados(){


  this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
    carreraVista:true
  }).then(i =>{
    this.confirmCaballosJugada = 'background: #078807;color: white;'
    
    
    var timer = setInterval(() => {
      if(this.carreraVistaPlayers.length === this.HowManyPlayers.length){
        this.raceRun = true
        this.appSer.salaApuestas(this.salaInfo.uid).subscribe(item =>{
          this.ApuestasArraySala = item
        })
        this.appSer.howManyRestart(this.salaInfo.uid).subscribe(item =>{
          this.howManyRestartSala = item;
        })
         this.results = true
         this.apuestaActive= 'background: #464646;color: white;'
         this.resultadosActive=null
         this.posicionesActive=null
         this.sleep(300)
         
         this.sliderList.update();
        clearInterval(timer)
      }
  }, 2000);
  
  })

  }
  async verPuntaje(){
    let userID = this.myUser.uid 
    
    let contador = 0
    let stop = 
    this.puntosAcumulados = 0

    this.carreraSala.results.some((x)=>{

      if(this.MiSeleccionArray[0]){
        if(x.name === this.MiSeleccionArray[0].name){
          console.log('Estas sumando '+ x.puntos+' puntos con '+x.name)
          console.log('llevas ', this.puntosAcumulados= numeral(this.puntosAcumulados).add(x.puntos).value())
        /*  this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
            puntos:numeral(this.UserGame.puntos).add(x.puntos).value()
          })*/
  
        }
      }
      if(this.MiSeleccionArray[1]){
        if(x.name === this.MiSeleccionArray[1].name){
          console.log('Estas sumando '+ x.puntos+' puntos con '+x.name)
          console.log('llevas ', this.puntosAcumulados= numeral(this.puntosAcumulados).add(x.puntos).value())
         /* this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
            puntos:numeral(this.UserGame.puntos).add(x.puntos).value()
          })*/
        }
      }

   if(this.MiSeleccionArray[2]){
    if(x.name === this.MiSeleccionArray[2].name){
      console.log('Estas sumando '+ x.puntos+' puntos con '+x.name)
      console.log('llevas ', this.puntosAcumulados= numeral(this.puntosAcumulados).add(x.puntos).value())
    /*  this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
        puntos:numeral(this.UserGame.puntos).add(x.puntos).value()
      })*/
    }
   }
   if(this.MiSeleccionArray[3]){
    if(x.name === this.MiSeleccionArray[3].name){
      console.log('Estas sumando '+ x.puntos+' puntos con '+x.name)
      console.log('llevas ', this.puntosAcumulados= numeral(this.puntosAcumulados).add(x.puntos).value())
    /*  this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
        puntos:numeral(this.UserGame.puntos).add(x.puntos).value()
      })*/
    }
   }
     
     

      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
        puntos:this.puntosAcumulados
      })
      
     
    /*  if(MiSeleccionArray[contador]){
        if(x.name === MiSeleccionArray[contador].name){
         
          console.log(this.UserGame.puntos)
          this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
            puntos:numeral(this.UserGame.puntos).add(x.puntos).value()
  
          }).then(i=>{
            console.log('registro '+ x.puntos)
          })
        


        }
       
      }*/


    })
/*
    do{
        
      
        
      
      
    
     
    this.sleep(2500)
    contador ++
    
    
  }
    while(contador <= this.carreraSala.results.length);
   
*/
  
    
  }
  apustaAct(){
    this.apuestaActive= 'background: #464646;color: white;'
    this.resultadosActive=null
    this.posicionesActive=null
    this.sliderList.slideTo(0)
  }
  resultaActive(){
    this.apuestaActive= null
    this.resultadosActive='background: #464646;color: white;'
    this.posicionesActive=null
    this.sliderList.slideTo(2)
  }
  posicionActive(){
    this.apuestaActive= null
    this.resultadosActive=null
    this.posicionesActive='background: #464646;color: white;'
    this.sliderList.slideTo(1)
  }

  

  //Funciones de escritura
  async creandoSala(){

    try{
      const videoArray = await  this.appSer.videosAcc(this.pais).subscribe(item =>{
                                       this.videosDisponibles = item;
                                       let variab = this.videosDisponibles [Math.floor(Math.random() * this.videosDisponibles.length)]
                                        
                                       if(this.videosDisponibles && variab){
                                         
                                        this.db.collection('apuestalesalas').doc(this.JugadaIdNew).set({
                                          maxPlayer:this.participantesMax,
                                          paisToplay:this.pais,
                                          isPublicRoom:this.isPublic,
                                          partidaDisponible:this.isPublic,
                                          uid:this.JugadaIdNew,
                                          salaName: this.myUser.displayName,
                                          adminId:this.myUser.uid,
                                          nroPartidas:1,
                                          photoURL:this.myUser.photoURL,
                                          carreraRandom:variab.id,
                                          gameStarted:false
                                        }).then(item=>{
                                          this.db.collection('apuestalesalas').doc(this.JugadaIdNew).collection('jugadores').doc(this.myUser.uid).set({
                                            displayName:this.myUser.displayName,
                                            email:this.myUser.email,
                                            uid:this.myUser.uid,
                                            photoURL:this.myUser.photoURL,
                                            spot:1,
                                            puntos:'0',
                                            betConfirmed:false,
                                            horseSelected:false,
                                            restartGame:false,
                                            carreraVista:false,
                                            isAdmin:'true'
                                          })
                                          this.appSer.jugadoresSalas(this.JugadaIdNew).subscribe(item=>{
                                            this.playersArray = item
                                          })
                                          this.db.collection('apuestalesalas').doc(this.JugadaIdNew).valueChanges().subscribe(item =>{
                                            this.salaInfo = item
                                           
                                          })
                                          
                                          this.goToSala();
                                    
                                        })
                                       }else{
                                        this.NoExistenCarrreras()
                                       }
                                      })
         if(videoArray){
           
         }                             
    }catch{

    }
   /*
   */
  }

  async onLoginGoogle(){

    /*
    try{
      this.auth.loginAndroidGoogle().then(i=>{

        this.afAuth.onAuthStateChanged((user)=>{
          if(user){
            this.sliderLoad = 'opacity:1';
            this.mustLogin = null;
            this.showDato();
           }else{
             this.mustLogin = 'opacity:1';
           }
          }


        )
      })

     
    }
    catch(error){console.log(error)}*/
  }
  entrarASalaPrivada(){
    this.entrarSalaP = true
  }

  entrarSalaRapida(itemD){
    this.appSer.jugadoresSalas(itemD.id).subscribe(item=>{
      this.playersArray = item
      if(this.playersArray){
        this.db.collection('apuestalesalas').doc(itemD.id).valueChanges().subscribe(item =>{
          const sala : any = item
          if(this.playersArray.length +1 < sala.maxPlayer){
            this.db.collection('apuestalesalas').doc(itemD.id).collection('jugadores').doc(this.myUser.uid).set({
              displayName:this.myUser.displayName,
              email:this.myUser.email,
              uid:this.myUser.uid,
              photoURL:this.myUser.photoURL,
              spot:this.playersArray.length + 1,
              betConfirmed:false,
              horseSelected:false,
              restartGame:false,
              puntos:'0',
              isAdmin:'false',
              carreraVista:false
            }).then(i =>{
              this.salaInfo = sala
              this.goToSala();
         
              

            })
          }else{
            this.SalaLlena(item)

          }
        })
        
      }
    })
  }

  async SalaLlena(item){
    const toast = await this.toastController.create({
      message: 'La sala de '+item.salaName+' alcanzo su limite de '+item.maxPlayer+' jugadores.',
      duration: 2000,
      position:'bottom',
      color:'warning'
    });
    toast.present();
  }

  enviarCodigoEntrar(){
    this.appSer.jugadoresSalas(this.inputEntrarSala).subscribe(item=>{
      this.playersArray = item
      if(this.playersArray){
        this.db.collection('apuestalesalas').doc(this.inputEntrarSala).valueChanges().subscribe(item =>{
          const sala : any = item
          if(this.playersArray.length +1 < sala.maxPlayer){
            this.db.collection('apuestalesalas').doc(this.inputEntrarSala).collection('jugadores').doc(this.myUser.uid).set({
              displayName:this.myUser.displayName,
              email:this.myUser.email,
              uid:this.myUser.uid,
              photoURL:this.myUser.photoURL,
              spot:this.playersArray.length + 1,
              betConfirmed:false,
              horseSelected:false,
              restartGame:false,
              puntos:'0',
              isAdmin:'false',
              carreraVista:false
            }).then(i =>{
              this.salaInfo = sala
              this.goToSala();
              
              
            })
          }
        })
        
      }
    })
  }

  onAddApuesta(item){
    
   if(item.isCheck === true){
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('apuestas').doc(item.id+this.myUser.displayName).set({
        name:item.name,
        playerName:this.myUser.displayName,
        userPhotoURL:this.myUser.photoURL
      })
    }else{
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('apuestas').doc(item.id+this.myUser.displayName).delete();
    }
    
  }
  addRacersBet(item){
    if(item.isCheck === true){
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).collection(this.salaInfo.carreraRandom).doc(item.name).set({
        name:item.name
      })
    }else{
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).collection(this.salaInfo.carreraRandom).doc(item.name).delete()
    }
  }

 async startGAME(){
  console.log(this.salaInfo.gameStarted)
  
  const doStuff= (date) =>  {
    let salaArray:any = this.salaInfo
      console.log('este es el salaArray '+ salaArray.gameStarted)
      if(salaArray.gameStarted === true){
        clearInterval(timeout)
        console.log('Ya esta en true, entra a la partida')
        this.CountDown()
      }

}
var timeout = setInterval(doStuff,4000);

  }
  onDidDismiss(){
    if(this.salaInfo.adminId === this.myUser.uid){
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).delete()
    }
  }

  confirmHorseSelection(){

   

    this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
      horseSelected:true
    }).then(item =>{

      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).collection(this.salaInfo.carreraRandom).valueChanges().subscribe(item =>{
        this.MiSeleccionArray = item
        this.verPuntaje()
      })

      this.appSer.howManyViewRace(this.salaInfo.uid).subscribe(item =>{
        this.carreraVistaPlayers = item
      })
      this.confirmCaballosJugada = 'background: #078807;color: white;'
      this.UnselectedHorse = 'pointer-events:none;opacity:0.6;'

     var timer = setInterval(() => {
       console.log('estas chequeando por el horseSelected..')
        if(this.ConfirmedHorseJugadores.length === this.HowManyPlayers.length){
          this.raceRun = true
          this.appSer.salaApuestas(this.salaInfo.uid).subscribe(item =>{
            this.ApuestasArraySala = item
          })
          this.confirmCaballosJugada = null
          clearInterval(timer)
        }
    }, 2000);
      
    })
    
  }

  getlistOrdered(){
    return this.HowManyPlayers.sort(sortBy('-puntos'));
    
  }

  restartSala(){
 


    this.confirmRestartGame = 'background: #078807;color: white;'

    this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
      restartGame:true
    }).then(item =>{
     var timer = setInterval(() => {
        if(this.howManyRestartSala.length === this.HowManyPlayers.length){

            this.updateRace();

          clearInterval(timer)
        }
    }, 2000);
      
    })
  }

  async updateRace(){
    try{
      const videoArray = await  this.appSer.videosAcc(this.pais).subscribe(item =>{
                                       this.videosDisponibles = item;
                                       let variab = this.videosDisponibles [Math.floor(Math.random() * this.videosDisponibles.length)]

                                       if(this.videosDisponibles && variab && this.salaInfo.adminId === this.myUser.uid){
                                         
                                        this.db.collection('apuestalesalas').doc(this.salaInfo.uid).update({
                                          carreraRandom:variab.id
                                        }).then(item =>{

          this.gameStart = null
          this.apuestaADD = null
          this.raceRun = null
          this.results = null


          this.apuestaList = null
  this.betIsDone= null;
  this.videosDisponibles=null
  this.carreraSala=null
  this.confirmCaballosJugada=null;
  this.UnselectedHorse=null;
  this.ConfirmedHorseJugadores=null;
  this.HowManyPlayers=null
  this.MiSeleccionArray=null
  this.ApuestasArraySala=null
  this.confirmRestartGame=null
  this.howManyRestartSala=null
                                        })
                                       }else{
                                         console.log('no existen carreras en este pais')
                                       }
                                      })
         if(videoArray){
           
         }                             
    }catch{

    }
  }

  salirdePartida(id){
    this.db.collection('apuestalesalas').doc(id).collection('jugadores').doc(this.myUser.uid).delete().then(ite =>{
      this.gameStart = null
      this.apuestaADD = null
      this.raceRun = null
      this.results = null


      this.apuestaList = null
this.betIsDone= null;
this.videosDisponibles=null
this.carreraSala=null
this.confirmCaballosJugada=null;
this.UnselectedHorse=null;
this.ConfirmedHorseJugadores=null;
this.HowManyPlayers=null
this.MiSeleccionArray=null
this.ApuestasArraySala=null
this.confirmRestartGame=null
this.howManyRestartSala=null
      this.juegoRapido()

    })
  }

  
}
