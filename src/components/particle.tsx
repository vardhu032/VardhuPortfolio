import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const PixelScanner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, radius: 50 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setupCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const width = canvas.width;

      let fontSize = 160;
      let radius = 60;

      if (width < 400) {
        fontSize = 60;
        radius = 30;
      } else if (width < 800) {
        fontSize = 100;
        radius = 45;
      }

      mouseRef.current.radius = radius;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("VARDHU", canvas.width / 2, canvas.height / 2);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const step = 4;
      const newParticles: Particle[] = [];

      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const index = (y * canvas.width + x) * 4;
          const alpha = imageData.data[index + 3];

          if (alpha > 128) {
            newParticles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              targetX: x,
              targetY: y,
              vx: 0,
              vy: 0,
              size: Math.random() * 1.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.5,
            });
          }
        }
      }

      particleRef.current = newParticles;
    };

    setupCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      setupCanvas();
    }
    window.addEventListener("resize", handleResize);

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particleRef.current.forEach((p) => {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;

        const mx = mouseRef.current.x - p.x;
        const my = mouseRef.current.y - p.y;
        const dist = Math.sqrt(mx * mx + my * my);

        if (dist < mouseRef.current.radius) {
          const angle = Math.atan2(my, mx);
          const force =
            (mouseRef.current.radius - dist) / mouseRef.current.radius;

          p.vx -= Math.cos(angle) * force * 2;
          p.vy -= Math.sin(angle) * force * 2;
        }

        p.vx += dx * 0.02;
        p.vy += dy * 0.02;

        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="p-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default PixelScanner;
