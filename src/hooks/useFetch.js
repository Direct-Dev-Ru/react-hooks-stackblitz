import React, { useReducer, useEffect } from 'react';
const { log: logga } = console;

const useFetch = (url, option) => {

  // Reducer
  const init = (initState) => {
    return {
      loading: false,
      urlToFetch: url,
      data: null,
      error: null,
      ...initState,
    };
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
      case 'toggleFetch':
        return { ...state, fetchToggle: !state.fetchToggle };
      case 'reset':
        return init(action.payload);
      default:
        return state;
    }
  };

  const [status = state, dispatch] = useReducer(
    stateReducer,
    {
      loading: false,
      urlToFetch: url,
      data: null,
      error: null,
      fetchToggle: false,
    },
    init
  );

  logga(status);
  function toggleFetch() {
    dispatch({ type: 'toggleFetch', payload: {} });
  }

  function setUrl(urlToSet) {
    dispatch({ type: 'setMany', payload: { urlToFetch: urlToSet } });
  }

  // fetch from api
  async function fetchIt(_url = status.urlToFetch, _option = option) {
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

  useEffect(() => {
    //create a controller
    let controller = new AbortController();
    (async (_url) => {
      try {
        console.log(_url);
        if (_url) {
          await fetchIt(_url, {
            // connect the controller with the fetch request
            signal: controller.signal,
          });
        }
      } catch (e) {
        // Handle the error
        logga(e);
      }
    })(status.urlToFetch);
    //aborts the request when the component umounts
    return () => controller?.abort();
  }, [status.fetchToggle]);

  return { ...status, fetchIt, toggleFetch, setUrl };
};

export default useFetch;
