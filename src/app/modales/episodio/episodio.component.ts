import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, IonSlides, NavParams } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TriviaService } from 'src/app/servicios/trivia.service';
import sortBy from 'sort-by';

declare var videojs : any ;

@Component({
  selector: 'app-episodio',
  templateUrl: './episodio.component.html',
  styleUrls: ['./episodio.component.scss'],
})
export class EpisodioComponent implements OnInit {

  public episodioItem:any;
  
  //necesario para video js
  playerH: any ;

  public Episodios : any;
  public otherEpisodios:any;
  public isPlayin:string;
  public isPlayind:string;

  constructor(public modal : ModalController, public nav : NavParams,public sanitaizer : DomSanitizer, public app : TriviaService) { }

  @ViewChild('masCapitulos', { static: false}) masCapituloss: IonSlides;

  masEpisodios={
      initialSlide: 0,
      slidesPerView: 2,
      speed: 600
  }

  ngOnInit() {
    this.episodioItem = this.nav.get('item')
  }

  getLink(){
    return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file='+this.episodioItem.link)
    }

  dissmissModal(){
    this.modal.dismiss();
  }
  ionViewDidEnter(){
    
    this.playerH = videojs(document.getElementById('episodio'))

    this.playerH.poster('../../../../assets/other/poster1.jpg')
    
    


    
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.episodioItem.link)
    const web:string = link.changingThisBreaksApplicationSecurity

    this.playerH.src({
      type: 'video/youtube',
      src: web
    });

    this.playerH.play()


    
  }


}
