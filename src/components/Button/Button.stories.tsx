import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import * as React from 'react';
import Button from './Button';

storiesOf('Button', module)
  .add('primary', () =>
    <Button
      buttonText={text('buttonText', 'Random Button')}
      showLoader={boolean('showLoader', false)}
      bordered={boolean('bordered', false)}
      inverted={boolean('inverted', false)}
      ripple={boolean('ripple', false)}
      disabled={boolean('disabled', false)} />
  )
  .add('round', () =>
    <Button
      buttonText={text('buttonText', '😊')}
      showLoader={boolean('showLoader', false)}
      bordered={boolean('bordered', false)}
      inverted={boolean('inverted', false)}
      ripple={boolean('ripple', false)}
      disabled={boolean('disabled', false)}
      shape="round" />
  );
