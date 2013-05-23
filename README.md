Static Less & Coffeescript Grunt Project
========================================

A sample project that compiles less and coffeescript files as well as combining and minifying static files for release to production. This builds purely static flat files and is an easy way to make it nicer to build a static HTML page.

The main grunt tasks it uses are `grunt-contrib-less`, `grunt-contrib-coffee`, and `grunt-usemin`.


### Installation

Install [nodejs and npm](http://nodejs.org/download/) (they come together), then [install grunt-cli](http://gruntjs.com/getting-started).

Then just run `npm install` in the root directory of this project.

### Usage

Auto-compile `.less` and `.coffee` files from the `src/less/` and `src/coffee` folders (and place the results in `src/css/` and `src/js/`).

    grunt watch

Build the project, compile `.less` and `.coffee` files, run jshint, and combine any static assets that are specified in `build` HTML comments (see examples in src/index.html).

    grunt
