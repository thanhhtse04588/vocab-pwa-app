import React from 'react';

interface BeeIconProps {
  size?: number;
  color?: string;
}

const BeeIcon: React.FC<BeeIconProps> = ({ size = 20, color = '#1f2937' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bee body - plump oval shape */}
    <ellipse
      cx="12"
      cy="14"
      rx="7"
      ry="5"
      fill="#fbbf24"
      stroke={color}
      strokeWidth="0.5"
    />

    {/* Bee head - integrated with body */}
    <ellipse
      cx="12"
      cy="10"
      rx="4"
      ry="3.5"
      fill="#fbbf24"
      stroke={color}
      strokeWidth="0.5"
    />

    {/* Black stripes on body - thick horizontal bands */}
    <ellipse cx="12" cy="12" rx="6" ry="2.5" fill={color} />
    <ellipse cx="12" cy="14.5" rx="6" ry="2.5" fill={color} />
    <ellipse cx="12" cy="17" rx="6" ry="2.5" fill={color} />

    {/* Wings - heart-shaped, light blue */}
    <path
      d="M8 8 Q8 4 10 6 Q12 4 12 6 Q14 4 16 6 Q16 8 16 10 Q12 12 8 10 Z"
      fill="#87ceeb"
      stroke={color}
      strokeWidth="0.3"
      opacity="0.9"
    />

    {/* Eyes - large, round with white highlights */}
    <circle cx="10" cy="9" r="1.2" fill={color} />
    <circle cx="14" cy="9" r="1.2" fill={color} />

    {/* Eye highlights */}
    <circle cx="10.3" cy="8.7" r="0.3" fill="white" />
    <circle cx="14.3" cy="8.7" r="0.3" fill="white" />

    {/* Smile - gentle upward curve */}
    <path
      d="M9 11 Q12 13 15 11"
      stroke={color}
      strokeWidth="0.8"
      strokeLinecap="round"
      fill="none"
    />

    {/* Antennae - thin with elegant curls */}
    <path
      d="M10 7 Q9 5 8.5 4 Q8 3 8.5 2.5"
      stroke={color}
      strokeWidth="0.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M14 7 Q15 5 15.5 4 Q16 3 15.5 2.5"
      stroke={color}
      strokeWidth="0.8"
      strokeLinecap="round"
      fill="none"
    />

    {/* Stinger - small pointed black tip */}
    <path
      d="M19 14 L20 16 L19 18"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BeeIcon;
