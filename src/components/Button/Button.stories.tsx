import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import * as React from 'react';
import Button from './Button';

storiesOf('Button', module)
  .add('primary', () => <Button onClick={() => { }} buttonType="standard" buttonText={text('buttonText', 'Random Button')} />);