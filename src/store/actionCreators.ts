import { actionTypes } from "store/reducer";

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

export const changeSetting = (settingName: string, value: number) => {
  return {
    type: actionTypes.CHANGE_SETTING,
    payload: {
      field: settingName,
      value,
    },
  };
};
