import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { BackgroundImageProps } from './BackgroundImage';
import BackgroundImage from './BackgroundImage';

export default {
  title: 'Components/Background Image',
  component: BackgroundImage,
  argTypes: {},
} as Meta;

const Template: Story<BackgroundImageProps> = (args) => (
  <BackgroundImage {...args}></BackgroundImage>
);

export const backgroundImage = Template.bind({});
backgroundImage.args = {
  dim: true,
  children: `This is my backgroundimage`,
};
