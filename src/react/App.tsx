import React, { FC } from "react";
import {MantineProvider, Text} from "@mantine/core";
import { createHashRouter, RouterProvider } from 'react-router-dom'
import RouteHandler from "./components/routerHandler/RouterHandler";
import Home from "./page/Home";
import { Provider } from "react-redux"
import store from './store';
import Preview from "./page/Preview";


const router = createHashRouter([
  {
    path: '/',
    element: <RouteHandler />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/preview',
        element: <Preview />,
      }
    ]
  },
]);

const App: FC = () => {
    return (
      <Provider store={store}>
          <MantineProvider withCSSVariables withGlobalStyles theme={{ colorScheme: 'dark' }}>
          <RouterProvider router={router}/>
        </MantineProvider>
      </Provider>
    );
};

export default App;
