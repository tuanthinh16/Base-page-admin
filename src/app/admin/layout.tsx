import Navbar from "./components/Navbar";

export const metadata = {
  title: "HKP Admin",
  description: "HKP Admin Dashboard",
};
export default function Adminlayout({children}: {children: React.ReactNode}) {
    return (
    <html lang="en">
        <body className='dark:bg-slate-400 dark:text-white'>
            <div>
                <div className='mt-20 ml-0 grid grid-cols-1 md:grid-cols-3 md:ml-12'>
                    <div className='max-w-full col-span-2'>
                        <Navbar/>
                        {children}
                    </div>
                </div>
            </div>
        </body>
    </html>
    )
}