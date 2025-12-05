import React from 'react';
import { motion } from 'framer-motion';

interface DuoMascotProps {
  variant?: 'happy' | 'excited' | 'thinking' | 'celebrating';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

export default function DuoMascot({ 
  variant = 'happy', 
  size = 'md',
  animate = true 
}: DuoMascotProps) {
  
  const sizes = {
    sm: 80,
    md: 120,
    lg: 180,
    xl: 240,
  };
  
  const mascotSize = sizes[size];

  return (
    <motion.div
      initial={animate ? { scale: 0, rotate: -180 } : {}}
      animate={animate ? { scale: 1, rotate: 0 } : {}}
      transition={{ type: "spring", duration: 0.8 }}
      className="relative inline-block"
    >
      <motion.div
        animate={animate ? {
          y: [0, -10, 0],
          rotate: [0, -5, 0, 5, 0],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg
          width={mascotSize}
          height={mascotSize}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow */}
          <ellipse
            cx="100"
            cy="180"
            rx="60"
            ry="15"
            fill="black"
            opacity="0.1"
          />

          {/* Body */}
          <motion.path
            d="M100 160 C70 160 50 140 50 110 C50 80 70 60 100 60 C130 60 150 80 150 110 C150 140 130 160 100 160 Z"
            fill="#58CC02"
            stroke="#46A302"
            strokeWidth="3"
            animate={variant === 'celebrating' ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 0.5,
              repeat: variant === 'celebrating' ? Infinity : 0,
            }}
          />

          {/* Head */}
          <motion.circle
            cx="100"
            cy="80"
            r="45"
            fill="#58CC02"
            stroke="#46A302"
            strokeWidth="3"
            animate={variant === 'thinking' ? {
              x: [-2, 2, -2],
            } : {}}
            transition={{
              duration: 0.3,
              repeat: variant === 'thinking' ? Infinity : 0,
            }}
          />

          {/* Eyes - White background */}
          <ellipse cx="85" cy="75" rx="12" ry="16" fill="white" />
          <ellipse cx="115" cy="75" rx="12" ry="16" fill="white" />

          {/* Pupils */}
          <motion.circle
            cx="85"
            cy="78"
            r="7"
            fill="#1E293B"
            animate={variant === 'excited' ? {
              scale: [1, 1.3, 1],
            } : {}}
            transition={{
              duration: 0.5,
              repeat: variant === 'excited' ? Infinity : 0,
            }}
          />
          <motion.circle
            cx="115"
            cy="78"
            r="7"
            fill="#1E293B"
            animate={variant === 'excited' ? {
              scale: [1, 1.3, 1],
            } : {}}
            transition={{
              duration: 0.5,
              repeat: variant === 'excited' ? Infinity : 0,
            }}
          />

          {/* Eye shine */}
          <circle cx="83" cy="74" r="3" fill="white" />
          <circle cx="113" cy="74" r="3" fill="white" />

          {/* Eyebrows */}
          <motion.path
            d="M 75 65 Q 80 62 90 65"
            stroke="#46A302"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            animate={variant === 'thinking' ? {
              d: "M 75 60 Q 80 57 90 60"
            } : {}}
          />
          <motion.path
            d="M 110 65 Q 115 62 125 65"
            stroke="#46A302"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            animate={variant === 'thinking' ? {
              d: "M 110 60 Q 115 57 125 60"
            } : {}}
          />

          {/* Beak/Mouth */}
          <motion.path
            d="M 90 90 Q 100 ${variant === 'happy' || variant === 'excited' ? '98' : '93'} 110 90"
            stroke="#46A302"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cheeks (blush) */}
          {(variant === 'happy' || variant === 'excited') && (
            <>
              <ellipse cx="70" cy="88" rx="8" ry="6" fill="#FF9600" opacity="0.4" />
              <ellipse cx="130" cy="88" rx="8" ry="6" fill="#FF9600" opacity="0.4" />
            </>
          )}

          {/* Wings */}
          <motion.path
            d="M 50 110 Q 30 100 35 90"
            fill="#46A302"
            animate={animate ? {
              d: [
                "M 50 110 Q 30 100 35 90",
                "M 50 110 Q 25 105 30 95",
                "M 50 110 Q 30 100 35 90",
              ]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M 150 110 Q 170 100 165 90"
            fill="#46A302"
            animate={animate ? {
              d: [
                "M 150 110 Q 170 100 165 90",
                "M 150 110 Q 175 105 170 95",
                "M 150 110 Q 170 100 165 90",
              ]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Feet */}
          <ellipse cx="85" cy="165" rx="10" ry="5" fill="#FF9600" />
          <ellipse cx="115" cy="165" rx="10" ry="5" fill="#FF9600" />
          
          {/* Toes */}
          <path d="M 80 165 L 75 170" stroke="#FF9600" strokeWidth="2" strokeLinecap="round" />
          <path d="M 85 165 L 85 172" stroke="#FF9600" strokeWidth="2" strokeLinecap="round" />
          <path d="M 90 165 L 95 170" stroke="#FF9600" strokeWidth="2" strokeLinecap="round" />
          <path d="M 110 165 L 105 170" stroke="#FF9600" strokeWidth="2" strokeLinecap="round" />
          <path d="M 115 165 L 115 172" stroke="#FF9600" strokeWidth="2" strokeLinecap="round" />
          <path d="M 120 165 L 125 170" stroke="#FF9600" strokeWidth="2" strokeLinecap="round" />

          {/* Celebration stars (if celebrating) */}
          {variant === 'celebrating' && (
            <>
              <motion.path
                d="M 40 60 L 45 65 L 40 70 L 35 65 Z"
                fill="#FFC800"
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
              <motion.path
                d="M 160 60 L 165 65 L 160 70 L 155 65 Z"
                fill="#FFC800"
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.3,
                }}
              />
            </>
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
}
