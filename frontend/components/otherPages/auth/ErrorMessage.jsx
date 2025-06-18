import React from 'react';

export default function ErrorMessage({ errorMessage }) {
  if (!errorMessage) return null;

  return (
    <div className="messages-box-el">
      <div className="alert alert-error fade show" role="alert">
        <p>{errorMessage}</p>
      </div>
    </div>
  );
}
