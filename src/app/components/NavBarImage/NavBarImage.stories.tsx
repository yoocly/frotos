import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { NavBarImageProps } from './NavBarImage';
import { NAVBARIMAGE_ITEMS } from './NavBarImage';
import NavBarImage from './NavBarImage';

export default {
  title: 'Components/Nav Bar Image',
  component: NavBarImage,
  argTypes: {
    active: {
      options: NAVBARIMAGE_ITEMS,
      control: { type: 'select' },
    },
  },
} as Meta;

const template: Story<NavBarImageProps> = (args) => <NavBarImage {...args}></NavBarImage>;

export const navBarImage = template.bind({});
navBarImage.args = { onClick: (item) => console.log(`clicked ${item}`) };
