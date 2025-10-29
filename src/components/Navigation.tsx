import { useState} from "react";

function Navigation (){
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = ['about', 'Skill', 'Projects', 'Contact'];

    return (
        <>
         <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md ">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold hover:text-gray-300 transition-colors cursor-pointer">
                    Vardhu
                </h1>

                <div className="hidden md:flex gap-8">
                    {navLinks.map((link) =>(
                    <button key={link} className="text-gray-400 hover:text-white transition-colors">
                        {link}
                    </button>
                    ))}
                </div>

                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className = "md:hidden text-white">
                        {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            </div>
         </nav>

         {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center">
                {navLinks.map((link) =>(
                    <button key={link} onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl text-gray-400 hover:text-white transition-colors mb-8">
                        {link}
                    </button>
                ))}
            </div>
         )}
        </>
    );
}

export default Navigation;