"use client";

import React from "react";

export default function ErrorMessage({ errorMessage }) {
    if (!errorMessage) return null;

    return (
        <div className="error-message">
            {errorMessage}
            <style jsx>{`
        .error-message {
          color: #d8000c;
          background-color: #ffbaba;
          padding: 10px 20px;
          border: 1px solid #d8000c;
          border-radius: 4px;
          margin-bottom: 1rem;
          font-weight: 600;
        }
      `}</style>
        </div>
    );
}