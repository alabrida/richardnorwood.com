'use client';

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

export function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;

        // Generate "Cables" (Lines of dots)
        const cableMarkers: { location: [number, number], size: number }[] = [];

        // Trans-Atlantic Cable (NY to London approximation)
        for (let i = 0; i < 20; i++) {
            const lat = 40.7 + (51.5 - 40.7) * (i / 20);
            const lon = -74.0 + (-0.1 - -74.0) * (i / 20);
            cableMarkers.push({ location: [lat, lon], size: 0.02 });
        }

        // Trans-Pacific Cable (SF to Tokyo)
        for (let i = 0; i < 30; i++) {
            const lat = 37.7 + (35.6 - 37.7) * (i / 30);
            const lon = -122.4 + (-139.6 - -122.4) * (i / 30);
            cableMarkers.push({ location: [lat, lon], size: 0.02 });
        }

        // Major Hubs 
        const hubs = [
            { location: [37.7595, -122.4367], size: 0.1 }, // SF
            { location: [40.7128, -74.006], size: 0.1 },   // NYC
            { location: [51.5074, -0.1278], size: 0.1 },   // London
            { location: [35.6762, 139.6503], size: 0.1 },  // Tokyo
            { location: [-33.8688, 151.2093], size: 0.1 }, // Sydney
            { location: [1.3521, 103.8198], size: 0.08 },   // Singapore
            { location: [48.8566, 2.3522], size: 0.08 },    // Paris
            { location: [52.5200, 13.4050], size: 0.08 },   // Berlin
            { location: [55.7558, 37.6173], size: 0.08 },   // Moscow
            { location: [25.2048, 55.2708], size: 0.08 },   // Dubai
        ];

        const allMarkers = [...hubs.map(m => ({ location: m.location, size: m.size })), ...cableMarkers];

        let globe: any;

        const initGlobe = () => {
            if (!canvasRef.current) return;

            // Sizing safety measure
            const width = canvasRef.current.clientWidth || 600;

            try {
                globe = createGlobe(canvasRef.current, {
                    devicePixelRatio: 2,
                    width: width * 2,
                    height: width * 2,
                    phi: 0,
                    theta: 0,
                    dark: 1,
                    diffuse: 1.2,
                    mapSamples: 20000,
                    mapBrightness: 8,
                    baseColor: [0.1, 0.1, 0.2],
                    markerColor: [0, 1, 1],
                    glowColor: [0.2, 0.2, 0.5],
                    markers: allMarkers,
                    onRender: (state) => {
                        state.phi = phi;
                        phi += 0.003;
                    },
                });
            } catch (e) {
                console.error("Failed to initialize globe:", e);
            }
        };

        // Delay initialization slightly to ensure ref layout is stable
        const timeout = setTimeout(initGlobe, 100);

        return () => {
            clearTimeout(timeout);
            if (globe) {
                try {
                    globe.destroy();
                } catch (e) {
                    console.error("Error destroying globe:", e);
                }
            }
        };
    }, []);

    return (
        <div className={className}>
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', aspectRatio: 1 }}
            />
        </div>
    );
}
