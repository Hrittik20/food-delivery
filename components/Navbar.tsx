'use client'

import { NAV_LINKS } from "@/constants"
import { link } from "fs"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import ThemeSwitch from "./ThemeSwitch"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {

  const cartItemCount = useSelector(state => state.cart.cartCount);
  const [email, setEmail] = useState(String);
  const pathname = usePathname();
  const [shouldShake, setShouldShake] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if(token){
      return true;
    } else {
      return false;
    }
  }

  // const showLoginButton = () => {
  //   const pathsToHideLoginButton = ['/register', '/login', '/profile'];
  //   return !pathsToHideLoginButton.includes(pathname);
  // };

  // const showLogoutButton = () => {
  //   const pathsToShowLogoutButton = ['/profile'];
  //   return pathsToShowLogoutButton.includes(pathname);
  // }

  const handleLogout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const emailFromStorage = localStorage.getItem('email')?.toString();
    if(emailFromStorage){
      setEmail(emailFromStorage);
    }
  }, []);

  useEffect(() => {
    setShouldShake(true);
    const timer = setTimeout(() => setShouldShake(false), 500); // Reset after 500ms
    return () => clearTimeout(timer); // Cleanup on unmount
 }, [cartItemCount]);

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5 " >
      <Link href="/">
        <Image src="/hilink-logo.svg" alt="logo" width={74} height={29}/>
      </Link>
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key}
          className="regular-16 text-gray-50 flexCenter cursor-pointer
          pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>

      {!checkAuth() && (
      <div className="lg:flexCenter">
        <Link href="/login" passHref>
        <Button
          type="button"
          title="Login"
          icon="/user.svg"
          variant="btn_dark_green"
        />
        </Link>
      </div>
      )}
      {checkAuth() && (
      <div className="lg:flexCenter">
        {email}
      </div>
      )}
      {checkAuth() && (
      <div className="lg:flexCenter">
        <Link href="/login" passHref>
        <Button
          click={handleLogout}
          type="button"
          title="Logout"
          icon="/logout.png"
          variant="btn_dark_green"
        />
        </Link>
      </div>
      )}
      <ThemeSwitch/>
      {checkAuth() && (
        <div className="dark:text-white">
          <Link href="/cart" passHref>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 92 92" id="cart" className={`inline-block cursor-pointer fill-current text-black dark:text-white transform hover:scale-105 ${shouldShake ? 'shake' : ''}`}>
              <path d="M91.8 27.3 81.1 61c-.8 2.4-2.9 4-5.4 4H34.4c-2.4 0-4.7-1.5-5.5-3.7L13.1 19H4c-2.2 0-4-1.8-4-4s1.8-4 4-4h11.9c1.7 0 3.2 1.1 3.8 2.7L36 57h38l8.5-27H35.4c-2.2 0-4-1.8-4-4s1.8-4 4-4H88c1.3 0 2.5.7 3.2 1.7.8 1 1 2.4.6 3.6zm-55.4 43c-1.7 0-3.4.7-4.6 1.9-1.2 1.2-1.9 2.9-1.9 4.6 0 1.7.7 3.4 1.9 4.6 1.2 1.2 2.9 1.9 4.6 1.9 1.7 0 3.4-.7 4.6-1.9 1.2-1.2 1.9-2.9 1.9-4.6 0-1.7-.7-3.4-1.9-4.6s-2.9-1.9-4.6-1.9z"></path>
          </svg>
          {cartItemCount > 0 && <span className="ml-2">{cartItemCount}</span>}
          </Link>
        </div>
      )}
      <Image
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  )
}   

export default Navbar