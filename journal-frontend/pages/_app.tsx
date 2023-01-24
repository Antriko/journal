import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import Navbar from '../components/navbar';
import { UserContextProvider } from '@/context/UserContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserContextProvider>
            <Navbar />
            <Component {...pageProps} />
        </UserContextProvider>
    )
}
