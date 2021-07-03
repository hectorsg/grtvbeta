import { AngularFirestore } from '@angular/fire/firestore';
import { AccComponent } from './../juegos/acc/acc.component';
import { TriviaService } from './../servicios/trivia.service';
import { HipodromoComponent } from './../modales/hipodromo/hipodromo.component';
import { EpisodioComponent } from './../modales/episodio/episodio.component';
import { Component, ViewChild } from '@angular/core';
import { IonSlides, MenuController, ModalController, ActionSheetController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../servicios/auth.service';
import { AccService } from '../servicios/acc.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEpisodioComponent } from '../admin/add-episodio/add-episodio.component';
import sortBy from 'sort-by';
import { GacetaComponent } from '../modales/gaceta/gaceta.component';
import { LoginemailComponent } from '../modales/loginemail/loginemail.component';
import { HipodromoadminComponent } from '../admin/hipodromoadmin/hipodromoadmin.component';
import { EncuestasComponent } from '../modales/encuestas/encuestas.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

declare var videojs : any ;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('contenido', { static: false}) contenidoss: IonSlides;
  @ViewChild('programacion', { static: false}) progra: IonSlides;
  

  public audios : any;
  public audio: any;
  public start:boolean;
  public videoMenuOpen:string;
  public EnVivoActive:string;
  public EpisodiosActive:string;
  public HipodromosActive:string;
  public JuegosActive:string;
  public EnCentro:string;
  public ToSearch:boolean;
  public ToSearchG:boolean;
  public onVivoBoton:string;
  public transpDiv:string;
  public despuesActive:string;
  public destacadoActive:string;
  public progamaActive:string;
  public gacetaActive:string;
  public episodiosAll : any;
  public turfIcon : string;
  public dismissBotonDiauno:string;
  public dissmissBotonDiaDos :  string; 
  public dissmissBotonDiaTres :string;
  public botonScale : string;
  public hipodromosAll:any;
  public PaisName:any;
  public hipodromosTitle:string;
  public EpisodioLongDate:string;
  public FullMonth:string;
  public day:string;
  public episodioTitle:string;
  public textoBuscar='';
  public catName:any;
  public buscarEpisodio = '';
  public textoGaceta = '';
  public ToSearchE:boolean;
  public gacetaIcon:string;
  public userAny:any;
  public episodiosDestacado:any;
  public episodiosByDay:any;
  public MisEpisodiosMasTarde:any;
  public salaAllArray:any;
  public salasDisponibles :any;

  //necesario para video js
  player: any ;

  public howManyMaxMin:string;
  //variables del ionrange
  public valueRuedita :number;
  public step : number;
  public min : number;
  public max:number;

  public howMuchBack:string;

  public otherTime:number;

  public isPlayin : string;

  public dateRuedita:string;
  public myCurrentHour:string;
  public lastfive:string;
  public month:string;
  public lastten:string;
  public Laterfive:string;
  public LaterTen:string;
  public VivoConfig:string;
  public dataSetup:string;
  public gacetaTitle:string;
  public gacetaHipodromos:any;
  public splashScreen:string;
  public episodiosPropios : any;
  public ProgramaName : any;
  public episodioDestacadoOtros : any;
  public encuestas:any;
  public accActive:any;
  public accConfig : any;
  public encuestaActive : any;
  public pronosticos : any;
  public pronosticosHoy: any;
  public pronosticosOtros : any;
  episodios={
    initialSlide: 0,
    slidesPerView: 6,
    speed: 400,
    direction:'vertical'
  }
  sliderprog={
    initialSlide:0,
    speed:400
  }
  contenidos={
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  }

  constructor(public modal : ModalController, public menu:MenuController, public app : TriviaService,
              public action : ActionSheetController, public afAuth : AngularFireAuth, public db :AngularFirestore, 
              public toast:ToastController, public auth : AuthService, public appSer : AccService,
              public sanitaizer : DomSanitizer,private inBro : InAppBrowser) {
    
    
  }
  ionViewDidEnter(){

   
 

    this.howManyMaxMin = '10 seg'
    this.step = 1
    this.min = -10
    this.max = 10
    this.valueRuedita = 0



    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;
          if(this.userAny){
            this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
              this.MisEpisodiosMasTarde = item
              
            })


          }
          
        })
       }
      }

      


  )

  this.db.collection('apuestaleConfig').doc('9zdC6WoidzO2fJOHG7Qr').valueChanges().subscribe(item=>{
    this.accConfig = item
  })
  this.db.collection('entretenimientoConfig').doc('acc').valueChanges().subscribe(item =>{
    this.accActive = item
  })
  this.db.collection('entretenimientoConfig').doc('encuesta').valueChanges().subscribe(item =>{
    this.encuestaActive = item
  })
  this.appSer.salaALL().subscribe(item =>{
    this.salaAllArray = item
    this.salasDisponibles = this.salaAllArray.filter(item => item.isPublicRoom === true  && item.partidaDisponible === true);
  })

    let d = new Date();
    let n = d.getMonth()
    let day = d.getDate()
    let year = d.getFullYear()
    let today = d.getDay();

    this.knowMyDates()

  



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
     this.EpisodioLongDate = day.toString() + ' de ' + this.FullMonth + ' de ' + year.toString();
     this.dateRuedita = day.toString() + ' de ' + this.FullMonth
    this.contenidoss.update();
    this.progra.update();
    this.progra.lockSwipes(true)
    this.contenidoss.lockSwipes(true)
    this.videoMenuOpen = 'config-buttons'
    this.EnVivoActive = 'active';
    this.destacadoActive='color:white;background: #000000d6;border-radius:10px;'
    this.episodioTitle = 'Episodios Recientes'
    this.hipodromosTitle = 'Todos los Hipodromos' 
    this.gacetaTitle = 'Todos los Hipodromos'
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    

    this.app.getEpisodio().subscribe(item =>{
      this.episodiosAll = item
      //Aqui va el filtro de Episodios Destacado
      let firstFilter =  this.episodiosAll.filter(item => item.destacado === true);
      this.episodioDestacadoOtros = firstFilter.filter(item => item.longDate !== this.EpisodioLongDate)
      this.episodiosDestacado = firstFilter.filter(item => item.longDate === this.EpisodioLongDate)
      this.episodiosDestacado.sort(sortBy('horaEnd'))

      this.episodiosPropios = this.episodiosAll.filter(item => item.propio === true);
      //Aqui va el filtro de programacion y dias
      let secondFilter = this.episodiosAll.filter(item => item.semanaActiva === true);
      this.episodiosByDay = secondFilter.filter(item => item.day === this.day) 
      this.episodiosByDay.sort(sortBy('horaEnd'));
      
    this.episodiosAll = this.episodiosAll.filter(item=> item.semanaActiva === true)

    this.pronosticos = this.episodiosAll.filter(item => item.categoria === 'Pronostico')

    this.pronosticosHoy = this.pronosticos.filter(item => item.longDate === this.EpisodioLongDate)
    this.pronosticosOtros = this.pronosticos.filter(item => item.longDate !== this.EpisodioLongDate)
    this.splashScreen = 'top:100%;'
    })



    


  
    this.app.getHipodromo().subscribe(item =>{
      this.hipodromosAll = item

      this.gacetaHipodromos = this.hipodromosAll

    })

    this.app.getPaisName().subscribe(item =>{
      this.PaisName = item
      this.PaisName.sort(sortBy('name'))
      
    })

    this.app.getProgramaName().subscribe(item =>{
      this.ProgramaName = item
      
    })

    this.app.getEncuesta().subscribe(item =>{
      this.encuestas = item
    })

    this.app.getCatEpisodioName().subscribe(item =>{
      this.catName = item
    })
    this.player = videojs(document.getElementById('video-player'))
    this.player.poster('../../../assets/other/poster1.jpg')
    
    this.app.getEnVivoConfig().subscribe(item =>{
     let config:any  = item

       this.VivoConfig = config[0].tvLink 

       let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.VivoConfig)

       const web:string = link.changingThisBreaksApplicationSecurity
      this.player.src({
        type: 'video/youtube',
        src: web,
      });

      
    this.player.play()

      
    })

  }

  dismissSplash(){
    this.splashScreen = 'top:100%;'
  }

  knowMyDates(){

    var timer = setInterval(()=>{

      let how = this.howManyMaxMin


      if(how === '10 seg'){
        this.myCurrentHour = null
        this.lastfive = null
        this.lastten = null
        this.Laterfive = null
        this.LaterTen = null
      //Current Hour
      let d = new Date();
      let currentHour = d.getHours();
      let currentMinutes = d.getMinutes();
      let currentSeconds = d.getSeconds();
      if(currentMinutes < 10){
        if(currentSeconds<10){
          
        this.myCurrentHour = currentHour+ ':0'+currentMinutes+':0'+currentSeconds
        }else{
          this.myCurrentHour = currentHour+ ':0'+currentMinutes+':'+currentSeconds

        }
      }else{
        if(currentSeconds <10){
          this.myCurrentHour = currentHour+ ':'+currentMinutes+':0'+currentSeconds
        }else{
          
        this.myCurrentHour = currentHour+ ':'+currentMinutes+':'+currentSeconds
      }}

      //past 5 Hour
      
      let h = new Date();
      h.setSeconds(h.getSeconds()-5);
      let pastFiveHours = h.getHours();
      let pastFiveMinutes = h.getMinutes();
      let pastFiveSeconds = h.getSeconds();

    

      if(pastFiveMinutes < 10){
        if(pastFiveSeconds < 10){
          
        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes+':0'+pastFiveSeconds
        }else{
          
        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes+':'+pastFiveSeconds
        }
      }else{
        if(pastFiveSeconds < 10){
          
        this.lastfive = pastFiveHours + ':'+pastFiveMinutes+':0'+pastFiveSeconds
        }else{
          
        this.lastfive = pastFiveHours + ':'+pastFiveMinutes+':'+pastFiveSeconds
        }
      }

      //past 10 hour

      let t = new Date();
      t.setSeconds(t.getSeconds()-10)
      let pastTenHours = t.getHours();
      let pastTenMinutes = t.getMinutes();
      let pastTenSeconds = t.getSeconds();
      if(pastTenMinutes < 10){
        if(pastTenSeconds < 10){
        this.lastten = pastTenHours + ':0'+pastTenMinutes+':0'+pastTenSeconds
        }else{
          
        this.lastten = pastTenHours + ':0'+pastTenMinutes+':'+pastTenSeconds
        }
        }else{
          if(pastTenSeconds < 10){
            this.lastten = pastTenHours + ':'+pastTenMinutes+':0'+pastTenSeconds
          }else{
            this.lastten = pastTenHours + ':'+pastTenMinutes+':'+pastTenSeconds
          }
          

        }

      // later 5 hour
      let L = new Date();
      L.setSeconds(L.getSeconds()+5)
      let LateFiveHours = L.getHours();
      let LateFiveMinutes = L.getMinutes();
      let LateFiveSeconds = L.getSeconds();
      if(LateFiveMinutes < 10){
        if(LateFiveSeconds<10){
          
        this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes+':0'+LateFiveSeconds
        }else{
          
        this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes+':'+LateFiveSeconds
        }
        
        }else{
          if(LateFiveSeconds<10){
            
        this.Laterfive = LateFiveHours + ':'+LateFiveMinutes+':0'+LateFiveSeconds
          }else{
            
        this.Laterfive = LateFiveHours + ':'+LateFiveMinutes+':'+LateFiveSeconds
          }
          
        }

       // later 10 hour
       let T = new Date()
       T.setSeconds(T.getSeconds()+10)
       let LateTenHours = T.getHours();
       let LateTenMinutes = T.getMinutes();
       let LateTenSeconds = T.getSeconds();
       if(LateTenMinutes < 10){
         if(LateTenSeconds<10){

          this.LaterTen = LateTenHours + ':0'+LateTenMinutes+':0'+LateTenSeconds
         }else{
           
          this.LaterTen = LateTenHours + ':0'+LateTenMinutes+':'+LateTenSeconds
         }
        
       }else{
         if(LateTenSeconds<10){
           
          this.LaterTen = LateTenHours + ':'+LateTenMinutes+':0'+LateTenSeconds
         }else{
           
          this.LaterTen = LateTenHours + ':'+LateTenMinutes+':'+LateTenSeconds
         }
         
       }

      }
      if(how === '10 min'){
        this.myCurrentHour = null
        this.lastfive = null
        this.lastten = null
        this.Laterfive = null
        this.LaterTen = null
      //Current Hour
      let d = new Date();
      let currentHour = d.getHours();
      let currentMinutes = d.getMinutes();
      let currentSeconds = d.getSeconds();
      if(currentMinutes < 10){
        this.myCurrentHour = currentHour+ ':0'+currentMinutes
      }else{
        this.myCurrentHour = currentHour+ ':'+currentMinutes
      }

      //past 5 Hour
      
      let h = new Date();
      h.setMinutes(h.getMinutes()-5)
      let pastFiveHours = h.getHours();
      let pastFiveMinutes = h.getMinutes();
      let pastFiveSeconds = h.getSeconds();

    
      if(pastFiveMinutes < 10){

        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes
      }else{

        this.lastfive = pastFiveHours + ':'+pastFiveMinutes
      }


      //past 10 hour

      let t = new Date();
      t.setMinutes(t.getMinutes()-10)
      let pastTenHours = t.getHours();
      let pastTenMinutes = t.getMinutes();
      let pastTenSeconds = t.getSeconds();
      if(pastTenMinutes < 10){
        
        this.lastten = pastTenHours + ':0'+pastTenMinutes
        }else{
          
        this.lastten = pastTenHours + ':'+pastTenMinutes
        }

      // later 5 hour
      let L = new Date();
      L.setMinutes(L.getMinutes()+5)
      let LateFiveHours = L.getHours();
      let LateFiveMinutes = L.getMinutes();
      let LateFiveSeconds = L.getSeconds();
      if(LateFiveMinutes < 0){
        
        this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes
        }else{
          
        this.Laterfive = LateFiveHours + ':'+LateFiveMinutes
        }

       // later 10 hour
       let T = new Date()
       T.setMinutes(T.getMinutes()+10)
       let LateTenHours = T.getHours();
       let LateTenMinutes = T.getMinutes();
       let LateTenSeconds = T.getSeconds();
       if(LateTenMinutes < 10){
        
        this.LaterTen = LateTenHours + ':0'+LateTenMinutes
       }else{
         this.LaterTen = LateTenHours + ':'+LateTenMinutes
       }

      }
      if(how === '10 hr'){
        this.myCurrentHour = null
        this.lastfive = null
        this.lastten = null
        this.Laterfive = null
        this.LaterTen = null
      //Current Hour
      let d = new Date();
      let currentHour = d.getHours();
      let currentMinutes = d.getMinutes();
      let currentSeconds = d.getSeconds();

      if(currentMinutes < 10){
        this.myCurrentHour = currentHour+ ':0'+currentMinutes
      }else{
        this.myCurrentHour = currentHour+ ':'+currentMinutes
      }
  
    

      //past 5 Hour
      let h = new Date();
      h.setHours(h.getHours()-5)
      let pastFiveHours = h.getHours();
      let pastFiveMinutes = h.getMinutes();
      let pastFiveSeconds = h.getSeconds();

    
      if(pastFiveMinutes < 10){

        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes
      }else{

        this.lastfive = pastFiveHours + ':'+pastFiveMinutes
      }


      //past 10 hour
      let t = new Date();
      t.setHours(t.getHours()-10)
      let pastTenHours = t.getHours();
      let pastTenMinutes = t.getMinutes();
      let pastTenSeconds = t.getSeconds();
      if(pastTenMinutes < 10){
        
      this.lastten = pastTenHours + ':0'+pastTenMinutes
      }else{
        
      this.lastten = pastTenHours + ':'+pastTenMinutes
      }

      // later 5 hour
      let L = new Date();
      L.setHours(L.getHours()+5)
      let LateFiveHours = L.getHours();
      let LateFiveMinutes = L.getMinutes();
      let LateFiveSeconds = L.getSeconds();

      if(LateFiveMinutes < 0){
        
      this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes
      }else{
        
      this.Laterfive = LateFiveHours + ':'+LateFiveMinutes
      }


       // later 10 hour
       let T = new Date()
       T.setHours(T.getHours()+10)
       let LateTenHours = T.getHours();
       let LateTenMinutes = T.getMinutes();
       let LateTenSeconds = T.getSeconds();
      if(LateTenMinutes < 10){
        
       this.LaterTen = LateTenHours + ':0'+LateTenMinutes
      }else{
        this.LaterTen = LateTenHours + ':'+LateTenMinutes
      }

      }

    
    },1000)
  
  }

  EnVivoLink(){
   
    return
  }

  openAddEpisodio(){

    this.player.pause()
    this.modal.create({
      component: AddEpisodioComponent,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())
  }

  openLinkBrowser(){
    this.player.pause()
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://grtv.us/quienes-somos/")

    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_self')
  }
  openLinkContacto(){
    this.player.pause()
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://grtv.us/contacto/")

    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_self')
  }

  openEncuesta(){
    this.modal.create({
      component: EncuestasComponent,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())
  }

  openAdminHipodromo(){
    this.player.pause()
    this.modal.create({
      component: HipodromoadminComponent,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present().then(i=>{
      this.player.pause()
    }))
  }

 
  goToLive(){
    this.player.currentTime(this.player.duration())
    this.howMuchBack = null
    this.valueRuedita = 0
  }
   puntito(e){
    this.valueRuedita = e.detail.value
    this.otherTime =e.detail.value

    
  
    if(e.detail.value < 0){
      if(this.valueRuedita === -1){
        
        
        this.intervaloTrigger()
        
      }
      if(this.valueRuedita === -60){
        this.intervaloTrigger()
      }
      if(this.valueRuedita  === -3600){
        this.intervaloTrigger()
      }

      if(this.otherTime >= -59){
        this.howMuchBack= this.otherTime + ' seg'
      }
      if(this.otherTime <= -60 && this.otherTime >= -3599 ){
        this.howMuchBack = Math.floor(this.otherTime % 3600 / 60) + ' min'
      }
      if(this.otherTime <= -3600){
        this.howMuchBack = Math.floor(this.otherTime / 3600)+ ' hr'
      }


      





      let back = Math.abs(e.detail.value) 
      let time =  this.player.currentTime()
     this.player.currentTime(this.player.currentTime() - back)
    }
    
    
  }


  intervaloTrigger(){

    
    var timer = setInterval(() => {

      this.player.on('play', () => {
        this.isPlayin = 'true'
       });
       this.player.on("waiting", function(){ 
         this.isPlayin = 'false'
       });
       this.player.on("pause", function(){ 
        this.isPlayin = 'false'
      });

      if(this.isPlayin === 'false'){
      }else{
        if(this.otherTime === 0){

          clearInterval(timer)
          this.valueRuedita = 0
          this.howMuchBack = null
        }else{
      
  
          
            this.otherTime += 1
            if(this.otherTime >= -59){
              this.howMuchBack= this.otherTime + ' seg'
            }
            if(this.otherTime <= -60 && this.otherTime >= -3599 ){
              this.howMuchBack = Math.floor(this.otherTime % 3600 / 60) + ' min'
            }
            if(this.otherTime <= -3600){
              this.howMuchBack = Math.floor(this.otherTime / 3600)+ ' hr'
            }
            
  
          
      
        }
      }
    

       
        
      
  }, 1000);
  }


  addTimeTrim(){
    if(this.howManyMaxMin === '10 seg'){
      this.howManyMaxMin = '10 min'
      this.step = 60
    this.min = -600
    this.max = 600
    }else{
      this.howManyMaxMin = '10 hr'
      this.step = 3600
    this.min = -36000
    this.max = 36000
    }
    
  }
  restTimeTrim(){
    if(this.howManyMaxMin === '10 hr'){
      this.howManyMaxMin = '10 min'
      this.step = 60
    this.min = -600
    this.max = 600
    }else{
      this.howManyMaxMin = '10 seg'
      this.step = 1
    this.min = -10
    this.max = 10
    }
  }

  changeDayEpisodio(da){
    this.day = da
    let secondFilter = this.episodiosAll.filter(item => item.semanaActiva === true);
    this.episodiosByDay = secondFilter.filter(item => item.day === this.day)
     this.episodiosByDay.sort(sortBy('horaEnd')) 
  }
//Aqui van los botones de navegacion
  onEnVivo(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(0)
    
    this.goToLive()
    this.player.play()
    this.EpisodiosActive= null;
    this.HipodromosActive=null;
    this.JuegosActive=null;
    this.gacetaActive=null;
    this.EnCentro='right:5%;';
    this.EnVivoActive = 'active';
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)
    
  }

  onEpisodios(){
    this.contenidoss.lockSwipes(false);
    this.contenidoss.slideTo(1)
    this.player.pause()
    this.HipodromosActive=null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.gacetaActive=null;
    this.EpisodiosActive= 'active';
    this.EnCentro='right: 15%;'
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)
  }
  onHipodromos(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(2)
    this.player.pause()
    this.EpisodiosActive= null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.gacetaActive=null;
    this.EnCentro='right:20%;';
    this.HipodromosActive='active';
    this.gacetaIcon = 'filter: invert(1);opacity: 1;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)
  }
  onGaceTurf(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(3)
    this.player.pause()
    this.EpisodiosActive= null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.EnCentro='right:20%;';
    this.HipodromosActive=null;
    this.gacetaActive='active';
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:1;filter: invert(0);'
    this.contenidoss.lockSwipes(true)
  }
  onJuegos(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(4);
    this.player.pause()
    this.EpisodiosActive= null;
    this.HipodromosActive=null;
    this.EnVivoActive = null;
    this.gacetaActive=null;
    this.EnCentro='right:25%;';
    this.JuegosActive='active';
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)
  }

  //Aqui van los botones del en vivo
  onDestacado(){
    this.progra.lockSwipes(false)
    this.progra.slideTo(0)
    this.onVivoBoton = 'left:3%;'
    this.transpDiv='left: 10%;'
    this.destacadoActive='color:white;background: #000000d6;border-radius:10px;'
    this.progamaActive=null
    this.despuesActive = null;
    this.progra.lockSwipes(true)
  }
  onProgramas(){
    this.progra.lockSwipes(false)
    this.progra.slideTo(1)
    this.onVivoBoton = 'left:35%;'
    this.transpDiv='left: 43%;'
    this.destacadoActive=null
    this.despuesActive = null;
    this.progamaActive='color:white;background: #000000d6;border-radius:10px;'

    this.progra.lockSwipes(true)
  }
  onVerDespues(){
    this.progra.lockSwipes(false)
    this.progra.slideTo(2)
    this.onVivoBoton = 'left:68%;'
    this.transpDiv='left: 75%;'
    this.despuesActive='color:white;background: #000000d6;border-radius:10px;'
    this.destacadoActive=null
    this.progamaActive=null
    this.progra.lockSwipes(true)
  }

  openMenu(){
    this.menu.enable(true, 'config');
    this.menu.open('config'); 
  }
  openmenuPerfil(){
    this.menu.enable(true, 'perfil');
    this.menu.open('perfil'); 
  }









  videoMenu(){
    if(this.videoMenuOpen === 'config-buttons-active'){
      this.videoMenuOpen = 'config-buttons'
    }else{
      this.videoMenuOpen = 'config-buttons-active'
    }
    
  }

  

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   openEpisodio(item){

    this.player.pause()


    var currentD = new Date();
    var endHappyHourD = new Date(item.endHour);
    
    
    if(currentD > endHappyHourD ){
      this.modal.create({
        component: EpisodioComponent,
        cssClass:'my-custom-class',
        componentProps:{
          item:item
        }
        
      }).then((modal)=> modal.present())
    }else{
      this.episodioNoDisponible()
    }

    
   
   }
   async episodioNoDisponible(){
    const actionSheet = await this.action.create({
      header: 'Este episodio aun no esta disponible, que deseas hacer?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Notificarme cuando este  disponible',
          role: 'destructive',
          icon: 'notifications',
          handler: () => {
            
          }
        },{
        text: 'Cancelar',
        role: 'destructive',
        icon: 'close',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }
   openHipodromo(item){
    this.modal.create({
      component: HipodromoComponent,
      cssClass:'my-custom-class',
      componentProps:{
        item:item
      }
      
    }).then((modal)=> modal.present())
   }

   openGaceta(item){
    this.modal.create({
      component: GacetaComponent,
      cssClass:'my-custom-class',
      componentProps:{
        item:item
      }
      
    }).then((modal)=> modal.present())
   }

   scrollFunction(e){
   
    if(e.srcElement.scrollTop > 30){
     
      this.botonScale = 'bottom: -13%;'
    }
    else{
     
      this.botonScale = null
    }
   }


   async EpisodioFiltroAction() {
    const actionSheet = await this.action.create({
      header: 'Filtro de episodios',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Todos',
        role: 'destructive',
        
        handler: () => {
         this.episodiosPropios = null;
         this.app.getEpisodio().subscribe(item =>{
           this.episodiosPropios = item
           this.episodiosPropios = this.episodiosPropios.filter(item => item.propio === true);
           this.episodioTitle = 'Todos los Episodios'

         })
        }
      } ,{
        text: 'Por Pais',
        role: 'destructive',
        
        handler: () => {

          
         this.PaisFiltroEpisodiosAction()
        }
      },{
        text: 'Por Nombre',
        role: 'destructive',
        
        handler: () => {
         this.NombreFiltroEpisodiosAction()
        }
      } ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


  async HipodromoFiltroAction() {
    const actionSheet = await this.action.create({
      header: 'Filtro',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'En vivo',
        role: 'destructive',
        
        handler: () => {
         
        this.hipodromosAll = this.hipodromosAll.filter(item => item.enVivo === true)
        this.hipodromosTitle = 'En Vivo'
        }
      }  ,{
        text: 'Todos',
        role: 'destructive',
        
        handler: () => {
          this.hipodromosAll = null
        this.app.getHipodromo().subscribe(item =>{
          this.hipodromosAll = item
          this.hipodromosTitle = 'Todos los Hipodromos'
        })
        }
      }  ,{
        text: 'Por pais',
        role: 'destructive',
        
        handler: () => {
         this.PaisFiltroAction()
        }
      }   ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }




  async GacetaFiltroAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Con actividad hoy',
        role: 'destructive',
        
        handler: () => {
      this.gacetaHipodromos = this.gacetaHipodromos.filter(item => item.actividad === true)
      
      this.gacetaTitle = 'Con Actividad Hoy'
        }
      }  ,{
        text: 'Todos',
        role: 'destructive',
        
        handler: () => {
          this.gacetaHipodromos = null
        this.app.getHipodromo().subscribe(item =>{
          this.gacetaHipodromos = item
          this.gacetaTitle = 'Todos los Hipodromos'
        })
        }
      }  ,{
        text: 'Por pais',
        role: 'destructive',
        
        handler: () => {
         this.PaisFiltroActionGaceta()
        }
      }   ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }



  async redesSociales(){
    const actionSheet = await this.action.create({
      header: 'Filtro',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Instagram',
        role: 'destructive',
        
        handler: () => {
          let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://www.instagram.com/grtv.us/")
      
          const web:string = link.changingThisBreaksApplicationSecurity
          this.inBro.create(web, '_self')
        }
      }  ,{
        text: 'Facebook',
        role: 'destructive',
        
        handler: () => {
          let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://www.facebook.com/Grtv.us/")
      
          const web:string = link.changingThisBreaksApplicationSecurity
          this.inBro.create(web, '_self')
        }
      }  ,{
        text: 'Twitter',
        role: 'destructive',
        
        handler: () => {
          let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://twitter.com/grtvus")
      
          const web:string = link.changingThisBreaksApplicationSecurity
          this.inBro.create(web, '_self')
        }
      }   ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


hipodromoToSearch(){
  this.ToSearch = true
  this.hipodromosAll = null
  this.app.getHipodromo().subscribe(item =>{
    this.hipodromosAll = item
    this.hipodromosTitle = 'Buscar en Todos los Hipodromos'
  })
}
GacetaToSearch(){
  this.ToSearchG = true
  this.gacetaHipodromos = null
  this.app.getHipodromo().subscribe(item =>{
    this.gacetaHipodromos = item
    this.gacetaTitle = 'Buscar en Todos los Hipodromos'
  })
}
hipodromoToSearchClose(){
  this.ToSearch = false
  this.hipodromosAll = null
  this.textoBuscar=''
  this.app.getHipodromo().subscribe(item =>{
    this.hipodromosAll = item
    this.hipodromosTitle = 'Todos los Hipodromos'
  })
  
}
GacetaToSearchClose(){
  this.ToSearchG = false
  this.gacetaHipodromos = null
  this.textoGaceta= ''
  this.app.getHipodromo().subscribe(item =>{
    this.gacetaHipodromos = item
    this.gacetaTitle = 'Todos los Hipodromos'
  })
  
}
  async PaisFiltroAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtons()
    });
    await actionSheet.present();
  }

  async PaisFiltroEpisodiosAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtonsEpisodiosPais()
    });
    await actionSheet.present();
  }


  async NombreFiltroEpisodiosAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons:  this.createButtonsEpisodiosNombre()
    });
    await actionSheet.present();
  }

  async PorEpisodioFiltroEpisodiosAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons:  this.createButtonsEpisodiosNombre()
    });
    await actionSheet.present();
  }

  async PaisFiltroActionGaceta(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtonsGaceta()
    });
    await actionSheet.present();
  }

  createButtonsEpisodiosPais(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {
          this.episodiosPropios = null
          this.app.getEpisodiobyPais(index.name).subscribe(item =>{
            this.episodiosPropios = item
            this.episodiosPropios = this.episodiosPropios.filter(item => item.propio === true)
            this.episodioTitle = index.name
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  


  createButtonsEpisodiosNombre(){
    let buttons = [];
    for (let index of this.ProgramaName) {
      let button = {
        text:index.nombre,
        handler: () => {
          this.episodiosPropios = null
          this.app.getEpisodiobyNombre(index.nombre).subscribe(item =>{
            this.episodiosPropios = item
            
            this.episodiosPropios = this.episodiosPropios.filter(item => item.propio === true)
            this.episodioTitle = index.nombre
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  

  createButtons(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {
          this.hipodromosAll = null
          this.app.getHipodromobyPais(index.name).subscribe(item =>{
            this.hipodromosAll = item
            this.hipodromosTitle = 'Hipodromos de ' + index.name
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  createButtonsGaceta(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {
          this.gacetaHipodromos = null
          this.app.getHipodromobyPais(index.name).subscribe(item =>{
            this.gacetaHipodromos = item
            this.gacetaTitle = 'Hipodromos de ' + index.name
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }


  async CategoriaFiltroAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtonsEpisodios()
    });
    await actionSheet.present();
  }

  createButtonsEpisodios(){
    let buttons = [];
    for (let index of this.catName) {
      let button = {
        text:index.name,
        handler: () => {
          this.episodiosAll = null;
          this.app.getEpisodiobyCat(index.name).subscribe(item =>{
            this.episodiosAll = item
            this.episodioTitle = index.name
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }
  buscarG(event){
    this.textoGaceta = event.detail.value;
  }

  buscarE(event){
    this.buscarEpisodio = event.detail.value
  }


  EpisodioToSearch(){
    this.ToSearchE = true
    this.episodiosAll = null
    this.app.getEpisodio().subscribe(item =>{
      this.episodiosAll = item
      this.episodioTitle = 'Buscar en Todos los episodios'
    })
  }
  EpisodioToSearchClose(){
    this.ToSearchE = false
    this.episodiosAll = null
    this.buscarEpisodio=''
    this.app.getEpisodio().subscribe(item =>{
      this.episodiosAll = item
      this.episodioTitle = 'Todos los episodios'
    })
    
  }

  openJuego(){
    this.modal.create({
      component: AccComponent ,
      cssClass:'my-custom-class',
    }).then((modal)=> modal.present())
   }

   openLogin(){
    this.modal.create({
      component: LoginemailComponent,
      cssClass:'my-custom-class',
    }).then((modal)=> modal.present())
   }

   funcionPrueba(){

    var currentD = new Date();
    /*  var startHappyHourD = new Date();
      startHappyHourD.setHours(10,0,0); // 5.30 pm*/
      var endHappyHourD = new Date('11/14/2021 00:00');



    
   }

   async guardarEpisodio(item){
    var currentD = new Date();
    /* Esta es la forma correcta para armar el DATE 
                    11/14/2021 00:00                */
                    console.log(item.endHour)
      var endHappyHourD = new Date(item.endHour);
      
      if(currentD > endHappyHourD ){
        const actionSheet = await this.action.create({
          header: 'Deseas guardar este episodio?',
          cssClass: 'my-custom-class',
          buttons: [
            {
              text: 'Guardar para mas tarde',
              role: 'destructive',
              icon: 'bookmark',
              handler: () => {
                this.addGuardarEpisodio(item);
              }
            },{
            text: 'Cancelar',
            role: 'destructive',
            icon: 'close',
            handler: () => {
              
            }
          }]
        });
        await actionSheet.present();
      }else{
        this.episodioNoDisponible()
      }
     
    
  } 
  addGuardarEpisodio(item){

    this.db.collection('users').doc(this.userAny.uid).collection('vermastarde').doc(item.id).set({
      capitulo : item.capitulo,
      categoria:item.categoria,
      cover:item.cover,
      day:item.day,
      descripcion:item.descripcion,
      horario:item.horario,
      link:item.link,
      longDate:item.longDate,
      nombre:item.nombre,
      shortDate:item.shortDate,
      visto:false
    }).then(i =>{
      if(this.userAny){
        this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
          this.MisEpisodiosMasTarde = item
        })
      }
      this.episodioGuardado(item);
      this.onVerDespues()
    })
  }

  async episodioGuardado(item) {
    const toast = await this.toast.create({
      message: 'El Capitulo '+item.nombre+' a sido guardado para ver mas tarde',
      duration: 6000
    });
    toast.present();
  }
  async onLoginGoogle(){

    /*
    try{
     this.auth.loginAndroidGoogle().then(i=>{

        this.afAuth.onAuthStateChanged((user)=>{
          if(user){
            this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
              this.userAny = item;
              if(this.userAny){
                this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
                  this.MisEpisodiosMasTarde = item
                  
                })
              }
              
            })
           }
          }


        )
      })
     
    }
    catch(error){console.log(error)}*/
  }

  getLink(){
    return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file=https://www.youtube.com/watch?v=wq8cfsdnuz4')
    }

  async onLogOut(){
    try{
      this.auth.logout().then(ite =>{
        this.userAny = null
        
          this.menu.enable(true, 'perfil');
          this.menu.close('perfil');
          
        
      })

    }catch(error){console.log(error)}
  }
}
