'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  thumbnail: string;
  videoUrl: string;
  onClick: () => void;
}

export default function ProjectCard({ title, thumbnail, videoUrl, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) return;
    if (isHovered) void video.play().catch(() => { /* Playback may require a user gesture. */ });
    else { video.pause(); }
  }, [isHovered, videoError]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.button
      type="button"
      aria-label={`Ver projeto: ${title}`}
      className="text-left relative h-[500px] w-full cursor-pointer overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        transform: isHovered ? 'skewY(0deg) scale(1.05)' : 'skewY(-2deg)',
      }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-navy/80 transition-opacity duration-300" 
           style={{ opacity: isHovered ? 0 : 1 }} />
      
      <Image
        src={thumbnail}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
        style={{ opacity: isHovered && !videoError ? 0 : 1 }}
      />
      
      {isHovered && !videoError && (
        <video
          ref={videoRef}
          src={videoUrl}
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          playsInline
          style={{ opacity: isHovered ? 1 : 0 }}
          onError={() => setVideoError(true)}
        />
      )}
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark via-dark/80 to-transparent p-8">
        <span className="text-2xl font-bold text-white">{title}</span>
      </div>

      <motion.div
        className="absolute inset-0 border-3 border-navy"
        animate={{
          opacity: isHovered ? 1 : 0.5,
        }}
      />
    </motion.button>
  );
}
