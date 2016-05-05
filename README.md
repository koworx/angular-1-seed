# Angular Project Seed

This repository provides a standard AngularJS project structure, dependencies and Gulp development workflow

Please read the [Gulp Workflow](#gulp-workflow) section to get more details about the pre-configured Gulp tasks

## Getting Started

To get you started you have to install prerequisites, clone the angular-1-seed repository and install the dependencies

### Prerequisites

You need git to clone the angular-seed repository. You can get git from
[http://git-scm.com/][git]

The development workflow uses a number of node.js tools, and therefore you must have node.js and
its package manager (npm) installed. You can get them from [http://nodejs.org/][node]

The client side libraries are managed by [bower][bower]. You can install it by running the command below

```
npm install -g bower
```

### Clone repository

Clone the angular-1-seed repository using [git][git]:

```bash
git clone https://github.com/koworx/angular-1-seed.git
cd angular-1-seed
```

If you just want to start a new project without the commit history then you can do:

```bash
git clone --depth=1 https://github.com/koworx/angular-1-seed.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

There are two kinds of dependencies in this project: development tools and client side libraries.

* The development tools are installed to `node_modules` folder using `npm`, the [node package manager][npm]
* The client side libraries are installed to `lib` folder using `bower`, a [client-side code package manager][bower]

*Note that the `bower_components` folder would be normally used, but we changed this location to `lib` through the `.bowerrc` file*

#### Development Tools

The development workflow is implemented using a streaming build system called Gulp, and its CLI will need to be installed globally. Since we use Gulp version 4.0, the installation has to specify the Git branch with this version

```bash
npm install git://github.com/gulpjs/gulp-cli#4.0 --global
```

The rest of the gulp tools, and other development tools will be restored by the following `npm` command

```bash
npm install
```

There might be some warnings during the installation process as shown below

 > npm WARN install Couldn't install optional dependency: Unsupported

In this case `npm` indicated that it could not install some platform specific dependency and ignored it

 > npm WARN deprecated graceful-fs@3.0.8: graceful-fs v3.0.0 and before will fail on node releases >= v6.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.

In this case `npm` suggests that some referenced library is deprecated, but it is meant mostly for library authors.

As far as you see no errors, only warnings, the npm restore should be all right

#### Client Side Libraries

The pre-defined client side libraries will be restored in a similar way using `bower`

```bash
bower install
```

### Run the Application

The simplest way to start the application in development mode is:

```bash
gulp dev
```
The simplest way to start the application in production mode is:

```bash
gulp prod
```

In both cases it will start the development server and open pre-configured browsers with the app at `http://localhost:3333`.

## Directory Layout

Please find an overview of the project folder structure below.

*Note that some folders are not versioned, and will be created automatically later during the build process*

```
 ├ bld - folder automatically created by gulp and containing the current application build
 │ ├ css - contains precompiled and concatenated less and css files
 │ ├ fnt - contains required font files
 │ ├ img - contains required image files
 │ └ js - contains optimized JavaScript files
 ├ dev - folder containing the application source code and resources - please add new (re)sources only to this folder and Gulp will take care of the rest
 │ ├ res - contains all development resource files
 │ │ ├ css - please add your application css files HERE
 │ │ ├ fnt - please add your application font files HERE
 │ │ ├ img - please add your application image files HERE
 │ │ └ less - please add your application less files HERE
 │ └ src - contains all development source code files
 │   ├ app - contains JavaScript application code
 │   │ ├ xxx - contains feature xxx code
 │   │ │ ├ svc - contains xxx services code
 │   │ │ └ ui - contains xxx controllers and views code
 │   │ └ yyy - contains feature yyy code
 │   │   ├ svc - contains yyy services code
 │   │   └ ui - contains yyy controllers and views code
 │   └ ux - contains application layout and ux code
 ├ lib - automatically created and managed by Bower - please do not modify by hand
 └ node_modules - automatically created and managed by NPM - please do not modify by hand
```

## <a name="gulp-workflow"></a>Gulp Workflow

Please find a brief description of the available Gulp tasks, used plugins, and placeholders below

### Gulp Tasks

```
 - cleanCss - removes all css files from the /bld/css folder
 - cleanFnt - removes all font files from the /bld/fnt folder
 - cleanImg - removes all image files from the /bld/img folder
 - cleanJs - removes all js files from the /bld/js folder
 - clean - removes all files from the /bld folder
 - checkCode - validates the JavaScript code with JSHint using the rules defined in .jshintrc
 - compileTmpl - enumerates all AngularJS html view templates and concatenate them into a JavaScript file placed in /bld/js
 - copyLocalCss - copies all application css files from /dev/res/css to /bld/css
 - compileLess - processes all application less files and places the resulting css into /bld/css
 - copyFnt - copies all application font files into /bld/fnt
 - copyImg - copies all application image files into /bld/img
 - injectRef - enumerates all JavaScript files and injects their references into the /bld/index.html file
 - prodPack - optimizes and packages application for production release
 - dev - executes injectRef, starts server and opens configured browsers using browsersync
 - prod - executes prodPack, starts server and opens configured browsers using browsersync

```

### Used Plugins

* `browser-sync` - starts pre-configured browsers, and uses WebSockets to load code and content from server and also to sync individual browser instances
* `del` - deletes files/folders using globs
* `gulp-angular-templatecache` - concatenates and registers AngularJS templates in the $templateCache
* `gulp-autoprefixer` - parses css and adds vendor prefixes to css rules using values from the <caniuse.com> website
* `gulp-bump` - bumps npm versions
* `gulp-csso` - minifies css files with CSSO
* `gulp-filter` - filters files in a vinyl stream
* `gulp-if` - allows to run tasks conditionally
* `gulp-imagemin` - minifies png, jpeg, gof and svg images
* `gulp-inject` - injects source file references into the placeholders in the index.html file
* `gulp-jscs` - checks JavaScript code style with jscs based on the settings in .jscsrc
* `gulp-jshint` - performs JavaScript code static analysis based on the settings in .jshintrc
* `gulp-less` - compiles less files into css
* `gulp-load-plugins` - automatically loads useful gulp plugins
* `gulp-minify-html` - minifies html files with minimize
* `gulp-ng-annotate` - adds angularjs dependency injection annotations with ng-annotate
* `gulp-nodemon` - controls the node server to support the development workflow
* `gulp-plumber` - prevents pipe breaking caused by errors from gulp plugins
* `gulp-print` - prints names of files to the console so we can see what's going through the gulp pipe
* `gulp-rev` - provides static asset revisioning by appending content hash to file names
* `gulp-rev-replace` - rewrites occurences of file names which have been renamed by gulp-rev
* `gulp-task-listing` - adds the ability to provide a task listing for the given gulpfile
* `gulp-uglify` - minifies files with UglifyJS
* `gulp-useref` - parses build blocks in index.html to replace references to non-optimized scripts or stylesheets with concatenated/optimized versions
* `gulp-util` - provides utility functions for gulp plugins
* `jshint-stylish` - provides stylish reporter for JSHint
* `merge-stream` - creates a stream that emits events from multiple other streams
* `vinyl-paths` - gets the file paths in a vinyl stream
* `wiredep` - wires Bower dependencies to the placeholders in the index.html file
* `yargs` - parses and provides input arguments

### index.html Placeholders

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">

    <!-- bower:css --> ### wiredep insertion point for all css files found in the bower client side libraries
    <!-- endbower -->  ### wiredep insertion point end

    <!-- build:css(./.) /css/styles.css --> ### useref css assets block which will be concatenated into a single css file
    <!-- inject:css -->                     ###   inject insertion point for all custom css files
    <!-- endinject -->                      ###   inject insertion point end
    <!-- endbuild -->                       ### useref css assets block end
</head>

<body data-ng-app="kx.demo">
    <div id="page" class="page">
        <div id="chrome" data-ng-include="'ux/chrome.html'"></div>
        <div id="workspace">
            <div id="header" data-ng-include="'ux/header.html'"></div>
            <div id="content">
                <div id="sidenav" data-ng-include="'ux/sidenav.html'" data-ng-show="false"></div>
                <div id="contentBox" aria-live="polite" aria-relevant="all">
                    <div id="shell" data-ng-include="'ux/shell.html'"></div>
                </div>
            </div>
        </div>
        <div data-ng-include="'ux/busy.html'"></div>
    </div>

    <!-- bower:js -->  ### wiredep insertion point for all js files found in the bower client side libraries
    <!-- endbower -->  ### wiredep insertion point end

    <script src="/lib/koworx/kx.fwk-84b67b11.js"></script>

    <!-- build:js(./.) /js/app.js --> ### useref js assets block which will be concatenated into a single js file
    <!-- inject:js -->                ###   inject insertion point for all custom js files
    <!-- endinject -->                ###   inject insertion point end
    <!-- inject:tmpl -->              ###   angular template cache insertion point
    <!-- endinject -->                ###   angular template cache insertion point end
    <!-- endbuild -->                 ### useref js assets block end

</body>

</html>
```
[git]: (http://git-scm.com)
[bower]: (http://bower.io)
[npm]: (https://www.npmjs.org)
[node]: (http://nodejs.org)
