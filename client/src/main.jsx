import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import router from './router';
import './index.css'
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

serviceWorkerRegistration.register();