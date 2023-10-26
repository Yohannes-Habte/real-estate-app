import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const ButtonSpinner = () => {
  return (
    <ClipLoader
      color={'green'}
      cssOverride={{ marginTop: 4 }}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default ButtonSpinner;
