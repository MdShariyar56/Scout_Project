import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import AllPAge from "../Pages/AllPAge";
import Register from "../Pages/Auth/Register";


export const router = createBrowserRouter([

    {
        path:'/',
        element: <Layout></Layout>,
        children:[
           {
                index: true,
                element:<AllPAge></AllPAge>,
                

            },
        ]
    },
    {
    path:'/register',
    element: <Register></Register>
  },
 ])