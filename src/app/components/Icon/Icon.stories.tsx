import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { colorKey } from '../../lib/colors';
import { COLORS } from '../../lib/colors';
import type { iconKey, IconProps } from './Icon';
import Icon, { ICONS } from './Icon';

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    icon: {
      options: Object.keys(ICONS),
      control: { type: 'select' },
    },
    color: {
      options: Object.keys(COLORS),
      control: { type: 'select' },
    },
    height: { control: { type: 'text' } },
    width: { control: { type: 'text' } },
  },
} as Meta;

export const allIcons = (args: IconProps): JSX.Element[][] =>
  Object.keys(ICONS).map((icon) =>
    Object.keys(COLORS).map((color) => (
      <Icon {...args} icon={icon as iconKey} color={color as colorKey} key={`${icon}${color}`} />
    ))
  );

const Template: Story<IconProps> = (args) => <Icon {...args} />;
export const specificIcon = Template.bind({});
specificIcon.args = {
  icon: 'search',
  color: 'primaryGradient',
  height: '1.5rem',
  width: '1.5rem',
} as IconProps;
