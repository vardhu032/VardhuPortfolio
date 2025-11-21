import {useState, useEffect} from 'react';

const roles = [
    'Full Stack Developer',
    'Blockchain Developer',
    'Smart Contract Engineer', 
    'Web3 Architect',
    'DApp Developer',
]

function RotatingRole () {
    const [currentRole,setcurrentRole] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);

            setTimeout(()=> {
                setcurrentRole((prev) => (prev+1)% roles.length);
                setIsAnimating(false);
            }, 300);
        }, 2000)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='h-12 flex items-center justify-center overflow-hidden'>
            <h2 className={`text-3xl font-light text-gray-300 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-8': 'opacity-100 translate-x-0'}`}>
                {roles[currentRole]}
            </h2>
        </div>
    );
}

export default RotatingRole;
