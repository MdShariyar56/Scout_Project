import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import AllPAge from "../Pages/AllPAge";
import Register from "../Pages/Auth/Register";
import LoginPage from "../Pages/Auth/Login";
import TeacherRegister from "../Pages/Auth/TeacherRegister";
import SelectPage from "../Pages/Auth/SelectPage";


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
  {
    path:'/tregister',
    element: <TeacherRegister></TeacherRegister>
  },
   {
    path: 'login',
    element: <LoginPage></LoginPage>
  },
  {
    path: "/select",
    element: <SelectPage></SelectPage>
  }
 ])