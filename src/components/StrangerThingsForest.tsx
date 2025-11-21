import { useEffect, useRef } from 'react';

function RedSmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Smoke {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
      vx: number;
      vy: number;
    }

    const smoke: Smoke[] = [];

    // Create smoke particles
    for (let i = 0; i < 25; i++) {
      smoke.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.7,
        radius: 60 + Math.random() * 180,
        opacity: 0.12 + Math.random() * 0.25,
        speed: 0.01 + Math.random() * 0.025,
        vx: (Math.random() - 0.5) * 0.05,
        vy: -0.01 - Math.random() * 0.015,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0000');
      gradient.addColorStop(0.5, '#2a0000');
      gradient.addColorStop(1, '#1a0000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate smoke
      smoke.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity *= 0.999;

        // Reset particle if off screen
        if (particle.y < -particle.radius || particle.opacity < 0.02) {
          particle.y = canvas.height + particle.radius;
          particle.x = Math.random() * canvas.width;
          particle.opacity = 0.12 + Math.random() * 0.25;
        }

        // Radial gradient for smoke effect
        const smokeGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius
        );

        smokeGradient.addColorStop(0, `rgba(180, 20, 20, ${particle.opacity})`);
        smokeGradient.addColorStop(0.4, `rgba(120, 10, 10, ${particle.opacity * 0.5})`);
        smokeGradient.addColorStop(1, 'rgba(40, 0, 0, 0)');

        ctx.fillStyle = smokeGradient;
        ctx.fillRect(
          particle.x - particle.radius,
          particle.y - particle.radius,
          particle.radius * 2,
          particle.radius * 2
        );
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }}
    />
  );
}

export default RedSmokeBackground;

