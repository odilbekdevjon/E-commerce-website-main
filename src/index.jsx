import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Provider } from './context/authContext';
import { LangProvider } from './context/langContext';

// In your component file (e.g., App.js)
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Provider>
          <LangProvider>
            <App/>
          </LangProvider>
        </Provider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
