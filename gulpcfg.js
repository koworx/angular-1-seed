module.exports = function() {
    var devDir = './dev/';
    var srcDir = devDir + 'src/';
    var resDir = devDir + 'res/';
    var cssDir = resDir + 'css/';
    var lessDir = resDir + 'less/';
    var fntDir = resDir + 'fnt/';
    var imgDir = resDir + 'img/';
    var bldDir = './bld/';
    var cssDst = bldDir + 'css/';
    var fntDst = bldDir + 'fnt/';
    var imgDst = bldDir + 'img/';
    var jsDst = bldDir + 'js/';

    var cfg = {
        prjConf: [
            './package.json',
            './bower.json'
        ],
        prjDir: './',
        srvFile: './server.js',
        srvHost: 'localhost',
        srvPort: 888,
        rldDelay: 100,
        idxSrc: devDir + './index.html',
        idxInj: bldDir + './index.html',
        bldDst: bldDir,
        tmplSrc: [
            srcDir + '**/*.html'
        ],
        tmplDst: jsDst,
        codeInj: [
            jsDst + '**/*.js'
        ],
        codeSrc: [
            srcDir + '**/module.js',
            srcDir + '**/*.js',
            '!' + srcDir + '**/*.spec.js'
        ],
        codeDst: jsDst,
        codeInj: [
            jsDst + '**/*.js'
        ],
        lessSrc: [
            lessDir + '**/*.less'
        ],
        lessDst: cssDst,
        cssSrc: [
            cssDir + '**/*.css'
        ],
        cssDst: cssDst,
        cssInj: [
            cssDst + '**/*.css'
        ],
        fntSrc: [
            fntDir + '**/*'
        ],
        fntDst: fntDst,
        imgSrc: [
            imgDir + '**/*'
        ],
        imgDst: imgDst,
        bower: {
            json: require('./bower.json'),
            directory: './lib',
            ignorePath: '../..'
        },
        tmplCache: {
            file: 'templates.js',
            options: {
                module: 'kx.seed',
                standAlone: false,
                root: ''
            }
        },
        node: function(isDev) {
            return {
                script: cfg.srvFile,
                delayTime: 1,
                env: {
                    'PORT': cfg.srvPort,
                    'NODE_ENV': isDev ? 'development' : 'production'
                }
            };
        },
        sync: function() {
            return {
                proxy: cfg.srvHost + ':' + cfg.srvPort,
                port: 3333,
                files: [
                    srcDir + '**/*.js',
                    cssDst + '**/*.css',
                    bldDir + 'index.html'
                ],
                browser: ["google chrome", "iexplore", "firefox"],
                ghostMode: {
                    clicks: true,
                    location: false,
                    forms: true,
                    scroll: true
                },
                injectChanges: true,
                logFileChanges: true,
                logLevel: 'debug',
                logPrefix: 'SYNC',
                notify: true,
                reloadDelay: cfg.rldDelay
            };
        },
        wiredep: function(isDev) {
            return {
                bowerJson: cfg.bower.json,
                directory: cfg.bower.directory,
                ignorePath: cfg.bower.ignorePath,
                fileTypes: {
                    html: {
                        replace: {
                            js: function(filePath) {
                                return '<script src="' + filePath.replace(/(^\.+)/g, "") + '"></script>';
                            },
                            css: function(filePath) {
                                return '<link rel="stylesheet" href="' + filePath.replace(/(^\.+)/g, "") + '"/>';
                            }
                        }
                    }
                }
            };
        }
    };

    return cfg;
};