import { actionTypes } from "store/reducer";
import {AnyAction} from "redux";

export const initField = () => {
  return {
    type: actionTypes.INIT_FIELD,
  };
};

export const initFieldPerformed = () => {
  return {
    type: actionTypes.INIT_FIELD_PERFORMED,
  };
};

export const changeSetting = (field: string, value: number) => {
  return {
    type: actionTypes.CHANGE_SETTING,
    payload: {
      field,
      value,
    },
  };
};

export const sagaChangeSetting = (field: string, value: number) => {
  return {
    type: actionTypes.SAGA_CHANGE_SETTING,
    payload: {
      field,
      value,
    },
  };
};
