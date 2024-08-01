import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./NavigationBar.scss";
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const NavigationBar = () => {
    const { user, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            const decoded = jwtDecode(user.token);
            setName(decoded.userName);
            setIsAdmin(decoded.isAdmin);
        }
    }, [user]);

    const onLogout = () => {
        handleLogout();
        navigate("/login");
        toast.success("User logged out successfully");
    };

    return (
        <nav className='nav-container'>
            {user && user.token && <div className='username-welcome'>Hello {name}</div>}

            <ul className='nav-links'>
                <li className='nav-link'>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                        About
                    </NavLink>
                </li>
                {user && user.token ? (
                    <>
                        {isAdmin &&
                            <li className='nav-link'>
                                <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                    Admin Page
                                </NavLink>
                            </li>
                        }
                        <li className='nav-link'>
                            <NavLink to="/home" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                Home
                            </NavLink>
                        </li>
                        <li className='nav-link'>
                            <NavLink to="/myCart" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                My Cart
                            </NavLink>
                        </li>
                        <li className='nav-link'>
                            <NavLink to="/" onClick={onLogout} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                Logout
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className='nav-link'>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                Login
                            </NavLink>
                        </li>
                        <li className='nav-link'>
                            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                                Signup
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavigationBar;