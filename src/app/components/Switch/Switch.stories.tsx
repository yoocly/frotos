import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { SwitchProps } from './Switch';
import Switch from './Switch';

export default {
  title: 'Components/Toggle Switch',
  component: Switch,
  argTypes: {},
} as Meta;

const Template: Story<SwitchProps> = (args) => <Switch {...args}></Switch>;

export const toggleSwitch = Template.bind({});
toggleSwitch.args = {
  value: false,
  onChange: () => console.log('Changed'),
  children: `This is my switch`,
};
