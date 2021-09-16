import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { SpinnerProps } from './Spinner';
import Spinner from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {},
} as Meta;

const Template: Story<SpinnerProps> = (args) => <Spinner {...args}></Spinner>;

export const spinner = Template.bind({});
spinner.args = {
  show: true,
};
