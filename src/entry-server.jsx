import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render(route) {
  return renderToString(<StrictMode><App route={route} /></StrictMode>);
}
