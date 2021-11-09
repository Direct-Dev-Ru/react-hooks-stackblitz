import React, { useState, useReducer } from 'react';
const { log: logga } = console;
const useFetch = (url, option) => {
  // const [state, setState] = useState({
  //   loading: false,
  //   data: null,
  //   error: null,
  // });

  // Reducer
  const init = (initState) => {
    return { loading: false, data: null, error: null, ...initState };
  };

  const stateReducer = (state, action) => {
    switch (action.type) {
      case 'toggleLoading':
        return { ...state, loading: !state.loading };
      case 'setError':
        return { ...state, error: action.payload };
      case 'setData':
        return { ...state, data: action.payload };
      case 'setMany':
        return { ...state, ...action.payload };
      case 'reset':
        return init(action.payload);
      default:
        return state;
    }
  };

  const [status = state, dispatch] = useReducer(
    stateReducer,
    { loading: false, data: null, error: null },
    init
  );

  logga(status);

  // fetch from api
  function fetchIt(_url = url, _option = option) {
    // setState({ loading: true });
    dispatch({ type: 'toggleLoading' });

    fetch(_url, _option)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        // setState({ loading: false, data: res });
        dispatch({ type: 'setMany', payload: { data: res, loading: false } });
      })
      .catch((error) => {
        // setState({ loading: false, error });
        dispatch({ type: 'setMany', payload: { error, loading: false } });
      });
  }

  return { ...status, fetchIt };
};

export default useFetch;
