import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Dog } from '../types/dog.types';

interface DogMosaicProps {
  dogs: (Dog | null)[];
  title?: React.ReactNode;
  subtitle?: string;
  description?: string;
  centerContent?: React.ReactNode;
}

const DogMosaic: React.FC<DogMosaicProps> = ({
  dogs,
  title,
  subtitle,
  description,
  centerContent,
}) => {
  const mosaicRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Create refs for each dog
  const dogRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    // Ensure refs are clean
    dogRefs.current = dogRefs.current.slice(0, dogs.length);
    
    // Central content animation
    const timeline = gsap.timeline();
    
    // Animate title
    if (titleRef.current) {
      timeline.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.5
      );
    }
    
    // Animate subtitle
    if (subtitleRef.current) {
      timeline.fromTo(
        subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        1.0
      );
    }
    
    // Animate description
    if (descriptionRef.current) {
      timeline.fromTo(
        descriptionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        1.3
      );
    }
    
    // Animate central content (button)
    if (contentRef.current) {
      timeline.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out" },
        1.6
      );
    }
    
    // Animate dog images progressively
    dogRefs.current.forEach((dogRef, index) => {
      if (dogRef) {
        // Calculate staggered and slightly random delay
        const delay = 0.5 + index * 0.1 + Math.random() * 0.2;
        
        gsap.fromTo(
          dogRef,
          { 
            opacity: 0, 
            scale: 0.7,
          },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.5, 
            ease: "back.out(1.2)",
            delay: delay
          }
        );
      }
    });
    
    return () => {
      // Clean up animations on unmount
      timeline.kill();
      gsap.killTweensOf(dogRefs.current);
    };
  }, [dogs]);


  const getRandomPosition = (index: number) => {
    // Define the number of rows and columns for the grid
    const rows = 15; // Number of rows
    const cols = 15; // Number of columns
  
    // Calculate position based on the grid
    const row = Math.floor(index / cols) % rows; // Row index
    const col = index % cols; // Column index
  
    // Calculate base percentage for each cell
    const topBase = (row * 100) / rows; // Base vertical position
    const leftBase = (col * 100) / cols; // Base horizontal position
  
    // Add random offset within each cell
    const topPos = topBase + Math.random() * (100 / rows - 10); // Variation within the cell
    const leftPos = leftBase + Math.random() * (100 / cols - 10);
  
    return {
      top: `${topPos}%`,
      left: `${leftPos}%`,
    };
  };
  
  return (
    <div ref={mosaicRef} className="relative w-full h-screen bg-black overflow-hidden">
      {/* Center with title and content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="text-center p-8 pointer-events-auto">
          {title && (
            <div ref={titleRef} className="text-6xl font-bold text-white mb-4 opacity-0">
              {title}
            </div>
          )}
          
          {subtitle && (
            <div ref={subtitleRef} className="text-3xl text-white mb-2 opacity-0">
              {subtitle}
            </div>
          )}
          
          {description && (
            <div ref={descriptionRef} className="text-lg text-gray-300 mb-6 opacity-0">
              {description}
            </div>
          )}
          
          {centerContent && (
            <div ref={contentRef} className="pointer-events-auto opacity-0">
              {centerContent}
            </div>
          )}
        </div>
      </div>
      
      {/* Dog mosaic */}
      <div className="absolute inset-0 grid"
          style={{
            gridTemplateRows: `repeat(15, 1fr)`, // 15 rows
            gridTemplateColumns: `repeat(15, 1fr)`, // 15 columns
            gap: "10px", // Spacing between cells
          }}>
        {dogs.map((dog, index) => {
          
          if (!dog) {
            return (
              <div
                key={`empty-${index}`}
                className="w-full h-full bg-black rounded-md shadow-lg"
              />
            );
          }
          return (
            <div
              key={`${dog.id}-${index}`}
              ref={el => dogRefs.current[index] = el}
              className="relative w-36 h-w-36 flex items-center justify-center"
            >
              <img 
              className="w-full h-full object-cover rounded-md overflow-hidden shadow-lg transform transition-transform hover:scale-105"
              src={dog.imageUrl}
                alt={dog.breed || ""}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DogMosaic;