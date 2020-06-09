/*
Курс React, урок 17: Middlewares
Домашнее задание 2
src/lesson17/homework/thunk.ts
Напишите свой thunk middleware и подключите в приложение
+1 балл за свой thunk middleware и подключение в приложение
+1 балл за тесты
*/
import { createStore, applyMiddleware, Middleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

// Note: this API requires redux@>=3.1.0
const store = createStore(reducer, applyMiddleware(thunk));

export const logMiddleware: Middleware = () => (next) => (action) => {
  console.log(action);
  return next(action);
};
