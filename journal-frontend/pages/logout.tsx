import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Logout() {
    const router = useRouter();
    useEffect(() => {
        const Signout = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            await fetch('/api/user/logout', options);
            router.push('/');
        }
        Signout();
    }, [router])

    return (<>Signing out...</>)
}