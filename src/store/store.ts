import { applyMiddleware, createStore, Store } from "redux";
import { reducer } from "store/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import {
  sagaRestoreSessionAction,
  watchSagaLogin,
  watchSagaLogout,
  watchSagaRestoreSession,
} from "smart/User/saga";
import {
  reinitAction,
  watchSagaChangeSetting,
  watchSagaInit,
  watchSagaUpdate,
} from "smart/ConwayLife/saga";

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(watchSagaRestoreSession);
sagaMiddleware.run(watchSagaLogin);
sagaMiddleware.run(watchSagaLogout);
sagaMiddleware.run(watchSagaUpdate);
sagaMiddleware.run(watchSagaInit);
sagaMiddleware.run(watchSagaChangeSetting);
store.dispatch(sagaRestoreSessionAction());
store.dispatch(reinitAction());
