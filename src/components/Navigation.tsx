import { useState, useRef, useEffect } from "react";
import MusicButton from "./MusicButton";

interface navigationProps {
     isStrangerThingsMode : boolean;
     setIsStrangerThingsMode : (value : boolean) => void;
}

function Navigation({isStrangerThingsMode, setIsStrangerThingsMode} : navigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navLinks = ["About", "Skill", "Projects", "Contact"];

  useEffect (() => {
    if(!audioRef.current) return;

    if(isStrangerThingsMode) {
      audioRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }else{
      audioRef.current.pause();
      audioRef.current.currentTime =0;
    }
  }, [isStrangerThingsMode]);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/Stranger Things.mp3" type="audio/mpeg" />
      </audio>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md ">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <h1 className="text-2xl font-bold">Vardhu</h1>

            {/* Music Toggle Button */}
            <MusicButton 
              isPlaying={isStrangerThingsMode} 
              onClick={() => setIsStrangerThingsMode(!isStrangerThingsMode)} 
            />
          </div>

          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl text-gray-400 hover:text-white transition-colors mb-8"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default Navigation;
