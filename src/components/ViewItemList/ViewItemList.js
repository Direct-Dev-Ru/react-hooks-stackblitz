import React from 'react';
import { ViewItem } from '../ViewItem';

export default function ViewItemList(props) {
  const itemlist = props.viewitems || [];

  const display = () => {
    if (itemlist.length === 0) {
      return <h3> No Data Loaded </h3>;
    }

    return (
      <>
        <h3>Данные ответа с сервера: </h3>
        <br />
        {itemlist.map((item, idx) => (
          <ViewItem key={idx} viewitem={item} theme={props.theme} />
        ))}
      </>
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col text-center">{display()}</div>
        </div>
      </div>
    </>
  );
}
