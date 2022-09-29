import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TireFitmentService } from '../service/tire-fitment.service';

@Component({
  selector: 'app-fitment-container',
  templateUrl: './fitment-container.component.html',
  styleUrls: ['./fitment-container.component.css'],
})
export class FitmentContainerComponent implements OnInit {
  public yearList: Array<any> = [];
  public makeList: Array<any> = [];
  public modelsList: Array<any> = [];
  public trimList: Array<any> = [];
  private _tire_fitment_subscription: Subscription = new Subscription();
  constructor(private _tireFitmentService: TireFitmentService) {}

  ngOnInit() {
    this.getYears();
  }

  public getYears() {
    this._tire_fitment_subscription.add(
      this._tireFitmentService.getYears().subscribe((response: any) => {
        if (response.success === true && response.year.length > 0) {
          this.yearList = response.year;
        }
        console.log(response);
      })
    );
  }

  public getMake(data) {
    let requestParam = {
      year: data,
    };
    this._tire_fitment_subscription.add(
      this._tireFitmentService
        .getMake(requestParam)
        .subscribe((response: any) => {
          if (response.success === true && response.make.length > 0) {
            this.makeList = response.make;
          }
          console.log(response);
        })
    );
  }
  public getModels(data) {
    let requestParam = {
      make: data,
    };
    this._tire_fitment_subscription.add(
      this._tireFitmentService.getModals('').subscribe((response: any) => {
        if (response.success === true && response.model.length > 0) {
          this.modelsList = response.model;
        }
        console.log(response);
      })
    );
  }
  public getTrim(data) {
    let requestParam = {
      model: data,
    };
    this._tire_fitment_subscription.add(
      this._tireFitmentService
        .getTrim(requestParam)
        .subscribe((response: any) => {
          // if (response.success === true && response.year.length > 0) {
          //   this.yearList = response.year;
          // }
          console.log(response);
        })
    );
  }

  public onSelectFitment(data, type) {
    if (type === 'year') {
      this.getMake(data);
    } else if (type === 'make') {
      this.getModels(data);
    } else if (type === 'models') {
      this.getTrim(data);
    }
  }

  // Make with year (2021)
  // https://6080be3273292b0017cdbf2a.mockapi.io/makes

  // Model with year and make (Acura)
  // https://6080be3273292b0017cdbf2a.mockapi.io/models

  // Trim with year, make, model (RDX)
  // https://6080be3273292b0017cdbf2a.mockapi.io/trim
}
