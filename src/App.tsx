import {useState} from 'react';
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import StrangerThingsBackground from './components/StrangerThingsBackground';
import StrangerThingsSky from './components/StrangerThingsSky';
import RedSmokeBackground from './components/StrangerThingsForest';

function App() {
  const [isStrangerThingsMode, setIsStrangerThingsMode] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50 pointer-events-none" />

      {isStrangerThingsMode && <StrangerThingsBackground />}
      {isStrangerThingsMode && <StrangerThingsSky />}
      {isStrangerThingsMode && <RedSmokeBackground />}
      
      <div className="relative z-10">
        <Navigation  
        isStrangerThingsMode = {isStrangerThingsMode}
        setIsStrangerThingsMode = {setIsStrangerThingsMode}
        />
        <Hero />
      </div>
    </div>
  );
}


export default App;