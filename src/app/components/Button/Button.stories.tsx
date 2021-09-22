import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { COLORS } from '../../lib/colors';
import { ICONS } from '../Icon/icons';
import type { ButtonProps } from './Button';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    icon: {
      options: Object.keys(ICONS),
      control: { type: 'select' },
    },
    color: {
      options: Object.keys(COLORS),
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}></Button>;

export const button = Template.bind({});
button.args = {
  icon: 'search',
  text: 'Search',
  small: false,
  transparent: false,
  onClick: () => console.log('Clicked'),
  externalLink: '',
};
