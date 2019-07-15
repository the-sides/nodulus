const {src, dest, series, watch} = require('gulp')
const webpack = require('webpack-stream')

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

function watcher(cb){
    dev();
    watch(
        [
          `../src/**/*.js`,
        ],
        dev()
    );
    cb();
}


module.exports = {dev, watcher}