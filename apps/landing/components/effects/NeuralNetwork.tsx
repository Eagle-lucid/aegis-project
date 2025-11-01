// apps/landing/components/effects/NeuralNetwork.tsx 
'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NeuralNetwork() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const nodes = svgRef.current.querySelectorAll('.neural-node');
    const lines = svgRef.current.querySelectorAll('.neural-line');

    // Reset
    gsap.set([nodes, lines], { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.8 });

    // Lines fade in with soft glow
    tl.to(lines, {
      opacity: 0.25,
      duration: 1.5,
      stagger: 0.3,
      ease: "power2.inOut",
    });

    // Node sequence ignition
    tl.to(
      nodes,
      {
        opacity: 1,
        scale: 1.2,
        duration: 0.6,
        stagger: {
          amount: 1,
          from: "center",
        },
        ease: "back.out(2)",
      },
      "-=0.5"
    );

    // Subtle breathing pulse (network alive)
    gsap.to(nodes, {
      opacity: 0.6,
      scale: 0.9,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 1.5,
        from: "random",
      },
    });

    // Flowing line flicker (simulate neural current)
    gsap.to(lines, {
      opacity: 0.35,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2,
        from: "edges",
      },
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1080"
    >
      <defs>
        {/* Glow filter for ethereal look */}
        <filter id="neural-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Lines (connections) */}
      <g className="neural-lines" filter="url(#neural-glow)">
        <line className="neural-line" x1="200" y1="200" x2="400" y2="300" stroke="#06B6D4" strokeWidth="1" />
        <line className="neural-line" x1="400" y1="300" x2="600" y2="250" stroke="#10B981" strokeWidth="1" />
        <line className="neural-line" x1="600" y1="250" x2="800" y2="400" stroke="#F59E0B" strokeWidth="1" />
        <line className="neural-line" x1="800" y1="400" x2="1000" y2="350" stroke="#06B6D4" strokeWidth="1" />
        <line className="neural-line" x1="1000" y1="350" x2="1200" y2="500" stroke="#10B981" strokeWidth="1" />
        <line className="neural-line" x1="300" y1="600" x2="500" y2="700" stroke="#06B6D4" strokeWidth="1" />
        <line className="neural-line" x1="500" y1="700" x2="700" y2="650" stroke="#F59E0B" strokeWidth="1" />
        <line className="neural-line" x1="700" y1="650" x2="900" y2="800" stroke="#06B6D4" strokeWidth="1" />
        <line className="neural-line" x1="900" y1="800" x2="1100" y2="750" stroke="#10B981" strokeWidth="1" />
        <line className="neural-line" x1="1100" y1="750" x2="1300" y2="900" stroke="#06B6D4" strokeWidth="1" />
        <line className="neural-line" x1="1500" y1="300" x2="1700" y2="400" stroke="#10B981" strokeWidth="1" />
        <line className="neural-line" x1="1700" y1="400" x2="1500" y2="600" stroke="#F59E0B" strokeWidth="1" />
      </g>

      {/* Nodes (neurons) */}
      <g className="neural-nodes" filter="url(#neural-glow)">
        <circle className="neural-node" cx="200" cy="200" r="4" fill="#06B6D4" />
        <circle className="neural-node" cx="400" cy="300" r="4" fill="#10B981" />
        <circle className="neural-node" cx="600" cy="250" r="4" fill="#F59E0B" />
        <circle className="neural-node" cx="800" cy="400" r="4" fill="#06B6D4" />
        <circle className="neural-node" cx="1000" cy="350" r="4" fill="#10B981" />
        <circle className="neural-node" cx="1200" cy="500" r="4" fill="#06B6D4" />
        <circle className="neural-node" cx="300" cy="600" r="4" fill="#06B6D4" />
        <circle className="neural-node" cx="500" cy="700" r="4" fill="#10B981" />
        <circle className="neural-node" cx="700" cy="650" r="4" fill="#F59E0B" />
        <circle className="neural-node" cx="900" cy="800" r="4" fill="#06B6D4" />
        <circle className="neural-node" cx="1100" cy="750" r="4" fill="#10B981" />
        <circle className="neural-node" cx="1300" cy="900" r="4" fill="#06B6D4" />
        <circle className="neural-node" cx="1500" cy="300" r="4" fill="#10B981" />
        <circle className="neural-node" cx="1700" cy="400" r="4" fill="#F59E0B" />
        <circle className="neural-node" cx="1500" cy="600" r="4" fill="#06B6D4" />
      </g>
    </svg>
  );
}
