import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { ModalProps } from './Modal';
import Modal, { modalDefaultSize, MODAL_POSITIONS } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    position: {
      options: MODAL_POSITIONS,
      control: { type: 'select' },
    },
  },
  decorators: [
    (story) => (
      <div
        style={{
          background:
            'url(https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&h=1024&w=1280)',
          height: '100vh',
          margin: '-1rem',
        }}
      >
        {story()}
      </div>
    ),
  ],
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args}></Modal>;

export const modal = Template.bind({});
modal.args = {
  show: true,
  backgroundOverlay: true,
  backgroundBlur: false,
  size: modalDefaultSize,
  position: 'centered',
  closeButton: true,
  backButton: false,
  onClose: () => console.log('close me!'),
  children: `This is my modal with a lot of content.`.repeat(100),
};
