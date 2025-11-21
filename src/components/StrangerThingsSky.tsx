import { useEffect, useRef, useState } from "react";

const StrangerThingsSky = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strikes, setStrikes] = useState<
    Array<{
      segments: Array<{ x: number; y: number }>;
      opacity: number;
      branches: Array<Array<{ x: number; y: number }>>;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.5;
    };
    resize();
    window.addEventListener("resize", resize);

    /** Generate main bolt */
    const generateBolt = (startX: number, endY: number) => {
      const segments = [];
      let x = startX;
      let y = 0;

      while (y < endY) {
        y += 20 + Math.random() * 30;
        x += (Math.random() - 0.5) * 60;
        segments.push({ x, y });

        // Small chance for a branch
        if (Math.random() > 0.85) {
          const branch = generateBranch(x, y);
          branchSegments.push(branch);
        }
      }

      return segments;
    };

    /** Branch bolt (shorter, thinner) */
    const generateBranch = (x: number, y: number) => {
      const branch = [];
      let bx = x;
      let by = y;

      const branchLength = 3 + Math.random() * 5;

      for (let i = 0; i < branchLength; i++) {
        by += 10 + Math.random() * 12;
        bx += (Math.random() - 0.5) * 40;
        branch.push({ x: bx, y: by });
      }
      return branch;
    };

    let branchSegments: Array<Array<{ x: number; y: number }>> = [];

    // Spawn bolt
    const interval = setInterval(() => {
      // 50% chance to spawn lightning group
      if (Math.random() > 0.5) {
        branchSegments = [];

        // randomly choose whether to spawn 1 or 2 lightning bolts
        const boltCount = Math.random() > 0.6 ? 2 : 1;

        for (let i = 0; i < boltCount; i++) {
          branchSegments = [];

          const segments = generateBolt(
            Math.random() * canvas.width, // random X per bolt
            canvas.height * (0.7 + Math.random() * 0.3) // random depth
          );

          setStrikes((prev) => [
            ...prev,
            { segments, opacity: 1, branches: branchSegments },
          ]);
        }

        // remove faded ones
        setTimeout(() => {
          setStrikes((prev) =>
            prev.length > boltCount ? prev.slice(boltCount) : []
          );
        }, 600);
      }
    }, 700);

    let animationId: number;

    const drawBolt = (
      segs: Array<{ x: number; y: number }>,
      opacity: number
    ) => {
      for (let i = 0; i < segs.length - 1; i++) {
        const p1 = segs[i];
        const p2 = segs[i + 1];

        // Lightning tapers: thick near top → thin near bottom
        const t = i / segs.length;
        const width = 6 - t * 4; // broad → thin

        // Outer red glow
        ctx.shadowBlur = 40;
        ctx.shadowColor = "rgba(255, 60, 60, 0.8)";
        ctx.strokeStyle = `rgba(255, 80, 80, ${opacity})`;
        ctx.lineWidth = width + 3;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Inner white hot core
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      strikes.forEach((strike) => {
        drawBolt(strike.segments, strike.opacity);

        // Draw branch bolts
        strike.branches.forEach((b) => drawBolt(b, strike.opacity * 0.7));

        strike.opacity -= 0.08;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(interval);
      cancelAnimationFrame(animationId);
    };
  }, [strikes]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{
        zIndex: 5,
        height: "50vh",
      }}
    />
  );
};

export default StrangerThingsSky;
