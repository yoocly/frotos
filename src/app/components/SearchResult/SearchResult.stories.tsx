import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { SearchResultProps } from './SearchResult';
import SearchResult from './SearchResult';
import { mockImages } from '../../lib/mockImages';

export default {
  title: 'Components/Search Result',
  component: SearchResult,
  decorators: [(story) => <div style={{ margin: '-1rem' }}>{story()}</div>],
} as Meta;

const Template: Story<SearchResultProps> = (args) => <SearchResult {...args}></SearchResult>;

export const searchResult = Template.bind({});
searchResult.args = {
  isLoading: false,
  imagesResult: mockImages,
  onImageClick: (id) => console.log(`clicked image ${id}`),
  onCollectionClick: (id) => console.log(`clicked collection on image ${id}`),
};
