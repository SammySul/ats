import * as fs from 'fs';
import * as path from 'path';
import { Compiler } from 'webpack';

export const plugins = [
  {
    apply: (compiler: Compiler) => {
      compiler.hooks.afterDone.tap('AfterDonePlugin', () => {
        const filePath = path.resolve(__dirname, 'src/manifest.json');
        const fileDest = path.resolve(__dirname, 'dist/manifest.json');
        const manifest = require(filePath);

        if (
          process.env['FIREFOX'] === 'true' &&
          !manifest?.browser_specific_settings?.gecko
        ) {
          manifest.background.scripts = [manifest.background.service_worker];
          delete manifest.background.service_worker;
          manifest.browser_specific_settings = {
            gecko: {
              id: '{ac34afe8-3a2e-4201-b745-346c0cf6ec7d}',
            },
          };
        }

        fs.writeFileSync(fileDest, JSON.stringify(manifest, null, 2), {
          encoding: 'utf-8',
          flag: 'w',
        });
      });
    },
  },
];
