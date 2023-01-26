import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';
import Link from "next/link"

export default function Home() {
    const userData = useContext(UserContext);

    const indexButton = userData.username ? 
        <Link href="/user" className="inline-block rounded-lg bg-gray-900 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-gray-600 hover:bg-gray-700 hover:ring-indigo-700">
            Entries <span className="text-indigo-200" aria-hidden="true">&rarr;</span>
        </Link> :
        <Link href="/login" className="inline-block rounded-lg bg-gray-900 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-gray-600 hover:bg-gray-700 hover:ring-indigo-700">
            Get started <span className="text-indigo-200" aria-hidden="true">&rarr;</span>
        </Link>
    return (
        <main>
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
                    <div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                                Journapp
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-900 sm:text-center">
                                Keep track of your daily activities.
                            </p>
                            <div className="mt-8 flex gap-x-4 sm:justify-center">
                                {indexButton}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
  )
}
