import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { SearchResultImageProps } from './SearchResultImage';
import SearchResultImage from './SearchResultImage';

const mockImages = {
  image1: {
    id: '1151282',
    width: 3840,
    height: 5760,
    urlSource: 'https://www.pexels.com/de-de/foto/nahaufnahme-fotografie-von-sand-1151282/',
    author: 'Nathan Cowley',
    urlAuthor: 'https://www.pexels.com/de-de/@mastercowley',
    src: 'https://images.pexels.com/photos/1151282/pexels-photo-1151282.jpeg',
    thumbnail:
      'https://images.pexels.com/photos/1151282/pexels-photo-1151282.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
    thumbnailWidth: 300,
    thumbnailHeight: 300,
    aspectRatio: '2:3',
    api: 'pexels',
    score: 2666.6666666666665,
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
    thumbnailWidth: 300,
    thumbnailHeight: 300,
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
    thumbnailWidth: 300,
    thumbnailHeight: 300,
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
