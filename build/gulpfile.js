const {src, dest, series, parallel} = require('gulp')
const watch = require('glob-watcher')
const webpack = require('webpack-stream')
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const del = require('del')
const named = require('vinyl-named')
const sourcemaps = require('gulp-sourcemaps');

function clean(){
    return del([
        './dist/scripts/**'
    ])
}

async function bsTask(){
    console.log('this is bs');
    return browserSync.init({
        proxy: "localhost:3000", 
        port: 3001
    })
}
async function nodemonTask(cb) {
        return nodemon( {
            script: '../bin/www', 
            ext: 'js html', 
            env: { 'NODE_ENV': 'development' }, 
            port: 3000, 
            done: cb()
        })//.once('start', cb);

};


function styles(){
    return src('../src/styles/**/*.css')
            .pipe(dest('dist/styles/'));
}
function games(){
    return src(['../src/scripts/comet.js',
                '../src/scripts/brawlbots/brawlbots.js'
               ])
            .pipe(sourcemaps.init())
            .pipe(named())
            .pipe(webpack({
                mode: 'development'
            }))
            .pipe(sourcemaps.write())
            .pipe(dest('dist/scripts/'));
}
function images(){
    return src(['../src/images/**/**'])
            .pipe(dest('dist/images/'))
}

const dev = series(
    clean, 
    games, 
    parallel(
        styles, 
        images
        )
    )

async function watcher(){
    watch( [ `../src/**/**/**`, `../views/**/*.pug`], ()=>{
        series(
            dev(),
            setTimeout(browserSync.reload,2000)
            )

    });
}


const run = series(dev, watcher, nodemonTask, bsTask);

module.exports = {dev, watcher, run}