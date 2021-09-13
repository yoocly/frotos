import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { HeadlineProps } from './Headline';
import Headline from './Headline';

export default {
  title: 'Components/Headline',
  component: Headline,
  argTypes: {
    level: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: 'select' },
    },
    styling: {
      options: [`default`, `large`, `logo`],
      control: { type: 'select' },
    },
    children: { control: { type: 'text' } },
  },
} as Meta;

const Template: Story<HeadlineProps> = (args) => <Headline {...args}></Headline>;

export const headline = Template.bind({});
headline.args = {
  level: 2,
  styling: `default`,
  children: `This is my headline`,
};
