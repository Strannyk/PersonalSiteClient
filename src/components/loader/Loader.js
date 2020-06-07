import React from 'react';
import { WindMillLoading } from 'react-loadingg';
import './Loader.scss';

function Loader() {

  return (
    <div className="loader-wrapper">
      <WindMillLoading speed={2} size={'large'} />
    </div>
  );
}

export default Loader;
