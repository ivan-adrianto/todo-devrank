import { all, call } from 'redux-saga/effects'
import { todoSaga } from './TodoSagas'

export default function * rootSaga () {
  yield all([
    call(todoSaga),
  ])
}
