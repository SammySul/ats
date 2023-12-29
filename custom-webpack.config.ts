import { Configuration } from 'webpack';
import { plugins } from 'webpack.plugins';

module.exports = {
  plugins,
  experiments: {
    topLevelAwait: true,
  },
  entry: {
    background: {
      import: 'src/background/worker.ts',
      runtime: false,
    },
  },
} as Configuration;
