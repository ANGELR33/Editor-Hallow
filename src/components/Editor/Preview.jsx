import React, { useEffect, useRef } from 'react';
import './Preview.css';

const Preview = ({ html, css, js }) => {
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { 
            margin: 0; 
            padding: 16px; 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #fff;
            background-color: transparent;
          }
          /* User CSS */
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          /* User JS */
          try {
            ${js}
          } catch (err) {
            console.error(err);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-title">Vista Previa</span>
      </div>
      <iframe
        srcDoc={srcDoc}
        title="preview"
        className="preview-iframe"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
