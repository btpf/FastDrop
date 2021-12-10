import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import commonjs from '@rollup/plugin-commonjs';
import { defineConfig } from 'vite'
const path = require('path');
export default defineConfig({
    // build: {
    //     commonjsOptions: {
    //       transformMixedEsModules: true,
    //     },
    //   },
    // plugins: [
    //     viteCommonjs(),
    // ],

    build: {
        lib: {
          entry: path.resolve(__dirname, 'libfastdrop.js'),
          name: 'libfastdrop',
          fileName: (format) => `libfastdrop.${format}.js`
        },
        rollupOptions: {
          // make sure to externalize deps that shouldn't be bundled
          // into your library
          external: ['streamsaver','socket.io-client'],
          // output: {
          //   // Provide global variables to use in the UMD build
          //   // for externalized deps
          //   globals: {
          //     vue: 'Vue'
          //   }
          // }
        }
      }
    
      
})