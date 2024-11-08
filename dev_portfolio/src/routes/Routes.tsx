import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/mainLayout/MainLayout';
import About from '../pages/about/About';
import Error from '../pages/error/Error';
// import Home3DScene from '@pages/home/Home3DScene/components/Home3DScene';
import Home from '../pages/home/Home';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
            // {
            //     path: 'test-area',
            //     element: <Home3DScene />,
            // },
        ],
    },

]);