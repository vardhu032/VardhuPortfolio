
import PixelScanner from "./particle";
import RotatingRole from "./RotatingRole";
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl text-gray-300">Hi, I am</h1>
        <PixelScanner />
        <RotatingRole />
        <p className="text-gray-400 text-center mt-8 text-lg max-w-2xl mx-auto">
          Crafting innovative solutions across the full stack and blockchain ecosystems
        </p>
      </div>
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-12 animate-bounce cursor-pointer hover:text-gray-300 transition-colors"
        aria-label="Scroll to content"
      >
        <ChevronDown size={40} />
      </button>
    </section>
  );
}