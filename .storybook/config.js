import { addParameters, configure } from '@storybook/react';

addParameters({
  options: {
    theme: {
      brandTitle: 'react-fiber-worker',
      brandUrl: 'https://github.com/yiminghe/react-fiber-worker/',
    }
  }
});

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
