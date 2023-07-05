// import { createStore } from 'https://cdn.skypack.dev/redux';
const $ = document.querySelector.bind(document);

//=========================== MY REDUX ============================//

const createStore = function (reducer) {
  let state = reducer(undefined, {});
  const subscribers = [];
  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);

      subscribers.forEach((subscriber) => subscriber());
    },
    subscribe(cb) {
      subscribers.push(cb);
    },
  };
};

//=========================== MY APP ============================//
const initialState = 0;

//=========================== Reducer function ============================//
function bankReducer(state = initialState, action) {
  switch (action.type) {
    case 'DEPOSIT':
      return state + action.payload;
      break;
    case 'WITHDRAW':
      return state - action.payload;
      break;
    default:
      return state;
      break;
  }
}

//=========================== store ============================//
const store = (window.store = createStore(bankReducer));

//=========================== action ============================//

function actionDeposit(payload) {
  return {
    type: 'DEPOSIT',
    payload,
  };
}
function actionWithdraw(payload) {
  return {
    type: 'WITHDRAW',
    payload,
  };
}

//===========================Dom event handlers ===========================//

$('#deposit').onclick = function () {
  store.dispatch(actionDeposit(10));
};

$('#withdraw').onclick = function () {
  store.dispatch(actionWithdraw(10));
};

//=========================== Listener ===========================//
store.subscribe(() => {
  render();
});
store.subscribe(() => {
  console.log('Listener 1');
});
store.subscribe(() => {
  console.log('Listener 2');
});

//=========================== Render ===========================//
function render() {
  $('#output').innerHTML = store.getState();
}
render();
