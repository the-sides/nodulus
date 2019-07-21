const {src, dest, series, parallel} = require('gulp')
const watch = require('glob-watcher')
const webpack = require('webpack-stream')
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

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
function cometGame(){
    return src('../src/scripts/comet.js')
            .pipe(webpack(require('./webpack.config')))
            .pipe(dest('dist/scripts/'));
}
function brawlGame(){
    return src('../src/scripts/brawlbots/brawlbots.js')
            .pipe(webpack(require('./webpack.config')))
            .pipe(dest('dist/scripts/'));
} 

const dev = series(cometGame, styles)

async function watcher(){
    // dev();
    watch( [ `../src/**/**`, `../views/**/*.pug`], ()=>{
        series(
            // dev(),
            cometGame(), 
            styles(),
            browserSync.reload() )

    });
}

// const run = series(nodemonTask, bsTask, watcher);

const run = series(watcher, nodemonTask, bsTask);
// async function run(){ return series(nodemonTask, bsTask, watcher) }
// const run = parallel(bsTask, nodemonTask);
// const run = () => {nodemonTask(bsTask)}//series(bsTask, nodemonTask);

module.exports = {dev, watcher, run}