import React from 'react';
import type { color } from '../../lib/colors';
import styles from './Icon.module.css';

export type icon = {
  iconify?: string;
  svg?: (height: string, width: string, color: color, className: string) => JSX.Element;
};

export type iconKey = keyof typeof ICONS;

export const ICONS = {
  none: {},
  search: { iconify: 'ic:round-search' },
  info: { iconify: 'ic:outline-info' },
  collection: { iconify: 'ic:round-bookmark-border' },
  profile: { iconify: 'ic:round-person-outline' },
  landscape: { iconify: 'ic:round-crop-landscape' },
  portrait: { iconify: 'ic:round-crop-portrait' },
  square: { iconify: 'ic:round-crop-square' },
  collectionAdd: { iconify: 'ic:round-bookmark-add' },
  collectionAdded: { iconify: 'ic:round-bookmark-added' },
  check: { iconify: 'ic:round-check' },
  add: { iconify: 'ic:round-add' },
  edit: { iconify: 'ic:round-edit' },
  forward: { iconify: 'ic:round-arrow-forward-ios' },
  back: { iconify: 'ic:round-arrow-back-ios-new' },
  down: { iconify: 'ic:round-keyboard-arrow-down' },
  close: { iconify: 'ic:round-close' },
  view: { iconify: 'ic:round-remove-red-eye' },
  crop: { iconify: 'ic:round-crop' },
  download: { iconify: 'ic:round-download' },
  palette: { iconify: 'ic:outline-palette' },
  colorize: { iconify: 'ic:round-format-color-fill' },
  aspectRatio: { iconify: 'ic:round-aspect-ratio' },
  height: { iconify: 'ic:round-height' },
  quality: { iconify: 'ic:round-high-quality' },
  opacity: { iconify: 'ic:baseline-opacity' },
  user: { iconify: 'ic:round-person' },
  password: { iconify: 'ic:round-password' },
  login: { iconify: 'ic:round-log-in' },
  logout: { iconify: 'ic:round-log-out' },
  delete: { iconify: 'ic:round-delete-forever' },

  filterFormat: {
    svg: (height = '1.5rem', width = '1.5rem', color: color, className?: string): JSX.Element => (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        className={`${
          color.gradientStrokeClass ? styles[color.gradientStrokeClass] : ``
        } ${className}`}
        fill="none"
      >
        <rect
          x="11"
          y="1"
          width="12"
          height="16"
          rx="2"
          stroke={className ? `currentColor` : `var(--${color.cssVar})`}
          strokeWidth="2"
          shapeRendering="crispEdges"
        />
        <rect
          x="1"
          y="11"
          width="16"
          height="12"
          rx="2"
          stroke={className ? `currentColor` : `var(--${color.cssVar})`}
          strokeWidth="2"
          fill="var(--dark)"
        />
      </svg>
    ),
  },

  logo: {
    svg: (height = '1.5rem', width = '1.5rem', _color: color, className: string): JSX.Element => (
      <svg width={width} height={height} className={className} viewBox="0 0 67 67">
        <path
          d="M25.1334 23.0312C25.1334 24.6971 24.4716 26.2948 23.2936 27.4728C22.1157 28.6507 20.518 29.3125 18.8521 29.3125C17.1862 29.3125 15.5886 28.6507 14.4106 27.4728C13.2326 26.2948 12.5709 24.6971 12.5709 23.0312C12.5709 21.3654 13.2326 19.7677 14.4106 18.5897C15.5886 17.4118 17.1862 16.75 18.8521 16.75C20.518 16.75 22.1157 17.4118 23.2936 18.5897C24.4716 19.7677 25.1334 21.3654 25.1334 23.0312V23.0312Z"
          fill="#0099E6"
        />
        <path
          d="M8.38336 4.1875C6.16217 4.1875 4.03196 5.06986 2.46134 6.64048C0.890725 8.2111 0.00836182 10.3413 0.00836182 12.5625V54.4375C0.00836182 56.6587 0.890725 58.7889 2.46134 60.3595C4.03196 61.9301 6.16217 62.8125 8.38336 62.8125H58.6334C60.8546 62.8125 62.9848 61.9301 64.5554 60.3595C66.126 58.7889 67.0084 56.6587 67.0084 54.4375V12.5625C67.0084 10.3413 66.126 8.2111 64.5554 6.64048C62.9848 5.06986 60.8546 4.1875 58.6334 4.1875H8.38336V4.1875ZM58.6334 8.375C59.744 8.375 60.8091 8.81618 61.5944 9.60149C62.3797 10.3868 62.8209 11.4519 62.8209 12.5625V39.7812L47.0047 31.6282C46.612 31.4315 46.1674 31.3632 45.7338 31.4331C45.3001 31.503 44.8995 31.7075 44.5885 32.0176L29.0529 47.5532L17.9141 40.133C17.5119 39.8652 17.0296 39.7448 16.5487 39.7921C16.0679 39.8395 15.6182 40.0516 15.276 40.3926L4.19586 50.25V12.5625C4.19586 11.4519 4.63704 10.3868 5.42235 9.60149C6.20766 8.81618 7.27277 8.375 8.38336 8.375H58.6334Z"
          fill="#E6F7FF"
        />
      </svg>
    ),
  },
};
