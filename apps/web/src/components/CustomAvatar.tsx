import React from 'react';

interface AvatarConfig {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  clothingColor: string;
  gender?: 'male' | 'female';
  glasses?: boolean;
  accessory?: 'earrings' | 'necklace' | 'none';
}

interface CustomAvatarProps {
  config: AvatarConfig;
  size?: number;
}

export default function CustomAvatar({ config, size = 120 }: CustomAvatarProps) {
  const { skinTone, hairStyle, hairColor, clothingColor, gender = 'male', glasses = false, accessory = 'none' } = config;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle cx="100" cy="100" r="100" fill="#F3F4F6" />

      {/* Body/Clothing */}
      <path
        d="M 60 160 Q 100 180 140 160 L 140 200 L 60 200 Z"
        fill={clothingColor}
      />

      {/* Neck */}
      <rect
        x="85"
        y="140"
        width="30"
        height="25"
        fill={skinTone}
      />

      {/* Head */}
      <circle cx="100" cy="100" r="50" fill={skinTone} />

      {/* Hair - Different styles based on gender and hairStyle */}
      {hairStyle !== 'bald' && (
        <>
          {hairStyle === 'short' && (
            <>
              {/* Top of head */}
              <ellipse
                cx="100"
                cy="70"
                rx="52"
                ry="32"
                fill={hairColor}
              />
              {/* Sides */}
              <path
                d="M 50 80 Q 48 90 50 100 L 55 95 Q 53 85 55 80 Z"
                fill={hairColor}
              />
              <path
                d="M 150 80 Q 152 90 150 100 L 145 95 Q 147 85 145 80 Z"
                fill={hairColor}
              />
            </>
          )}
          {hairStyle === 'long' && gender === 'female' && (
            <>
              {/* Top of head */}
              <ellipse
                cx="100"
                cy="68"
                rx="52"
                ry="30"
                fill={hairColor}
              />
              {/* Long hair on sides */}
              <ellipse
                cx="65"
                cy="110"
                rx="18"
                ry="45"
                fill={hairColor}
              />
              <ellipse
                cx="135"
                cy="110"
                rx="18"
                ry="45"
                fill={hairColor}
              />
              {/* Middle parting */}
              <path
                d="M 100 50 Q 95 60 93 70"
                stroke={skinTone}
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              />
            </>
          )}
          {hairStyle === 'long' && gender === 'male' && (
            <>
              <ellipse
                cx="100"
                cy="70"
                rx="52"
                ry="32"
                fill={hairColor}
              />
              <path
                d="M 50 85 Q 48 100 52 115 L 58 110 Q 55 95 58 85 Z"
                fill={hairColor}
              />
              <path
                d="M 150 85 Q 152 100 148 115 L 142 110 Q 145 95 142 85 Z"
                fill={hairColor}
              />
            </>
          )}
          {hairStyle === 'curly' && (
            <>
              <circle cx="70" cy="60" r="15" fill={hairColor} />
              <circle cx="85" cy="50" r="15" fill={hairColor} />
              <circle cx="100" cy="48" r="15" fill={hairColor} />
              <circle cx="115" cy="50" r="15" fill={hairColor} />
              <circle cx="130" cy="60" r="15" fill={hairColor} />
              <circle cx="65" cy="80" r="12" fill={hairColor} />
              <circle cx="135" cy="80" r="12" fill={hairColor} />
            </>
          )}
          {hairStyle === 'bun' && gender === 'female' && (
            <>
              <path
                d="M 50 95 Q 50 70 75 60 Q 100 55 125 60 Q 150 70 150 95"
                fill={hairColor}
              />
              <circle cx="100" cy="40" r="20" fill={hairColor} />
            </>
          )}
          {hairStyle === 'mohawk' && (
            <path
              d="M 90 45 L 85 30 Q 100 20 115 30 L 110 45 Q 100 50 90 45"
              fill={hairColor}
            />
          )}
        </>
      )}

      {/* Eyes */}
      <circle cx="80" cy="95" r="5" fill="#2C1B18" />
      <circle cx="120" cy="95" r="5" fill="#2C1B18" />

      {/* Glasses */}
      {glasses && (
        <>
          <circle
            cx="80"
            cy="95"
            r="12"
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
          <circle
            cx="120"
            cy="95"
            r="12"
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
          <line
            x1="92"
            y1="95"
            x2="108"
            y2="95"
            stroke="#333"
            strokeWidth="2"
          />
        </>
      )}

      {/* Eyelashes for female */}
      {gender === 'female' && (
        <>
          <line x1="75" y1="90" x2="72" y2="88" stroke="#2C1B18" strokeWidth="1.5" />
          <line x1="78" y1="89" x2="76" y2="86" stroke="#2C1B18" strokeWidth="1.5" />
          <line x1="82" y1="90" x2="81" y2="87" stroke="#2C1B18" strokeWidth="1.5" />
          
          <line x1="125" y1="90" x2="128" y2="88" stroke="#2C1B18" strokeWidth="1.5" />
          <line x1="122" y1="89" x2="124" y2="86" stroke="#2C1B18" strokeWidth="1.5" />
          <line x1="118" y1="90" x2="119" y2="87" stroke="#2C1B18" strokeWidth="1.5" />
        </>
      )}

      {/* Eyebrows */}
      <path
        d="M 70 85 Q 80 82 90 85"
        stroke="#2C1B18"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 110 85 Q 120 82 130 85"
        stroke="#2C1B18"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Nose */}
      <path
        d="M 100 105 L 95 115 Q 100 117 105 115 Z"
        fill="none"
        stroke={skinTone}
        strokeWidth="2"
        opacity="0.3"
      />

      {/* Mouth - smile for female, neutral for male */}
      {gender === 'female' ? (
        <path
          d="M 85 125 Q 100 132 115 125"
          stroke="#E91E63"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M 90 125 Q 100 130 110 125"
          stroke="#2C1B18"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      )}

      {/* Earrings for female */}
      {gender === 'female' && accessory === 'earrings' && (
        <>
          <circle cx="62" cy="110" r="4" fill="#FFD700" />
          <circle cx="138" cy="110" r="4" fill="#FFD700" />
        </>
      )}

      {/* Necklace */}
      {accessory === 'necklace' && (
        <>
          <ellipse
            cx="100"
            cy="145"
            rx="25"
            ry="8"
            fill="none"
            stroke="#FFD700"
            strokeWidth="3"
          />
          <circle cx="100" cy="153" r="5" fill="#FFD700" />
        </>
      )}
    </svg>
  );
}
