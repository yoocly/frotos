import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { PreviewImageProps } from './PreviewImage';
import PreviewImage from './PreviewImage';

const mockImages = {
  image1: {
    id: 'u3RlGBpFeoQg',
    title: 'silhouette of trees near ocean during sunset',
    width: 5193,
    height: 3462,
    urlSource: 'https://unsplash.com/photos/3RlGBpFeoQg',
    author: 'Matthew Hamilton',
    urlAuthor: 'https://unsplash.com/@thatsmrbio',
    src: 'https://images.unsplash.com/photo-1475522003475-eb5f96f1f930?ixid=MnwyNTY3MDF8MHwxfHNlYXJjaHwxM3x8cGFsbSUyMGJlYWNofGVufDB8fHx8MTYzMjIxNDIwNQ&ixlib=rb-1.2.1',
    preview:
      'https://images.unsplash.com/photo-1475522003475-eb5f96f1f930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNTY3MDF8MHwxfHNlYXJjaHwxM3x8cGFsbSUyMGJlYWNofGVufDB8fHx8MTYzMjIxNDIwNQ&ixlib=rb-1.2.1&q=80&w=1080',
    thumbnail:
      'https://images.unsplash.com/photo-1475522003475-eb5f96f1f930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNTY3MDF8MHwxfHNlYXJjaHwxM3x8cGFsbSUyMGJlYWNofGVufDB8fHx8MTYzMjIxNDIwNQ&ixlib=rb-1.2.1&q=80&w=200',
    thumbnailWidth: 200,
    thumbnailHeight: 89890.83,
    aspectRatio: '3:2',
    api: 'unsplash',
    score: 769.2307692307693,
  },
  image2: {
    id: 'e3225531',
    width: 3000,
    height: 4000,
    urlSource: 'https://www.pexels.com/de-de/foto/frau-die-auf-dem-schwimmbad-einweicht-3225531/',
    author: 'Michael Block',
    urlAuthor: 'https://www.pexels.com/de-de/@michael-block-1691617',
    src: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg',
    preview:
      'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&w=1280',
    thumbnail:
      'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
    thumbnailWidth: 280,
    thumbnailHeight: 200,
    aspectRatio: '3:4',
    api: 'pexels',
    score: 727.2727272727273,
  },
  image3: {
    id: 'i3220702',
    title: 'malediven, palme, hängematte',
    width: 6000,
    height: 4000,
    urlSource: 'https://pixabay.com/de/photos/malediven-palme-h%c3%a4ngematte-strand-3220702/',
    author: 'pasja1000',
    src: 'https://cdn.pixabay.com/photo/2018/03/12/20/07/maldives-3220702_1920.jpg',
    preview: 'https://cdn.pixabay.com/photo/2018/03/12/20/07/maldives-3220702_1280.jpg',
    thumbnail:
      'https://pixabay.com/get/g95567ee9e47d266027bd98821bf5543efb23e1742f10a0628bc0e56d627545e977cb8d2c8e0aa81c1f4199c8c3b43a0f87d890f1e76d26f2da464f726b66d4b0_640.jpg',
    thumbnailWidth: 640,
    thumbnailHeight: 426,
    aspectRatio: '3:2',
    api: 'pixabay',
    score: 327.6,
  },
};

export default {
  title: 'Components/Preview Image',
  component: PreviewImage,
  decorators: [
    (story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '1fr auto',
          height: '80vh',
          width: '80vw',
          backgroundColor: 'green',
          margin: '-1rem',
        }}
      >
        <div style={{ backgroundColor: 'red' }}>{story()}</div>
        <div style={{ backgroundColor: 'blue' }}>
          other content
          <br />
          other content
          <br />
          other content
          <br />
          other content
          <br />
          other content
          <br />
          other content
          <br />
          other content
          <br />
          other content
          <br />
          other content
        </div>
      </div>
    ),
  ],
} as Meta;

const Template: Story<PreviewImageProps> = (args) => <PreviewImage {...args}></PreviewImage>;

export const previewImage1 = Template.bind({});
previewImage1.args = {
  image: mockImages.image1,
};

export const previewImage2 = Template.bind({});
previewImage2.args = {
  image: mockImages.image2,
};

export const previewImage3 = Template.bind({});
previewImage3.args = {
  image: mockImages.image3,
};
