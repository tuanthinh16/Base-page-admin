import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 py-4 px-6 fixed top-0 left-0 w-full flex justify-between items-center z-10">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-white text-lg font-bold">
          LOGO
        </Link>
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
      </div>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search..." className="px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none" />
        <button className="bg-gray-700 text-white px-3 py-2 rounded-md">Avatar</button>
      </div>
    </nav>
  );
};

export default Navbar;
