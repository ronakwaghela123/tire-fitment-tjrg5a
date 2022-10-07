import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TireFitmentService } from '../../service/tire-fitment.service';
import * as VehicleActions from '../actions/vehicle.action';

@Injectable()
export class VehicleEffects {
  constructor(
    private _tireFitmentService: TireFitmentService,
    private action$: Actions
  ) {}

  GetVehicles$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VehicleActions.GetYearAction),
      mergeMap((action) =>
        this._tireFitmentService.getYears().pipe(
          map((data: any) => {
            return VehicleActions.SuccessGetYearAction(data);
          }),
          catchError((error: Error) => {
            return of(VehicleActions.ErrorYearAction(error));
          })
        )
      )
    )
  );
}
