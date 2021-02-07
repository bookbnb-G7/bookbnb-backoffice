import React from 'react';
import { CAlert } from '@coreui/react';

const ErrorMessage = ({ message }) => {
  return (
    <CAlert color="danger" closeButton>
      {message}
    </CAlert>
  );
};

export default ErrorMessage;
