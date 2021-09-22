import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { ImageDetailsProps } from './ImageDetails';
import ImageDetails from './ImageDetails';

import { mockImages } from '../../lib/mockImages';

export default {
  title: 'Components/ImageDetails',
  component: ImageDetails,
} as Meta;

const Template: Story<ImageDetailsProps> = (args) => <ImageDetails {...args}></ImageDetails>;

export const imageDetails1 = Template.bind({});
imageDetails1.args = {
  image: mockImages.results[0],
};

export const imageDetails2 = Template.bind({});
imageDetails2.args = {
  image: mockImages.results[1],
};

export const imageDetails3 = Template.bind({});
imageDetails3.args = {
  image: mockImages.results[2],
};
