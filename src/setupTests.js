import '@testing-library/jest-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { jestPreviewConfigure } from 'jest-preview';

import './assets/stylesheets/application.scss';
 
jestPreviewConfigure({
  autoPreview: true,
  sassLoadPaths: []
});

const localStorageMock = (function() {
  let store = {};

  return {
     getItem(key) {
         return store[key] || null;
     },
     setItem(key, value) {
         store[key] = value.toString();
     },
     clear() {
         store = {};
     }
  };
})();

module.exports = async function() { global.localStorage = localStorageMock };
