import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main className="mt-15">
                <Outlet></Outlet>
            </main>
            
            <Footer></Footer>
        </div>
    );
};

export default Layout;