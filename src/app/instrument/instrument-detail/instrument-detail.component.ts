import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ShareService} from "../../service/share.service";
import {Instrument} from "../../class/instrument";
import gql from 'graphql-tag';
import {GqlService} from "../../service/gql.service";
import {ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';


const gqlInstrumentDetail = gql`
query($id: ID!){
  instrument(id: $id){
    id
    name
    status
    description
    image
    location
    department{
      name
    }
    admin{
      id
      username
      firstName
      lastName
      phone
      email
    }
    reservationSet{
      edges{
        node{
          user{
            id
            username
            firstName
            lastName
            phone
            email
          }
          startTime
          endTime
        }
      }
    }
    
  }
}`;

@Component({
  selector: 'app-instrument-detail',
  templateUrl: './instrument-detail.component.html',
  styleUrls: ['./instrument-detail.component.css']
})
export class InstrumentDetailComponent implements OnInit, AfterViewInit {
  instrument: Instrument;
  test: string;
  errorMsg: string;

  constructor(private gqlService: GqlService,
              private route: ActivatedRoute,
              private shareService: ShareService) {
  }

  ngOnInit() {
    console.log('instrument detail init .....');
    this.test = 'testtest';
    this.route.params
    // (+) converts string 'id' to a number
      //.switchMap((params: Params) => this.getInstrument(params['id']))
      .subscribe((params: Params) => this.getInstrument(params['id']));
    // this.shareService.detailInstrumentID$.subscribe(
    //   id => {
    //     console.log(`instrument id: ${id} in instrument detail page.`)
    //     this.getInstrument(id)
    //   }
    // )

  }

  ngAfterViewInit() {

  }

  getInstrument(id: string) {
    this.gqlService.queryGQL(gqlInstrumentDetail, {"id": id})
      .subscribe(({data}) => {
        this.instrument = data['instrument'];
        console.log(this.instrument.name)
      })
  }

}
