import { DataJsonService } from './../service/data-json.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll)infiniteScroll: IonInfiniteScroll;


  // declare object
  datas: any [] ;


  constructor(
    private nav: NavController,
    private actRoute: ActivatedRoute,
    private dataAPI: DataJsonService
  ) {}


  ngOnInit() {
    this.readData();
  }

  
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
    }, 1000);
  }


  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


  viewDetails(id){
     this.nav.navigateForward(['articles/' + id]);
  }

  //function for json
  readData() {
    this.dataAPI.getNews().subscribe((data)=>{
      console.log(data);
      this.datas = data.news;
    }) 

  }

}