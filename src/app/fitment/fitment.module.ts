import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { FitmentContainerComponent } from './fitment-container/fitment-container.component';
import { EffectsModule } from '@ngrx/effects';
import { VehicleEffects } from './store/effects/vehicle.effects';
import { VehicleReducer } from './store/reducers/vehicle.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({ vehicle: VehicleReducer }),
    EffectsModule.forRoot([VehicleEffects]),
  ],
  declarations: [FitmentContainerComponent],
  exports: [FitmentContainerComponent],
})
export class FitmentModule {}
