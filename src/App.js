import React, { useEffect, useState } from 'react';
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
  const [fetch, setFetch] = useState(false);

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

  useEffect(() => {
    //create a controller
    let controller = new AbortController();
    (async () => {
      try {
        // const response = await fetch(urlField1.value || urlField2.data, {
        //   // connect the controller with the fetch request
        //   signal: controller.signal,
        // });
        // console.log(await response.json());

        await fetchIt(urlField1.value || urlField2.data, {
          // connect the controller with the fetch request
          signal: controller.signal,
        });
      } catch (e) {
        // Handle the error
      }
    })();
    //aborts the request when the component umounts
    return () => controller?.abort();
  }, [fetch]);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h3>{JSON.stringify(error, null, 2)}</h3>;
  }

  const getData = () => {
    setFetch((prev) => !prev);
    // fetchIt(urlField1.value || urlField2.data);
  };

  return (
    <div className={`App ${theme} App root`}>
      <h1>Test React frontend</h1>
      <div className="d-flex flex-row m-2">
        <button
          className="btn btn-secondary btn-lg flex-fill"
          // style={{ width: '40%' }}
          type="button"
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>
      </div>
      <form>
        <div className="d-flex flex-column">
          <div className="flex-fill m-2">
            <span> Enter https url: </span>
          </div>
          <div className="flex-fill m-2">
            <input id="url1" {...urlField1} />
          </div>

          {urlField1.error && (
            <div className="flex-fill m-2">
              <span style={{ color: 'red' }}>
                <small>{urlField1.error}</small>
              </span>
            </div>
          )}
        </div>

        <div className="d-flex flex-column">
          <div className="flex-fill m-2">
            <span> Enter http url: </span>
          </div>
          <div className="flex-fill m-2">
            <input id="url1" {...urlField2} />
          </div>

          {urlField2.error && (
            <div className="flex-fill m-2">
              <span style={{ color: 'red' }}>
                <small>{urlField2.error}</small>
              </span>
            </div>
          )}
        </div>
      </form>
      <div className="d-flex flex-row m-5">
        <button
          className="btn btn-primary btn-lg flex-fill"
          // style={{ width: '40%' }}
          type="button"
          onClick={getData}
        >
          Get it!
        </button>
      </div>
      <ViewItemList viewitems={data} theme={theme} />
    </div>
  );
}
