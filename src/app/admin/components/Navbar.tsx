"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: token, status: sessionStatus } = useSession();

  return (
    <nav className="bg-gray-800 py-4 px-6 fixed top-0 left-0 w-full flex justify-between items-center z-10">
      {/* Mobile Navbar */}
      <div className="md:hidden grid grid-cols-3 items-center space-x-4">
        {/* Logo */}
        <Link href="/" className="text-white text-lg font-bold">
          LOGO
        </Link>
        {/* Search Input */}
        <input type="text" placeholder="Search..." className="px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none" />
        {/* Username Button */}
        <button className="bg-gray-700 text-white px-3 py-2 rounded-md">{token?.username}</button>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:grid md:grid-cols-4 items-center space-x-4 justify-between w-full">
        {/* Logo */}
        <Link href="/" className="text-white text-lg font-bold">
          LOGO
        </Link>
        {/* Links */}
        <div className="space-x-4">
          <Link href="/admin/dashboard" className="text-white">
            Dashboard
          </Link>
          
          <Link href="/admin/users" className="text-white">
            Users
          </Link>
          <Link href="/admin/settings" className="text-white">
            Settings
          </Link>
        </div>
        {/* Search Input */}
        <input type="text" placeholder="Search..." className="px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none" />
        {/* Username Button */}
        <button className="bg-gray-700 text-white px-3 py-2 rounded-md max-w-[100px] justify-self-end">{token?.username}</button>
      </div>
    </nav>
  );
};

export default Navbar;
