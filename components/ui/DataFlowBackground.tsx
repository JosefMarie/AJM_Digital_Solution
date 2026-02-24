'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Point {
    x: number;
    y: number;
}

interface ConnectionV2 {
    id: string;
    path: string;
    delay: string;
    duration: string;
    layer: number; // 0: Back, 1: Mid, 2: Front
    baseX: number;
    baseY: number;
}

interface NodeV2 {
    id: string;
    x: number;
    y: number;
    delay: string;
    layer: number;
}

export default function DataFlowBackground() {
    const [connections, setConnections] = useState<ConnectionV2[]>([]);
    const [nodes, setNodes] = useState<NodeV2[]>([]);
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const newConnections: ConnectionV2[] = [];
        const newNodes: NodeV2[] = [];

        // Generate connections across 3 layers
        for (let layer = 0; layer < 3; layer++) {
            const count = layer === 0 ? 10 : layer === 1 ? 6 : 4;
            const isVertical = Math.random() > 0.5;

            for (let i = 0; i < count; i++) {
                const startX = isVertical ? (i * (100 / count)) + Math.random() * 5 : -10;
                const startY = isVertical ? -10 : (i * (100 / count)) + Math.random() * 5;
                const endX = isVertical ? startX + (Math.random() - 0.5) * 10 : 110;
                const endY = isVertical ? 110 : startY + (Math.random() - 0.5) * 10;

                const cp1x = isVertical ? startX + (Math.random() - 0.5) * 20 : 33;
                const cp1y = isVertical ? 33 : startY + (Math.random() - 0.5) * 20;
                const cp2x = isVertical ? endX + (Math.random() - 0.5) * 20 : 66;
                const cp2y = isVertical ? 66 : endY + (Math.random() - 0.5) * 20;

                const path = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;

                newConnections.push({
                    id: `c-${layer}-${i}`,
                    path,
                    delay: `${Math.random() * 5}s`,
                    duration: `${4 + Math.random() * 6 - layer}s`,
                    layer,
                    baseX: (startX + endX) / 2,
                    baseY: (startY + endY) / 2
                });

                if (Math.random() > 0.4) {
                    newNodes.push({
                        id: `n-${layer}-${i}`,
                        x: (cp1x + cp2x) / 2,
                        y: (cp1y + cp2y) / 2,
                        delay: `${Math.random() * 5}s`,
                        layer
                    });
                }
            }
        }

        setConnections(newConnections);
        setNodes(newNodes);
    }, []);

    const getMouseInfluence = (x: number, y: number) => {
        const dx = mousePos.x - x;
        const dy = mousePos.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 25;
        if (dist < radius) {
            const power = (1 - dist / radius);
            return {
                x: dx * power * 0.1,
                y: dy * power * 0.1,
                brightness: 1 + power * 2
            };
        }
        return { x: 0, y: 0, brightness: 1 };
    };

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="text-neon-cyan"
            >
                <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                        <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow-v2">
                        <feGaussianBlur stdDeviation="0.15" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {connections.map((conn) => {
                    const influence = getMouseInfluence(conn.baseX, conn.baseY);
                    const layerOpacity = [0.1, 0.25, 0.4][conn.layer];
                    const layerBlur = [2, 1, 0][conn.layer];

                    return (
                        <path
                            key={conn.id}
                            d={conn.path}
                            fill="none"
                            stroke="url(#flowGradient)"
                            strokeWidth={0.06 + conn.layer * 0.04}
                            strokeDasharray="1 15"
                            className="animate-data-flow"
                            style={{
                                animationDelay: conn.delay,
                                animationDuration: conn.duration,
                                opacity: layerOpacity * influence.brightness,
                                filter: layerBlur > 0 ? `blur(${layerBlur}px)` : 'none',
                                transform: `translate(${influence.x}%, ${influence.y}%)`,
                                transition: 'all 0.5s ease-out',
                                willChange: 'stroke-dashoffset, transform, opacity'
                            } as any}
                        />
                    );
                })}

                {nodes.map((node) => {
                    const influence = getMouseInfluence(node.x, node.y);
                    const layerScale = [0.7, 1, 1.3][node.layer];
                    const layerOpacity = [0.1, 0.3, 0.5][node.layer];

                    return (
                        <circle
                            key={node.id}
                            cx={`${node.x}%`}
                            cy={`${node.y}%`}
                            r={0.4 * layerScale}
                            fill="currentColor"
                            filter="url(#glow-v2)"
                            className="animate-node-pulse"
                            style={{
                                animationDelay: node.delay,
                                opacity: layerOpacity * influence.brightness,
                                transform: `translate(${influence.x}%, ${influence.y}%) scale(${influence.brightness})`,
                                transition: 'all 0.4s ease-out',
                                willChange: 'transform, opacity'
                            } as any}
                        />
                    );
                })}
            </svg>
        </div>
    );
}


