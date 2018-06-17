/**
 * App Entry
 */

import './public/scss/main.less';
import { wussup } from './util/helpers';

document.addEventListener('DOMContentLoaded', function() {
  console.warn('wtf');
  wussup();
  var ele = document.createElement('div');
  ele.className = 'testing';
  document.appendChild(ele);
});