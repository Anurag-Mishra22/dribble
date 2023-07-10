import Link from "next/link";
import Image from "next/image"
import { NavLinks } from "@/constant";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
    const session = await getCurrentUser();
    return (
        <nav className="flexBetween navbar">
            <div className="flex-1 flexStart gap-10">
                <Link href="/">
                    <Image src="/logo.svg" width={115} height={43} alt="Dribble" />
                </Link>
                <ul className="xl:flex hidden text-small gap-7">
                    {NavLinks.map((link) => (
                        <Link href={link.href} key={link.key}>
                            {link.text}
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="flexCenter gap-4">
                {
                    session?.user ? (
                        <>
                            <Link href="/create-project" className="bg-black hover:bg-black/60 text-sm p-4 rounded-lg text-white font-semibold">
                                Share Work
                            </Link>

                            <ProfileMenu session={session} />


                        </>
                    ) : (
                        <AuthProviders />
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar