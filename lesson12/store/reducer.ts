import { ControlsState } from "components/App/Main/ConwayLifeApp/ControlsForm/ControlsForm";
import { AnyAction } from "redux";

export const reducer = (state: ControlsState, action: AnyAction) => {
  if (action.type === "CHANGE_SETTING") {
    if (action.payload.value === 0 || action.payload.value === null) {
      return state;
    }
    return {
      ...state,
      [action.payload.field]: action.payload.value,
    };
  } else {
    return state;
  }
};
