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
  primary: { cssVar: `primary`, colorClass: `colorPrimary`, hoverColorClass: `hoverColorPrimary` },
  lightPrimary: {
    cssVar: `lightPrimary`,
    colorClass: `colorLightPrimary`,
    hoverColorClass: `hoverColorLightPrimary`,
  },
  light: { cssVar: `light`, colorClass: `colorLight`, hoverColorClass: `hoverColorLight` },
  medium: { cssVar: `medium`, colorClass: `colorMedium`, hoverColorClass: `hoverColorMedium` },
  inactive: {
    cssVar: `inactive`,
    colorClass: `colorInactive`,
    hoverColorClass: `hoverColorInactive`,
  },
  dark: { cssVar: `dark`, colorClass: `colorDark`, hoverColorClass: `hoverColorDark` },
  primaryGradient: {
    cssVar: `primaryGradient`,
    colorClass: `colorPrimaryGradient`,
    hoverColorClass: `hoverColorPrimaryGradient`,
    gradientFillClass: `fillPrimaryGradient`,
    gradientStrokeClass: `strokePrimaryGradient`,
    gradientSVG: GRADIENTS_SVG.primary,
  },
  mediumGradient: {
    cssVar: `mediumGradient`,
    colorClass: `colorMediumGradient`,
    hoverColorClass: `hoverColorMediumGradient`,
    gradientFillClass: `fillMediumGradient`,
    gradientStrokeClass: `strokeMediumGradient`,
    gradientSVG: GRADIENTS_SVG.medium,
  },
  inactiveGradient: {
    cssVar: `inactiveGradient`,
    colorClass: `colorInactiveGradient`,
    hoverColorClass: `hoverColorInactiveGradient`,
    gradientFillClass: `fillInactiveGradient`,
    gradientStrokeClass: `strokeInactiveGradient`,
    gradientSVG: GRADIENTS_SVG.inactive,
  },
};

export const apiColorKeys = [
  'nocolor',
  'monochrom',
  'black',
  'white',
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
  'monochrom',
];
