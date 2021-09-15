import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { ICONS } from '../Icon/icons';
import type { InputProps } from './Input';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    icon: {
      options: Object.keys(ICONS),
      control: { type: 'select' },
    },
    submitIcon: {
      options: Object.keys(ICONS),
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args}></Input>;

export const input = Template.bind({});
input.args = {
  value: '',
  placeholder: 'Enter something',
  icon: 'password',
  submitIcon: 'login',
  password: false,
  onSubmit: () => console.log('Submitted'),
  onChange: () => console.log('Changed'),
};
