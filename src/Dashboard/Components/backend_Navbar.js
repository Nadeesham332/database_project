import menu from './menu.svg';
import exit from './exit.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import './BackendNavbar.css';

import { useLocation } from "react-router-dom";


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setDesktop] = useState(window.innerWidth >= 992);
    const location = useLocation();
    //destructuring pathname from location
    const { pathname } = location;


    const updateMedia = () => {
        setDesktop(window.innerWidth >= 992);
    };

    useEffect(() => {
        //get data in the session
        let data = localStorage.getItem('accessorDetails');
        data = JSON.parse(data);
        //  console.log(data)
        if (data === null)
            window.location.href = `/not_found`;

        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (

        <nav className="navbar">
            <button type="button" className="btn-link btn-anchor mx-auto logo">Result<span>Sheet</span>System</button>

            <img id="mobile-cta" onClick={() => setIsOpen(true)} className="mobile-menu" src={menu} alt="Open Navigation" />

            {(isOpen || isDesktop) && <nav>
                <img id="mobile-exit" onClick={() => setIsOpen(false)} className="mobile-menu-exit" src={exit} alt="Close Navigation" />

                <ul className="primary-nav">
                    <li className={pathname === "/admin/Student" ? "font-weight-bold" : ""}><a href="/admin/Student" onClick={() => { setIsOpen(false) }} >Student</a></li>
                    <li><label className='font-weight-bold'> | </label></li>

                    <li className={pathname === "/admin/Guardian" ? "font-weight-bold" : ""}><a href="/admin/Guardian" onClick={() => { setIsOpen(false) }} >Guardian</a></li>
                    <li><label className='font-weight-bold'> | </label></li>
                    <li className={pathname === "/admin/Employee" ? "font-weight-bold" : ""}><a href="/admin/Employee" onClick={() => { setIsOpen(false) }} >Employee</a></li>
                    <li ><label className='font-weight-bold'> | </label></li>
                    <li className={pathname === "/admin/Courses" ? "font-weight-bold" : ""} ><a href="/admin/Courses" onClick={() => { setIsOpen(false) }} >Courses</a></li>
                    <li><label className='font-weight-bold'> | </label></li>

                    <li className={pathname === "/admin/Assessment" ? "font-weight-bold" : ""}><a href="/admin/Assessment" onClick={() => { setIsOpen(false) }} >Assessments</a></li>
                    <li><label className='font-weight-bold'> | </label></li>
                    <li className={pathname === "/admin/ResultReport" ? "font-weight-bold" : ""}><a href="/admin/ResultReport" onClick={() => { setIsOpen(false) }} >Result Reports</a></li>
                    <li><label className='font-weight-bold'> | </label></li>
                    <li ><a href="/" onClick={() => localStorage.clear('accessorDetails')}>Log Out</a></li>
                </ul>
            </nav>}
        </nav >
    );

}

export default Navbar;