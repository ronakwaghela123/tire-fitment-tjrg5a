// HOW TO SET UP A reducer.ts FILE:
// Import actions and interfaces
// Create interface for initial state
// Create initial state
// Create reducer function and pass in initial state and actions.
// Return new state

import { Action, createReducer, on } from '@ngrx/store';
import * as fromVehicle from '../actions/vehicle.action';

export interface VehicleState {
  years: string[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: VehicleState = {
  years: [],
  loaded: false,
  loading: false,
};
const reducer = createReducer(
  initialState,
  on(fromVehicle.GetYearAction, (state) => state),
  on(fromVehicle.SuccessGetYearAction, (state: any, { payload }) => {
    console.error(state);
    return { ...state, ToDos: payload, ToDoError: null };
  }),
  on(fromVehicle.ErrorYearAction, (state: any, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, ToDoError: error };
  })
);

export function VehicleReducer(
  state: VehicleState | undefined,
  action: Action
): VehicleState {
  return reducer(state, action);
}
