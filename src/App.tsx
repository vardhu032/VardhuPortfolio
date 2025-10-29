import Navigation from "./components/Navigation";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50 pointer-events-none" />

      <div className="relative z-10">
        <Navigation />
        <Hero />
      </div>
    </div>
  );
}


export default App;