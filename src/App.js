import React from 'react';
import { ViewItemList } from './components/ViewItemList';
import './style.css';
import useInput from './hooks/useInput';
import useFetch from './hooks/useFetch';
import useTheme from './hooks/useTheme';

const superValidator = (type, errorMessage) => {
  const selector = {
    httpsOnlyUrl: (v) => {
      return v.startsWith('https://') ? null : errorMessage;
    },
    httpOnlyUrl: (v) => {
      return v.startsWith('http://') ? null : errorMessage;
    },
  };
  return selector[type];
};

export default function App() {
  const urlField1 = useInput({
    initial:
      'https://my-json-server.typicode.com/Direct-Dev-Ru/simpledb/articles',
    required: false,
    validator: superValidator('httpsOnlyUrl', 'Enter url starts with https://'),
  });

  const urlField2 = useInput({
    initial: 'http://',
    required: false,
    validator: superValidator('httpOnlyUrl', 'Enter url starts with http://'),
  });

  const { loading, data, error, fetchIt } = useFetch();

  const { theme, toggleTheme } = useTheme();

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h3>{JSON.stringify(error, null, 2)}</h3>;
  }

  const getData = () => {
    fetchIt(urlField1.value || urlField2.data);
  };

  return (
    <div className={`App ${theme} App root`}>
      <h1>Using custom hooks ...</h1>
      <div>
        <button
          className="btn btn-secondary btn-lg m-2"
          style={{ width: '40%' }}
          type="button"
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>

        <button
          className="btn btn-primary btn-lg m-2"
          style={{ width: '40%' }}
          type="button"
          onClick={getData}
        >
          Get it!
        </button>
      </div>
      <form>
        <div>
          <span> Enter https url: </span>
          <input id="url1" {...urlField1} />
          {urlField1.error && (
            <div>
              <span style={{ color: 'red' }}>
                <small>{urlField1.error}</small>
              </span>
            </div>
          )}
        </div>

        <div>
          <span> Enter http url: </span>
          <input id="url2" {...urlField2} />
          {urlField2.error && (
            <div>
              <span style={{ color: 'red' }}>
                <small>{urlField2.error}</small>
              </span>
            </div>
          )}
        </div>
      </form>
      <ViewItemList viewitems={data} theme={theme} />
    </div>
  );
}
