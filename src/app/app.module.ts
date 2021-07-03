import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//componentes
import { AccComponent } from './juegos/acc/acc.component';
import { HipodromoComponent } from './modales/hipodromo/hipodromo.component';
import { EpisodioComponent } from './modales/episodio/episodio.component';
import { GacetaComponent }from './modales/gaceta/gaceta.component'

//firebase
import { firebaseConfig } from '../environments/environment';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
// pdf 

import { Downloader } from '@ionic-native/downloader/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

//Pipes
import { SafePipe } from './pipes/safe.pipe';
import { PipeModule } from './pipes/pipe/pipe/pipe.module';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AddEpisodioComponent } from './admin/add-episodio/add-episodio.component';
import { LoginemailComponent } from './modales/loginemail/loginemail.component';
import { HipodromoadminComponent } from './admin/hipodromoadmin/hipodromoadmin.component';
import { EncuestasComponent } from './modales/encuestas/encuestas.component';
import { RedesComponent } from './modales/redes/redes.component';

@NgModule({
  declarations: [AppComponent,EpisodioComponent,SafePipe,HipodromoComponent,EncuestasComponent, AccComponent,
     AddEpisodioComponent,LoginemailComponent,HipodromoadminComponent, GacetaComponent,RedesComponent],


  entryComponents: [EpisodioComponent,HipodromoComponent,AccComponent, AddEpisodioComponent, RedesComponent,EncuestasComponent,
    GacetaComponent, LoginemailComponent,HipodromoadminComponent],


  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAnalyticsModule,PipeModule,
 
   AngularFireAuthModule, AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Downloader, InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule {}
 