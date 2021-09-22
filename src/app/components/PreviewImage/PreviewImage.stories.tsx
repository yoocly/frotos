import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { PreviewImageProps } from './PreviewImage';
import PreviewImage from './PreviewImage';
import { mockImages } from '../../lib/mockImages';

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
  image: mockImages.results[0],
};

export const previewImage2 = Template.bind({});
previewImage2.args = {
  image: mockImages.results[1],
};

export const previewImage3 = Template.bind({});
previewImage3.args = {
  image: mockImages.results[2],
};
