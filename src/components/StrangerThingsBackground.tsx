import {useEffect, useRef} from "react";

const StrangerThingsBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particleRef = useRef<any[]>([]);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext("2d");
        if(!ctx) return;

        const setupCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particleRef.current = Array.from({length: 120}, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2.0 + 0.5,
                opacity: Math.random() * 0.3 + 0.2,
                color: [
                    'rgba(255,0,0,',
                    'rgba(139,0,0,',
                    'rgba(255,69,0,',
                    'rgba(70,130,180,',
                    'rgba(255,255,255,'
                ][Math.floor(Math.random() * 5)]
            }));
        };
        setupCanvas();

        const animate = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.10)';
            ctx.fillRect(0,0, canvas.width, canvas.height);
            particleRef.current.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx += (Math.random() - 0.5 ) * 0.015;
                particle.vy += (Math.random() - 0.5 ) * 0.015;
                if( particle.x < 0) particle.x = canvas.width;
                if(particle.y < 0) particle.y = canvas.height;
                if(particle.x > canvas.width) particle.x =0;
                if(particle.y > canvas.height)particle.y = 0;
                ctx.globalAlpha = particle.opacity;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color + particle.opacity + ')';
                ctx.fill();
            });
            ctx.globalAlpha = 1.0;
            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener ( "resize", setupCanvas);
        return () => {
            window.removeEventListener("resize", setupCanvas);
            if(animationRef.current) cancelAnimationFrame(animationRef.current);
        };

    }, []);

    return (
        <canvas 
          ref={canvasRef}
          className = "fixed inset-0 w-full h-full pointer-events-non z-0"
          style = {{background: 'linear-gradient(to bottom, #000, #0a0a0a, #000)'}} />
    )
}

export default StrangerThingsBackground;