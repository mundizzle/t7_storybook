import { configure, addParameters, addDecorator } from "@storybook/react";
import { withCssResources } from "@storybook/addon-cssresources";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";

import Theme7 from "./theme7.theme";

const cssReq = require.context("!!raw-loader!../src", true, /.\.css$/);
const cssTokenFiles = cssReq
  .keys()
  .map(filename => ({ filename, content: cssReq(filename).default }));

addDecorator(withCssResources);
addDecorator(withA11y);
addDecorator(withKnobs);

addParameters({
  designToken: {
    files: {
      css: cssTokenFiles
    }
  },
  options: {
    showRoots: true,
    theme: Theme7
  },
  cssresources: [
    {
      id: `bluetheme`,
      code: `<style>body { background-color: lightblue; }</style>`,
      picked: false
    }
  ]
});

// automatically import all files ending in *.stories.js
configure(require.context("../src/stories", true, /\.stories\.mdx$/), module);
