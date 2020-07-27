import { PoorCellProps } from "smart/ConwayLife/Cell/Cell";
import { call, put, takeEvery, select } from "redux-saga/effects";
import { StoreState } from "store/reducer";
import {
  conwayFieldSlice,
  ConwaySettings,
  conwaySettingsSlice,
} from "smart/ConwayLife/slice";
import { AnyAction } from "redux";

const conwaySagaActionTypes = {
  UPDATE: "saga/conway/update",
  REINIT: "saga/conway/reinit",
  CHANGE_SETTING: "saga/conway/changeSetting",
};

export const initField = (
  settings: ConwaySettings
): Array<Array<PoorCellProps>> => {
  const cells: Array<Array<PoorCellProps>> = [];
  for (let i = 0; i < settings.fieldHeight; i++) {
    cells[i] = [];
    for (let j = 0; j < settings.fieldWidth; j++) {
      cells[i][j] = {
        alive: Math.random() < settings.alivePercent / 100,
        animated: false,
        step: 0,
      };
    }
  }
  return cells;
};

const getNextGeneration = (
  oldField: Array<Array<PoorCellProps>>,
  i: number,
  j: number
): boolean => {
  const currentCellLife = oldField?.[i]?.[j]?.alive;
  let countOfNearLives = 0;
  const topLineNumber = i === 0 ? i : i - 1;
  const bottomLineNumber = i === oldField.length - 1 ? i : i + 1;
  const leftColumnNumber = j === 0 ? j : j - 1;
  const rightColumnNumber =
    j === (oldField?.[0] && oldField[0].length - 1) ? j : j + 1;

  for (let i1 = topLineNumber; i1 <= bottomLineNumber; i1++) {
    for (let j1 = leftColumnNumber; j1 <= rightColumnNumber; j1++) {
      if (i1 === i && j1 === j) {
        continue;
      }
      if (oldField?.[i1]?.[j1]?.alive) {
        countOfNearLives++;
      }
    }
  }

  if (currentCellLife) {
    return countOfNearLives > 1 && countOfNearLives < 4;
  } else return countOfNearLives === 3;
};

export const process = (
  oldField: Array<Array<PoorCellProps>>,
  settings: ConwaySettings
): Array<Array<PoorCellProps>> => {
  const newField: Array<Array<PoorCellProps>> = [];
  for (let i = 0; i < settings.fieldHeight; i++) {
    newField[i] = [];
    for (let j = 0; j < settings.fieldWidth; j++) {
      const newFieldAlive: boolean = getNextGeneration(oldField, i, j);
      const oldFieldCell: PoorCellProps =
        i > oldField.length - 1 || j > oldField[i].length - 1
          ? {
              alive: false,
              step: 0,
              animated: false,
            }
          : oldField[i][j];
      newField[i][j] = {
        alive: newFieldAlive,
        step:
          newFieldAlive !== oldFieldCell.alive ||
          !oldFieldCell.animated ||
          oldFieldCell.step > settings.animationStepsCount
            ? 0
            : oldFieldCell.step + 1,
        animated:
          newFieldAlive !== oldFieldCell.alive ||
          (oldFieldCell.animated &&
            oldFieldCell.step < settings.animationStepsCount),
      };
    }
  }
  return newField;
};

export const updateAction = () => {
  return {
    type: conwaySagaActionTypes.UPDATE,
  };
};

export const reinitAction = () => {
  return {
    type: conwaySagaActionTypes.REINIT,
  };
};

export const changeSettingAction = (field: string, value: number) => {
  return {
    type: conwaySagaActionTypes.CHANGE_SETTING,
    payload: {
      field,
      value,
    },
  };
};

export const settingsSelector = (state: StoreState) => state.conwaySettings;

export const fieldSelector = (state: StoreState) => state.conwayField;

export const previous: Array<Array<Array<PoorCellProps>>> = [];

function cellsEqual(cell1: PoorCellProps, cell2: PoorCellProps) {
  return cell1.alive === cell2.alive;
}

export function fieldsEqual(
  field1: Array<Array<PoorCellProps>>,
  field2: Array<Array<PoorCellProps>>
) {
  if (field1.length !== field2.length) {
    return false;
  }
  for (let i = 0; i < field1.length; i++) {
    if (field1[i].length !== field2[i].length) {
      return false;
    }
    for (let j = 0; j < field1[i].length; j++) {
      if (!cellsEqual(field1[i][j], field2[i][j])) {
        return false;
      }
    }
  }
  return true;
}

export function compareWithPrevious(field: Array<Array<PoorCellProps>>) {
  for (const state of previous) {
    if (fieldsEqual(state, field)) {
      return true;
    }
  }
  return false;
}

export function* workerSagaUpdate() {
  const settings = yield select(settingsSelector);
  const field = yield select(fieldSelector);
  const updatedField = yield call(process, field, settings);

  if (!compareWithPrevious(updatedField)) {
    yield put(conwayFieldSlice.actions.update(updatedField));
    previous.push(field);
    if (previous.length > 3) {
      previous.shift();
    }
  }
}

export function* watchSagaUpdate() {
  yield takeEvery(conwaySagaActionTypes.UPDATE, workerSagaUpdate);
}

export function* workerSagaInit() {
  const settings = yield select(settingsSelector);
  const updatedField = yield call(initField, settings);
  yield put(conwayFieldSlice.actions.update(updatedField));
}

export function* watchSagaInit() {
  yield takeEvery(conwaySagaActionTypes.REINIT, workerSagaInit);
}

export function* workerSagaChangeSetting({
  payload: { field, value },
}: AnyAction) {
  yield put(
    conwaySettingsSlice.actions.changeSetting({
      field,
      value,
    })
  );
  const fieldsToUpdate = ["fieldHeight", "fieldWidth", "alivePercent"];
  if (fieldsToUpdate.includes(field)) {
    yield put(reinitAction());
  }
}

export function* watchSagaChangeSetting() {
  yield takeEvery(
    conwaySagaActionTypes.CHANGE_SETTING,
    workerSagaChangeSetting
  );
}
