import type { Meta, Story } from '@storybook/react';
import React from 'react';
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
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}></Button>;

export const button = Template.bind({});
button.args = {
  icon: 'search',
  text: 'Search',
  small: false,
  transparent: false,
};
