import { useEffect, useRef } from 'react';
import './WaveBackground.css';

const WaveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let count = 0;
    const rows = 35;
    const cols = 65;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      count += 0.035;

      const angle = 0.4;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const spacingX = width / cols * 1.3;
      const spacingY = 18;
      const startX = width * 0.15;
      const startY = height * 0.35;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * 16 - (cols * 16) / 2;
          const z = i * 18 - (rows * 18) / 2;

          const wave1 = Math.sin(j * 0.15 + count) * 25;
          const wave2 = Math.cos(i * 0.2 + count * 0.8) * 20;
          const y = wave1 + wave2 + Math.sin(j * 0.1 + count * 0.5) * 15;

          // Isometric projection
          const px = startX + (x - z) * cos * 0.8 + width * 0.25;
          const py = startY + (x + z) * sin * 0.4 + y + i * 12;

          // Distance-based sizing & opacity
          const depth = (i / rows);
          const size = Math.max(1, (1.8 - depth * 0.8));

          // Color transition: Electric Cobalt Blue on the left to shimmering silver-white on the right
          const t = j / cols;
          const red = Math.floor(t * 235);
          const green = Math.floor(80 + t * 165);
          const blue = Math.floor(255 - t * 40);
          const alpha = Math.min(0.9, 0.2 + depth * 0.7 + (1 - t) * 0.2);

          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="wave-canvas" />;
};

export default WaveBackground;