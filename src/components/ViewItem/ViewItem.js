import React from 'react';
import useInput from './hooks/useInput';
import useFetch from './hooks/useFetch';

export default function ViewItem({ viewitem, theme }) {
  return (
    <div className={`card m-2 App ${theme}`} style={{ width: '90%' }}>
      <div className="card-body">
        <h5 className="card-title">{viewitem.Name}</h5>
        <p className="card-text">
          Чтобы прочитать эту статью, перейдите по ссылке ниже
        </p>
        <a href={viewitem.Page} className="card-link">
          переход по ссылке (нажать)
        </a>
      </div>
    </div>
  );
}
