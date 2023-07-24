"use client"

import { getProviders, signIn } from "next-auth/react"
import { useState, useEffect } from "react"



type Provider = {
    id: string,
    name: string,
    type: string,
    signinUrl: string,
    callbackUrl: string,
    signinUrlParams?: Record<string, string> | null;
}

type Providers = Record<string, Provider>;

const AuthProviders = () => {

    const [providers, setProviders] = useState<Providers | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
            console.log(res);
        }
        fetchProviders();
    }, [])

    if (providers) {
        return (
            <div>
                {
                    Object.values(providers).map((provider: Provider, i) => (
                        <button key={i} onClick={() => signIn(provider?.id)} className="shadow-md p-2 rounded-md items-center flex" >
                            <img src="/google.png" className="w-12  object-contain " />
                            {provider.id}
                        </button>
                    ))
                }
            </div>
        )
    }
}

export default AuthProviders