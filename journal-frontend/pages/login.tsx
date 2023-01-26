// @ts-nocheck
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import Image from 'next/image'
import Link from "next/link"

export default function Login() {

    const [message, setMessage] = useState({message: false, text: ''})
    const router = useRouter()

    const userData = useContext(UserContext);
    if (userData.username) {
        router.push('/');
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        console.log(data)

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch('/api/user/login', options)
        const respData = await response.json();
        console.log(response, respData)
        
        if (response.status == 200) {
            router.reload();
            router.push('/')
        }
        setMessage({message: true, text: respData.text})

        console.log("RESULTS", response)

    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <Image alt="logo" src="/logo.svg" width={500} height={200}  />

                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={HandleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input id="username" name="username" type="text" autoComplete="current-username" required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-600 focus:z-10 focus:border-gray-600 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                placeholder="Username" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-600 focus:z-10 focus:border-gray-600 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-600" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="flex items-center ml-2 text-sm text-red-600">
                            {message.text}
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
                            Sign in
                        </button>
                    </div>

                    <div className="inline-flex flex-col text-right w-full">
                        <div className="text-sm">
                            <Link href="/forgot" className="font-medium text-gray-900 hover:text-gray-600">
                                Forgot your password?
                            </Link>
                        </div>

                        <div className="text-sm">
                            <Link href="/register" className="font-medium text-gray-900 hover:text-gray-600">
                                Create account
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}