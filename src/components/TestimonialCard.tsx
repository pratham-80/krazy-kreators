"use client"
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TestimonialCardProps {
  index: number;
  videoSrc: string;
  clientName: string;
  brandName: string;
  location: string;
  isPlaying: boolean;
  onVideoPlay: (index: number) => void;
  setVideoRef: (index: number, ref: HTMLVideoElement | null) => void;
  setCardRef: (index: number, ref: HTMLDivElement | null) => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  index,
  videoSrc,
  clientName,
  brandName,
  location,
  isPlaying,
  onVideoPlay,
  setVideoRef,
  setCardRef,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [poster, setPoster] = useState<string | undefined>(undefined);

  // Generate a poster image on the client so Safari shows a thumbnail consistently
  useEffect(() => {
    const generatePoster = async () => {
      try {
        const videoElement = document.createElement("video");
        videoElement.src = videoSrc + "#t=0.1"; // seek hint for some browsers
        videoElement.crossOrigin = "anonymous";
        videoElement.muted = true;
        videoElement.preload = "metadata";

        await new Promise<void>((resolve, reject) => {
          const onLoaded = () => resolve();
          const onError = () => reject(new Error("video load error"));
          videoElement.addEventListener("loadeddata", onLoaded, { once: true });
          videoElement.addEventListener("error", onError, { once: true });
        });

        const canvas = document.createElement("canvas");
        const width = videoElement.videoWidth || 720;
        const height = videoElement.videoHeight || 900;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(videoElement, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setPoster(dataUrl);
      } catch {
        // ignore poster generation failure; video will still play
      }
    };

    generatePoster();
  }, [videoSrc]);

  const handleCardClick = () => {
    onVideoPlay(index);
  };

  return (
    <motion.div
      ref={(ref) => {
        setCardRef(index, ref);
      }}
      data-index={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Video Container - fixed aspect ratio to keep dimensions proportional */}
      <div className="relative w-full aspect-[4/5]">
        <video
          ref={(ref) => {
            videoRef.current = ref;
            setVideoRef(index, ref);
          }}
          src={videoSrc}
          className="w-full h-full object-cover"
          controls={false}
          playsInline
          preload="metadata"
          poster={poster}
          onEnded={() => onVideoPlay(-1)}
          tabIndex={-1}
        />
        {/* Play button overlay when not playing */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="9.5,7.5 16.5,12 9.5,16.5" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Client Details Section - without avatar */}
      <div className="p-4">
        <div className="flex flex-col">
          <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">
            {clientName}
          </h3>
          <p className="text-sm text-gray-600 leading-tight">
            {brandName}{location ? `, ${location}` : ''}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard; 