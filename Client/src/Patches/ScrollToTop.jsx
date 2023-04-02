import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const Location = useLocation();
    useEffect(() => 
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        }), [Location.pathname]);
    return <Outlet />;
};

export default ScrollToTop;