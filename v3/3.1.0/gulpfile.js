const {dest, watch} = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');

const transpilerTS = () => tsProject.src().pipe(tsProject()).js.pipe(dest('./src'));

exports.default = () => watch('./src/**/*.tsx', transpilerTS);