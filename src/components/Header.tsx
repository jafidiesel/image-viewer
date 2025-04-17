import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Creamos una timeline para animar los elementos del header secuencialmente
    const tl = gsap.timeline();
    
    tl.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(titleRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .from(subtitleRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2");
  }, []);

  return (
    <header className="app-header" ref={headerRef}>
      <h1 ref={titleRef}>Dog Gallery</h1>
      <p ref={subtitleRef}>Explore images of different dog breeds</p>
    </header>
  );
};

export default Header;