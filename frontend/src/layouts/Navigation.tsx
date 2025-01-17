import React from "react";
import {useToggle} from "../utilities";
import {Link, useHistory} from "react-router-dom";
import {useAuthContext} from "../App";
import logo from '../images/workflow-mark-indigo-600.svg';

function Navigation ({children, innerPadding = 'none'}: {
    children: any,
    innerPadding?: 'none' | 'medium',
}) {
    const history = useHistory();

    const [menuOpen, toggleMenu] = useToggle();

    const {loggedIn, logout} = useAuthContext();

    if (!loggedIn) {history.push('/login');}

    return (
        <div className="min-h-screen bg-white">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <img className="block lg:hidden h-8 w-auto"
                                     src={logo}
                                     alt="Workflow logo" />
                                <img className="hidden lg:block h-8 w-auto"
                                     src={logo}
                                     alt="Workflow logo" />
                            </div>
                            <div className="hidden sm:-my-px sm:ml-6 space-x-8 sm:flex">
                                <Link to="/blog"
                                   className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out">
                                    Blog
                                </Link>

                                <a href="#"
                                   className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                                    Other
                                </a>

                                {/*<a href="#"
                                   className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                                    Team
                                </a>

                                <a href="#"
                                   className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                                    Projects
                                </a>

                                <a href="#"
                                   className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                                    Calendar
                                </a>*/}
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            {/*<button
                                className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
                                aria-label="Notifications">
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                </svg>
                            </button>*/}

                            {/*<!-- Profile dropdown -->*/}
                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                                        id="user-menu" aria-label="User menu" aria-haspopup="true"
                                    onClick={toggleMenu}>
                                        <img className="h-8 w-8 rounded-full"
                                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                             alt="" />
                                    </button>
                                </div>
                                {/*<!--
                                  Profile dropdown panel, show/hide based on dropdown ste.

                                  Entering: "transition ease-out duration-200"
                                    From: "transform opacity-0 scale-95"
                                    To: "transform opacity-100 scale-100"
                                  Leaving: "transition ease-in duration-75"
                                    From: "transform opacity-100 scale-100"
                                    To: "transform opacity-0 scale-95"
                                -->*/}
                                <div style={{zIndex: 100000}} className={`${menuOpen? 'transition ease-out duration-200 transform opacity-100 scale-100' : 'transition ease-in duration-75 transform opacity-0 scale-95'} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`}>
                                    <div className="py-1 rounded-md bg-white shadow-xs">
                                        {/*<a href="#"
                                           className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                                            Your Profile
                                        </a>

                                        <a href="#"
                                           className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                                            Settings
                                        </a>*/}

                                        <a href="#"
                                           onClick={logout}
                                           className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                                            Sign out
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex items-center sm:hidden">
                            {/*<!-- Mobile menu button -->*/}
                            <button
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                                {/*<!-- Menu open: "hidden", Menu closed: "block" -->*/}
                                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                                {/*<!-- Menu open: "block", Menu closed: "hidden" -->*/}
                                <svg className="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/*<!--
                  Mobile menu, toggle classes based on menu state.

                  Open: "block", closed: "hidden"
                -->*/}
                <div className={`${menuOpen? 'block' : 'hidden'} sm:hidden`}>
                    <div className="pt-2 pb-3 space-y-1">
                        <a href="#"
                           className="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out">
                            Dashboard
                        </a>

                        <a href="#"
                           className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">
                            Team
                        </a>

                        <a href="#"
                           className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">
                            Projects
                        </a>

                        <a href="#"
                           className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">
                            Calendar
                        </a>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-4 space-x-3">
                            <div className="flex-shrink-0">
                                <img className="h-10 w-10 rounded-full"
                                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                     alt="" />
                            </div>
                            <div>
                                <div className="text-base font-medium leading-6 text-gray-800">Tom Cook</div>
                                <div className="text-sm font-medium leading-5 text-gray-500">tom@example.com</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1" role="menu" aria-orientation="vertical"
                             aria-labelledby="user-menu">
                            {/*<a href="#"
                               className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
                               role="menuitem">
                                Your Profile
                            </a>

                            <a href="#"
                               className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
                               role="menuitem">
                                Settings
                            </a>*/}

                            <a href="#"
                               className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
                               role="menuitem">
                                Sign out
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`${(innerPadding == 'medium') && 'py-6'}`}>
                {children}
                {/*<header>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight text-gray-900">
                            Dashboard
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="px-4 py-8 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                        </div>
                    </div>
                </main>*/}
            </div>
        </div>
    )
}

export default Navigation;