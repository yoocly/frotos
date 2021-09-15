import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { NavBarProps } from './NavBar';
import NavBar from './NavBar';

export default {
  title: 'Components/Nav Bar',
  component: NavBar,
  argTypes: {
    active: {
      options: [undefined, 'search', 'collections', 'profile', 'about'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<NavBarProps> = (args) => <NavBar {...args}></NavBar>;

export const navBar = Template.bind({});
navBar.args = {};
