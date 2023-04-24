import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import  OwnerApp from './OwnerApp';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[{
      path: "/menu",
    },{
      path: "/account",
    },{
      path: "/login",
    },{
      path: "/register",
    },]
  },
  {
    path:"/owner",
    element:<OwnerApp></OwnerApp>,
    children:[{
      path:"/owner/menu"
    }]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

