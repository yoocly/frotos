import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { SearchResultImageProps } from './SearchResultImage';
import SearchResultImage from './SearchResultImage';

import { mockImages } from '../../lib/mockImages';

export default {
  title: 'Components/Search Result Image',
  component: SearchResultImage,
  argTypes: {
    image: {
      options: mockImages,
      control: { type: 'select' },
    },
  },
  decorators: [(story) => <div style={{ margin: '-1rem' }}>{story()}</div>],
} as Meta;

const Template: Story<SearchResultImageProps> = (args) => (
  <SearchResultImage {...args}></SearchResultImage>
);

export const searchResultImage = Template.bind({});
searchResultImage.args = {
  image: mockImages.results[0],
  inCollection: false,
  onClick: () => console.log('clicked image'),
  onCollectionClick: () => console.log('clicked collection'),
};
