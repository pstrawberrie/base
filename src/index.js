/**
 * App Entry
 */

import './public/less/main.less';
import { greet } from './util/helpers';

document.addEventListener('DOMContentLoaded', function() {
  greet();
});