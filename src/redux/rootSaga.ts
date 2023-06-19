import { all, call } from 'redux-saga/effects';

/*
  En este proyecto no usando directamente ningún Saga.
  Sin embargo aquí dejé la implementación para usarlo
  cuando el proyecto se vuelva más grande y robusto
*/

function* watchCartActions() {}

export default function* rootSaga() {
  yield all([call(watchCartActions)]);
}
