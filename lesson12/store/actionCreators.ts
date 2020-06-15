export const initField = () => {
  return {
    type: "INIT_FIELD",
  };
};

export const initFieldPerformed = () => {
  return {
    type: "INIT_FIELD_PERFORMED",
  };
};

export const changeSetting = (settingName: string, value: number) => {
  return {
    type: "CHANGE_SETTING",
    payload: {
      field: settingName,
      value,
    },
  };
};
