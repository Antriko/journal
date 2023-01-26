// Change items depending on if user is logged in or not.
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'

const navItems = [
    {name: "Home", href: "/"},
    {name: "Info", href: "/info"}
]

const userItems = [
    {name: "Profile", href: "/user"},
    {name: "Sign out", href: "/logout"}
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const userData = useContext(UserContext);
    const userBar = userData.username ? <>
        <div className="w-full text-white text-right">
            {userData.username}
        </div>
        <Menu as="div" className="relative ml-3 w-full">
            <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    {/* Profile Pic */}
                    <img className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userItems.map(item => {
                        return(
                            <Menu.Item key={item.name}>
                            {({ active }) => (
                                <a href={item.href} className={classNames(active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                    {item.name}
                                </a>
                            )}
                        </Menu.Item>
                        )
                    })}
                </Menu.Items>
            </Transition>
        </Menu>
    </> : <a key="login" href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>


    return (
        <nav className="bg-gray-900">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                        {/* Icon */}
                        <div className="flex flex-shrink-0 items-center">
                            <Image alt="logo" src="/logo-small.svg" width={500} height={500} className="block h-8 w-auto lg:hidden" />
                            <Image alt="logo" src="/logo-small.svg" width={500} height={500} className="hidden h-8 w-auto lg:block" />
                        </div>

                        {/* Nav Items */}
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navItems.map(item => {
                                    return <a key={item.name} href={item.href} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        {item.name}
                                    </a>
                                })}
                            </div>
                        </div>

                    </div>
                    
                    {/* Right Items */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 w-1/6">
                        {userBar}
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;