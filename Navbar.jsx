import React, { useContext, useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { UserCircleIcon, ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import { AppContext } from '../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { token, setToken } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    let timeout;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
                !event.target.closest('.mobile-menu-button')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
        toast.success("You've been logged out!");
        navigate('/');
    };

    const navLinks = [
        { path: '/', name: 'Home' },
        { path: '/about', name: 'About' },
        { path: '/doctors', name: 'Book Appointment' },
        { path: 'http://localhost:5174/login', name: 'Support' }
    ];

    // <button onClick={() => window.location.href = ''}>
    //             Raise ticket
    //         </button>

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img 
                            onClick={() => navigate('/')} 
                            className="w-16 cursor-pointer transition-transform hover:scale-105" 
                            src={assets.logo} 
                            alt="PetCare Logo" 
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <ul className="flex items-center gap-6 font-medium">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <NavLink 
                                        to={link.path}
                                        className={({ isActive }) => 
                                            `relative py-2 px-1 transition-colors ${isActive ? 'text-green-500' : 'text-gray-700 hover:text-primary'}`
                                        }
                                    >
                                        {link.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button 
                            className="mobile-menu-button p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <XIcon className="h-6 w-6" />
                            ) : (
                                <MenuIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {token ? (
                            <div 
                                className="relative" 
                                ref={dropdownRef}
                                onMouseEnter={() => {
                                    clearTimeout(timeout);
                                    setIsOpen(true);
                                }}
                                onMouseLeave={() => {
                                    timeout = setTimeout(() => setIsOpen(false), 200);
                                }}
                            >
                                <div 
                                    className="flex items-center gap-1 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <UserCircleIcon className="w-8 h-8 text-gray-600" />
                                    <ChevronDownIcon className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </div>
                                
                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 z-50 border border-gray-100">
                                        <ul className="text-gray-700">
                                            <li 
                                                onClick={() => navigate('/my-profile')} 
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                                            >
                                                My Profile
                                            </li>
                                            <li 
                                                onClick={() => navigate('/my-appointments')} 
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                                            >
                                                My Appointments
                                            </li>
                                            <li 
                                                onClick={logout} 
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors text-red-500"
                                            >
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button 
                                onClick={() => navigate('/login')} 
                                className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-dark transition-colors shadow-sm"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div 
                        ref={mobileMenuRef}
                        className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg py-2 px-4 z-40 border-t border-gray-200"
                    >
                        <ul className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <NavLink 
                                        to={link.path}
                                        className={({ isActive }) => 
                                            `block py-2 px-2 rounded-md transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                            <li className="border-t border-gray-200 pt-2 mt-2">
                                {token ? (
                                    <>
                                        <button 
                                            onClick={() => navigate('/my-profile')}
                                            className="block w-full text-left py-2 px-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            My Profile
                                        </button>
                                        <button 
                                            onClick={() => navigate('/my-appointments')}
                                            className="block w-full text-left py-2 px-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            My Appointments
                                        </button>
                                        <button 
                                            onClick={logout}
                                            className="block w-full text-left py-2 px-2 rounded-md text-red-500 hover:bg-gray-100 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <button 
                                        onClick={() => navigate('/login')}
                                        className="w-full bg-primary text-white py-2 px-4 rounded-md font-medium hover:bg-primary-dark transition-colors"
                                    >
                                        Sign In
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </header>
    );
};

export default Navbar;


