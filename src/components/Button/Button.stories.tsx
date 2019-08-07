import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '../';

storiesOf('Button', module)
  .add('primary', () => <Button buttonText="Schedule" />)
  .add('secondary', () => <Button buttonText="Schedule" secondary />);