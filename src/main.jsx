import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.jsx';
import RoverList from './routes/roverList.jsx';
import RoverView from './routes/roverView.jsx';
import {loader as roverLoader} from './routes/roverView.jsx'
import Index from './routes/index';
import ErrorPage from './errorPage.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "rovers",
            element: <RoverList />,
          },
          {
            path: "rovers/:roverName",
            element: <RoverView />,
            loader: roverLoader,
          },
          {
            path: "rovers/:roverName/:date",
            element: <RoverView />,
            loader: roverLoader,
          }
        ],
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
