import React, { useState, useEffect } from 'react';

const useFetch = (url, option) => {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });
  function fetchIt(_url = url, _option = option) {
    setState({ loading: true });

    fetch(_url, _option)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setState({ loading: false, data: res });
      })
      .catch((error) => {
        setState({ loading: false, error });
      });
  }

  return { ...state, fetchIt };
};

export default useFetch;
