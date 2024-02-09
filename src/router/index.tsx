import { createBrowserRouter } from 'react-router-dom';
import SplashPage from '../pages/splash/splash-page';
import HomePage from '../pages/home/home-page';
import Root from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <SplashPage />,
        index: true,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
    ],
  },
]);
