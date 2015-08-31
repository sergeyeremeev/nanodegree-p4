# Website Performance Optimization portfolio project

## Welcome to this project
**In order to successfully run this project you have to:**
1. First download zip and unpack it into any directory, or copy via git clone;
2. If you want to be able to run gulp tasks, you have to install required npm packages via `npm intall` command from terminal while in the root directory of this project;
3. To create a server and automatically open index.html either run `gulp serve` command from terminal or manually navigate to ./build/ folder and open index.html in your browser;
4. Enjoy the performance.

###Following is a list of optimizations made to ensure a good score on PageSpeed insights for index.html and 60+ fps for pizza.html
1. PageSpeed optimizations
  - add `async` to script tags in `head` element that didn't have it, to run them asynchronously and prevent render blocking;
  - add `media="print"` to print stylesheet, to prevent render blocking when it's not in fact needed;
  - remove style.css, as it will be inlined by gulp later;
  - remove web fonts link and instead load them asynchronously via javascript at the bottom of the page (before closing `</body>` tag), the script is taken from - [https://github.com/typekit/webfontloader](https://github.com/typekit/webfontloader);
  - create a separate pizzeria image with correct dimensions to avoid unnecessary image loading time;
  - compress images, minify scripts, styles and html via gulp;
  - style.css is completely inlined and print stylesheet is loaded via script with the help of ['critical' package](https://github.com/addyosmani/critical) by Addy Osmany.
2. Frames per Second optimizations
  - create different images for moving pizzas (small) and pizzas from menu, to avoid using bigger images when not needed;
  - optimize image sizes with gulp;
  - minify styles, scripts and html with gulp;
  - calculate amount of pizza images needed depending on screen size instead of using 200;
  - create document fragment and append it to the dom after injecting all images into it, instead of appending each image individually;
  - create allPizzas variable outside of updatePositions function, to avoid unnecessary code on each scroll;
  - calculate phase for each moving pizza outside of the loop where they get assigned style. This helps to calculate only 5 phases and reduces unnecessary calculations inside loops;
  - use `style.transform` instead of `style.left` to trigger only composite and not paint;
  - add `will-change: transform` and `backface-visibility: hidden` (for browsers that don't support `will-change` yet), to promote moving pizzas to their own layers to avoid repainting entire page;
  - use requestAnimationFrame on scroll for better optimisation;
  - rework changePizzaSizes function to eliminate unnecessary dx calls, simplify loop by taking out pizzaContainers declaration, use percentage instead of pixels for simpler code;
  - overall use more specific queries, such as `getElementById` or `getElementsByClassName` instead of `querySelectorAll` for better performance.

**Gulp Tasks:**
  - `gulp` - cleans build folder then builds an entire build folder from dev code;
  - `gulp clean` - delete everything in build folder;
  - `gulp serve` - creates a server, automatically opens production code in a new tab and watches for changes in html, css and js files in dev folder;
  - `gulp scripts` - minifies javascript files from dev folder into build;
  - `gulp styles` - minifies css files from dev folder into build;
  - `gulp html` - minifies html files from dev folder into build;
  - `gulp html-critical` - minifies html files from dev folder into build, then detects critical css and outputs it as inline minified styles into minified html files in build folder;
  - `gulp images` - optimizes images from dev folder and outputs them into build;

**Materials used during research for this project:**
 - good javascript practices: [http://ilikekillnerds.com/2015/02/stop-writing-slow-javascript/](http://ilikekillnerds.com/2015/02/stop-writing-slow-javascript/);
 - gulp setup and examples: [https://markgoodyear.com/2014/01/getting-started-with-gulp/](https://markgoodyear.com/2014/01/getting-started-with-gulp/) and [https://discussions.udacity.com/t/gulp-and-setting-up-a-gulp-workflow-intermediate/24359/3](https://discussions.udacity.com/t/gulp-and-setting-up-a-gulp-workflow-intermediate/24359/3);
 - gulp and browsersync: [http://www.browsersync.io/docs/gulp/](http://www.browsersync.io/docs/gulp/);
 - web font loader: [https://github.com/typekit/webfontloader](https://github.com/typekit/webfontloader);
 - critical css plugin: [https://github.com/addyosmani/critical](https://github.com/addyosmani/critical);
 - optimising css delivery: [https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery);
