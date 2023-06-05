import { Component, OnInit } from '@angular/core';
import { Stat } from 'src/app/model/Stat';
import { statesticservice } from '../../services/user.statestic.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css'],
})
export class StatComponent implements OnInit {
  stat: Stat = new Stat();
  statdata!: Map<string, number>;
  nbuser = 0;
  nbprod = 0;
  peruser=0
  perprod=0 ;

  chartusersLabels: string[] = [];
  chartprodsLabels: string[] = [
  
  ];

  chartData1 = [[0, 0, 0]];
  chartData2 = [[0, 0, 0]];

  constructor(private statesticservices: statesticservice) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.statesticservices.get().subscribe((data) => {
      if (data) {
        //console.log(data);
        this.chartData2 = [data[3]];
        this.chartData1 = [data[1]];
        this.nbprod = data[6][1];
        this.nbuser = data[5][1];
    
      this.perprod = Math.round( ( (data[3][0]+data[3][1]+data[3][2])/data[6][1] )*100)
   
      this.peruser = Math.round( ( (data[1][0]+data[1][1]+data[1][2])/data[7][1] )*100)

      }
    });
  }

  filter() {
    let data1: number[] = new Array();
    let data2: number[] = [];
    let arr1: number[] = [];
    Object.values(this.stat).map(function (value) {
      arr1.push(value);
      return arr1;
    });

    let arr2: string[] = [];
    Object.keys(this.stat).map(function (value) {
      arr2.push(value);
      return arr2;
    });

    for (let index = 0; index < arr1.length; index++) {
      if (this.chartusersLabels.indexOf(arr2[index]) != -1) {
        data1.push(arr1[index]);
      }
      if (this.chartprodsLabels.indexOf(arr2[index]) != -1) {
        data2.push(arr1[index]);
      }
    }

    this.chartData1 = [data1];
    this.chartData2 = [data2];
  }
}
