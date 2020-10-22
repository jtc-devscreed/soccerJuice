import { DataJsonService } from './../service/data-json.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  // @ViewChild(InfiniteScroll)infinitescroll: IonInfiniteScroll;
  datas: any [];
  // dataDetails;
  myId;

  isLoading = false;

  constructor(
    public activeRoutes: ActivatedRoute,
    public loadingController: LoadingController,
    private nav: NavController,
    private dataAPI: DataJsonService
  ) {
   }

  ngOnInit() {
    this.presentLoading();
    this.readData();
    }// ng on init

    
    readData(){
      this.activeRoutes.params.subscribe((params) => {
          console.log(params.id);
         this.myId = parseInt(params.id)
       
      })
    
      this.dataAPI.getNews().subscribe((data)=>{
          console.log(data.news);
          return this.datas = data.news;
        });
    }

    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 2000
      });
      await loading.present();
      
      const { role, data } = await loading.onDidDismiss();
      this.isLoading = true;
      this.readData();
    }
  }





