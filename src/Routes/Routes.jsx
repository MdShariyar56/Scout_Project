import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import AllPAge from "../Pages/AllPAge";
import LoginPage from "../Pages/Auth/Login";
import TeacherRegister from "../Pages/Auth/TeacherRegister";
import SelectPage from "../Pages/Auth/SelectPage";
import AllBooksPage from "../Pages/Book/AllBooksPage";
import AllTeachers from "../Pages/Teacher/AllTeachers";
import AllStudents from "../Pages/Student/AllStudents";
import AddStudent from "../Pages/Student/AddStudent";
import AddTeacher from "../Pages/Teacher/AddTeacher";
import StudentRegister from "../Pages/Auth/StudentRegister";
import EventsList from "../Pages/EventsList/EventsList";
import AddEvent from "../Pages/EventsList/EventAdd";
import EventDetails from "../Pages/EventsList/EventDetails";


export const router = createBrowserRouter([

    {
        path:'/',
        element: <Layout></Layout>,
        children:[
           {
                index: true,
                element:<AllPAge></AllPAge>,
            },
            {
                path: "/all-books",
                element: <AllBooksPage></AllBooksPage>
            },
            {
              path: "/all-teachers",
              element: <AllTeachers></AllTeachers>
            },
            {
              path: "/addTeacher",
              element: <AddTeacher></AddTeacher>
            },
            
            {
              path: "/all-students",
              element: <AllStudents></AllStudents>
            },
            {
              path: "/AddStudent",
              element: <AddStudent></AddStudent>
            },
            {
              path: "/events",
              element: <EventsList></EventsList>
            },
            {
              path: "/events/add",
              element: <AddEvent></AddEvent>
            },
            {
              path: "/events/:id",
              element: <EventDetails></EventDetails>
            }
            
        ]
    },
    {
    path:'/Sregister',
    element: <StudentRegister></StudentRegister>
  },
  {
    path:'/Tregister',
    element: <TeacherRegister></TeacherRegister>
  },
   {
    path: 'login',
    element: <LoginPage></LoginPage>
  },
  {
    path: "/select",
    element: <SelectPage></SelectPage>
  },
  {
              path: "/addStudent",
              element: <AddStudent></AddStudent>
            },
 ])