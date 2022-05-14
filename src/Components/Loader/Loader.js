import React from 'react';
import ReactDOM from 'react-dom';
import './LoaderStyles.css';

export function Loader() {
  return ReactDOM.createPortal(
    <>
      <div className="overlay" />
      <div className="content">Fetching More Events...</div>
    </>,
    document.getElementById('portal')
  );
}
