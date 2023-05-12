import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.jsx';
import RoverList from './routes/roverList.jsx';
import RoverView from './routes/roverView.jsx';
import {loader as roverLoader} from './routes/roverView.jsx'
import ErrorPage from './errorPage.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';
import './index.css'

const jsxRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root/>} path="/">
      <Route element={<RoverList />} path="/" />
      <Route element={<RoverView />} path="rovers/:name/" loader={roverLoader}/>
      <Route element={<RoverView />} path="rovers/:name/:date" loader={roverLoader}/>
      <Route element={<ErrorPage />} path="*"/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <RouterProvider router={jsxRouter} />
    </LocalizationProvider>
  </React.StrictMode>,
)
