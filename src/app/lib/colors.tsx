import React from 'react';

export type color = {
  cssVar: string;
  colorClass: string;
  gradientFillClass?: string;
  gradientStrokeClass?: string;
  gradientSVG?: () => JSX.Element;
};

export type colors = {
  primary: color;
  light: color;
  medium: color;
  inactive: color;
  dark: color;
  primaryGradient: color;
  mediumGradient: color;
  inactiveGradient: color;
};

export type colorKey = keyof typeof COLORS;
export type apiColorKeys = keyof typeof apiColorMap;

export const GRADIENTS_SVG = {
  primary: (): JSX.Element => (
    <svg width="0" height="0" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient
          id="primaryGradient"
          x1="5.71139"
          y1="-24.375"
          x2="25.4689"
          y2="-20.8579"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00AAFF" />
          <stop offset="1" stopColor="#0088CC" />
        </linearGradient>
      </defs>
    </svg>
  ),

  medium: (): JSX.Element => (
    <svg width="0" height="0" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient
          id="mediumGradient"
          x1="5.71139"
          y1="-24.375"
          x2="25.4689"
          y2="-20.8579"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A6A6A6" />
          <stop offset="1" stopColor="#D9D9D9" />
        </linearGradient>
      </defs>
    </svg>
  ),

  inactive: (): JSX.Element => (
    <svg width="0" height="0" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient
          id="inactiveGradient"
          x1="5.71139"
          y1="-24.375"
          x2="25.4689"
          y2="-20.8579"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#666666" />
          <stop offset="1" stopColor="#808080" />
        </linearGradient>
      </defs>
    </svg>
  ),
};

export const COLORS = {
  primary: { cssVar: `primary`, colorClass: `colorPrimary` },
  lightPrimary: { cssVar: `lightPrimary`, colorClass: `colorLightPrimary` },
  light: { cssVar: `light`, colorClass: `colorLight` },
  medium: { cssVar: `medium`, colorClass: `colorMedium` },
  inactive: { cssVar: `inactive`, colorClass: `colorInactive` },
  dark: { cssVar: `dark`, colorClass: `colorDark` },
  primaryGradient: {
    cssVar: `primaryGradient`,
    colorClass: `colorPrimaryGradient`,
    gradientFillClass: `fillPrimaryGradient`,
    gradientStrokeClass: `strokePrimaryGradient`,
    gradientSVG: GRADIENTS_SVG.primary,
  },
  mediumGradient: {
    cssVar: `mediumGradient`,
    colorClass: `colorMediumGradient`,
    gradientFillClass: `fillMediumGradient`,
    gradientStrokeClass: `strokeMediumGradient`,
    gradientSVG: GRADIENTS_SVG.medium,
  },
  inactiveGradient: {
    cssVar: `inactiveGradient`,
    colorClass: `colorInactiveGradient`,
    gradientFillClass: `fillInactiveGradient`,
    gradientStrokeClass: `strokeInactiveGradient`,
    gradientSVG: GRADIENTS_SVG.inactive,
  },
};

export const apiColorMap = {
  monochrom: {
    unsplash: 'black_and_white',
    // pexels: 'black',
    pexels: 'noRequest',
    pixabay: 'grayscale',
  },
  black: {
    unsplash: 'black',
    // pexels: 'black',
    pexels: 'noRequest',
    pixabay: 'black',
  },
  white: {
    unsplash: 'white',
    // pexels: 'white',
    pexels: 'noRequest',
    pixabay: 'white',
  },
  gray: {
    unsplash: 'noRequest',
    // pexels: 'gray',
    pexels: 'noRequest',
    pixabay: 'gray',
  },
  red: {
    unsplash: 'red',
    // pexels: 'red',
    pexels: 'noRequest',
    pixabay: 'red',
  },
  orange: {
    unsplash: 'orange',
    // pexels: '#e68600',
    pexels: 'noRequest',
    pixabay: 'orange,brown',
  },
  yellow: {
    unsplash: 'yellow',
    // pexels: 'yellow',
    pexels: 'noRequest',
    pixabay: 'yellow',
  },
  green: {
    unsplash: 'green',
    // pexels: 'green',
    pexels: 'noRequest',
    pixabay: 'green',
  },
  teal: {
    unsplash: 'teal',
    // pexels: 'turquoise',
    pexels: 'noRequest',
    pixabay: 'turquoise',
  },
  blue: {
    unsplash: 'blue',
    // pexels: 'blue',
    pexels: 'noRequest',
    pixabay: 'blue',
  },
  purple: {
    unsplash: 'purple',
    // pexels: '#b366ff',
    pexels: 'noRequest',
    pixabay: 'lilac,pink',
  },
};
