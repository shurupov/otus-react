import { AnyAction } from "redux";
import { StoreState } from "store/store";

export const reducer = (state: StoreState, action: AnyAction) => {
  switch (action.type) {
    case "INIT_FIELD":
      return {
        ...state,
        reinitField: true,
      };
    case "INIT_FIELD_PERFORMED":
      return {
        ...state,
        reinitField: false,
      };
    case "CHANGE_SETTING":
      if (!action.payload.value) {
        return state;
      }
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        reinitField:
          action.payload.field === "fieldHeight" ||
          action.payload.field === "fieldWidth" ||
          action.payload.field === "alivePercent",
      };
    default:
      return state;
  }
};
