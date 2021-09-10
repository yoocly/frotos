import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { CheckboxProps } from './Checkbox';
import Checkbox from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {},
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args}></Checkbox>;

export const checkbox = Template.bind({});
checkbox.args = {
  checked: false,
  children: `This is my checkbox`,
};
