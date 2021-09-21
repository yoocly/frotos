import type { Meta, Story } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import React from 'react';
import type { SearchResultImageProps } from './SearchResultImage';
import SearchResultImage from './SearchResultImage';

const mockImages = {
  image1: {
    id: '3021072',
    title: 'polynesien, französisch polynesien, tahiti',
    width: 2200,
    height: 1460,
    urlSource: 'https://pixabay.com/de/photos/polynesien-franz%c3%b6sisch-polynesien-3021072/',
    author: 'Julius_Silver',
    src: 'https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1920.jpg',
    thumbnail:
      'https://pixabay.com/get/ge300339778d65e5be80173737f265d2db96e131bc64f17c811bde9a9b2216e18610b6d83c20ece3584e46c4ab4454ab9a96fa9afe5f6b01d1aeefe96091a3070_640.jpg',
    aspectRatio: '3:2',
    api: 'pixabay',
    score: 42141,
  },
  image2: {
    id: 'Dvrbad-8YeM',
    title: 'white bed linen near red metal frame',
    width: 8064,
    height: 6048,
    urlSource: 'https://unsplash.com/photos/Dvrbad-8YeM',
    author: 'Boxed Water Is Better',
    urlAuthor: 'https://unsplash.com/@boxedwater',
    src: 'https://images.unsplash.com/photo-1587502536900-baf0c55a3f74?ixid=MnwyNTY3MDF8MXwxfHNlYXJjaHwxfHxiZWFjaHxlbnwwfHx8fDE2MzE3OTYzNDA&ixlib=rb-1.2.1&fm=webp&q=100&lossless=0',
    thumbnail:
      'https://images.unsplash.com/photo-1587502536900-baf0c55a3f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNTY3MDF8MXwxfHNlYXJjaHwxfHxiZWFjaHxlbnwwfHx8fDE2MzE3OTYzNDA&ixlib=rb-1.2.1&q=80&w=400&fm=webp&q=50&lossless=1',
    aspectRatio: '4:3',
    api: 'unsplash',
    score: 10005,
  },
  image3: {
    id: '1680140',
    width: 2992,
    height: 3992,
    urlSource: 'https://www.pexels.com/de-de/foto/luftbildfotografie-von-seashore-1680140/',
    author: 'Daria Shevtsova',
    urlAuthor: 'https://www.pexels.com/de-de/@daria',
    src: 'https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg',
    thumbnail:
      'https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
    aspectRatio: '3:4',
    api: 'pexels',
    score: 8000,
  },
};

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
  image: mockImages.image1,
  inCollection: false,
  onClick: () => console.log('clicked image'),
  onCollectionClick: () => console.log('clicked collection'),
};
