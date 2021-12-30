import './Footer.css'
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    //destructuring pathname from location
    const { pathname } = location;


    return (
        <li className={pathname === "/" ? "copyrights cp-home" : "copyrights"}>© 2021 Maduranga W.P.N. All rights reserved.</li>
    );
}

export default Footer