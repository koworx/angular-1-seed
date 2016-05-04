var cfg = require('./gulpcfg')();
var args = require('yargs').argv;
var del = require('del');
var vip = require('vinyl-paths');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy:true});
var sync = require('browser-sync');

gulp.task('bump', function() {
    var message = 'Bumping version ';
    var version = args.version;
    var type = args.type;
    var options = {};

    if (version) {
        message += 'to ' + version;
        options.version = version;
    } else {
        message += 'for a ' + type;
        options.type = type;
    }

    log(message, $.util.colors.green);

    return gulp
        .src(cfg.prjConf)
        .pipe($.bump(options))
        .pipe(gulp.dest(cfg.prjDir))
});

gulp.task('cleanCss', function(done) {
    log('Cleaning ' + cfg.cssDst + '*', $.util.colors.green);
    clean(cfg.cssDst + '*', done);
});

gulp.task('cleanFnt', function(done) {
    log('Cleaning ' + cfg.fntDst + '*', $.util.colors.green);
    clean(cfg.fntDst + '*', done);
});

gulp.task('cleanImg', function(done) {
    log('Cleaning ' + cfg.imgDst + '*', $.util.colors.green);
    clean(cfg.imgDst + '*', done);
});

gulp.task('cleanJs', function(done) {
    log('Cleaning ' + cfg.codeDst + '*', $.util.colors.green);
    clean(cfg.codeDst + '*', done);
});

gulp.task('cleanIdx', function(done) {
    log('Cleaning ' + cfg.idxInj + '*', $.util.colors.green);
    clean(cfg.idxInj + '*', done);
});

gulp.task('cleanBld', function(done) {
    log('Cleaning ' + cfg.bldDst + '*', $.util.colors.green);
    clean(cfg.bldDst + '*', done);
});

gulp.task('checkCode', function() {
    log('Checking source code', $.util.colors.green);

    return gulp
        .src(cfg.codeSrc)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('compileTmpl', function() {
    log('Compiling Angular HTML templates', $.util.colors.green);

    return gulp
        .src(cfg.tmplSrc)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(cfg.tmplCache.file, cfg.tmplCache.options))
        .pipe(gulp.dest(cfg.tmplDst));
});

gulp.task('copyLocalCss', function() {
    log('Copying local CSS stylesheets', $.util.colors.green);

    return gulp
        .src(cfg.cssSrc)
        .pipe(gulp.dest(cfg.cssDst));
});

gulp.task('compileLess', function() {
    log('Compiling LESS stylesheets', $.util.colors.green);

    return gulp
        .src(cfg.lessSrc)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.plumber())
        .pipe($.less())
        //.on('error', logError)
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe($.rev())
        .pipe(gulp.dest(cfg.lessDst));
});

gulp.task('copyFnt', function() {
    log('Copying fonts', $.util.colors.green);

    return gulp
        .src(cfg.fntSrc)
        .pipe(gulp.dest(cfg.fntDst));
});

gulp.task('copyImg', function() {
    log('Copying images', $.util.colors.green);

    return gulp
        .src(cfg.imgSrc)
        .pipe(gulp.dest(cfg.imgDst));
});

gulp.task('prepareCss', gulp.series('cleanCss', 'copyLocalCss', 'compileLess'));

gulp.task('prepareFnt', gulp.series('cleanFnt', 'copyFnt'));

gulp.task('prepareImg', gulp.series('cleanImg', 'copyImg'));

gulp.task('prepareJs', gulp.series('cleanJs', 'compileTmpl'));

gulp.task('prepareAll', gulp.parallel('cleanIdx', 'prepareCss', 'prepareFnt', 'prepareImg', 'prepareJs'));

gulp.task('injectRef', gulp.series('prepareAll', function() {
    var wiredep = require('wiredep').stream;
    var rootIdx = args._[0].toLowerCase().indexOf('prod') === 0 ? 0 : 4;

    log('Injecting source code and stylesheet references', $.util.colors.green);
    console.log('Args: %j', args._[0]);
    return gulp
        .src(cfg.idxSrc)
        .pipe(wiredep(cfg.wiredep()))
        .pipe($.inject(gulp.src(cfg.codeSrc, {read: false})))
        .pipe($.inject(gulp.src(cfg.cssInj, {read: false}), {
            transform: function (filepath) {
                return '<link rel="stylesheet" type="text/css" href="' + filepath.substring(rootIdx) + '">';
            }
        }))
        .pipe($.inject(gulp.src(cfg.tmplDst + cfg.tmplCache.file, {read: false}), {
            starttag: '<!-- inject:tmpl -->',
            transform: function (filepath) {
                return '<script src="' + filepath.substring(rootIdx) + '"></script>';
            }
        }))
        .pipe(gulp.dest(cfg.bldDst));
}));

gulp.task('prodPack', gulp.series('injectRef', function() {
    var assets = $.useref.assets();
    var cssFilter = $.filter('**/*.css');
    var jsFilter = $.filter('**/*.js');

    log('Optimizing source code, stylesheets and html', $.util.colors.green);

    var cssTemp = gulp.src(cfg.cssInj);
    var codeTemp = gulp.src(cfg.codeInj);
    
    var stream = gulp
        .src(cfg.idxInj)
        .pipe($.plumber())
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest(cfg.bldDst))
        .on('end', function() {
            log('Cleaning temporary files', $.util.colors.green);
            cssTemp.pipe(vip(del));
            codeTemp.pipe(vip(del));
        });
    
    return stream;
}));

gulp.task('dev', gulp.series('injectRef', function() {
    serve(true);
}));

gulp.task('prod', gulp.series('prodPack', function() {
    serve(false);
}));

/* helper functions */

function serve(isDev) {
    var debug = args.debug || args.debugBrk;
    var debugMode = args.debug ? '--debug' : args.debugBrk ? '--debug-brk' : '';
    var nodeOptions = cfg.node(isDev);

    if (debug) {
        runNodeInspector();
        nodeOptions.nodeArgs = [debugMode + '=5858'];
    }

    if (args.verbose) {
        console.log(nodeOptions);
    }

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('*** nodemon restarted');
            setTimeout(function() {
                sync.notify('reloading now ...');
                sync.reload({stream: false});
            }, cfg.rldDelay);
        })
        .on('start', function () {
            log('*** nodemon started');
            startBrowserSync(isDev);
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
}

function runNodeInspector() {
    log('Running node-inspector.');
    log('Browse to http://localhost:8080/debug?port=5858');
    var exec = require('child_process').exec;
    exec('node-inspector');
}

function startBrowserSync(isDev) {
    if (sync.active) {
        return;
    }

    log('Starting BrowserSync on port ' + cfg.srvPort);
    sync.init(cfg.sync());

    watch(isDev);
}

function clean(path, callback) {
    del(path, callback);
}

function watch(isDev) {
    var files = [cfg.lessSrc, cfg.cssSrc, cfg.idxSrc, cfg.tmplSrc];
    var action = (isDev) ? gulp.series('injectRef') : gulp.series('prodPack');
    log('Watching ' + files, $.util.colors.green);
    gulp.watch(files, action).on('change', changeEvent);
}

function changeEvent(event) {
    log('File changes at ' + event, $.util.colors.blue);
}

function logError(error) {
    log(error, $.util.colors.yellow);
    this.emit('end');
}

function log(message, style) {
    var logStyle = style || $.util.colors.white;
    if (typeof(message) === 'object') {
        for (var item in message) {
            if (message.hasOwnProperty(item)) {
                $.util.log(logStyle(item + ': ' + message[item]))
            }
        }
    } else {
        $.util.log(logStyle(message));
    }
}
