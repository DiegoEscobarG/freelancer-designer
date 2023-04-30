// Function para utilizar los methods de gulp
const { src, dest, watch} = require('gulp');
/*
Significados de los methods
src -> Ayuda a identificar archivos
dest -> Ayuda a almacenar lo que requiramos a un destino 
watch -> Esta al pendiente de cada cambio que se realiza 
*/

// Conexion entre GULP y SASS
// Referencia al method de SASS para compilar
const sass = require('gulp-sass')(require('sass'));

// Dependencia para no detener el workflow al obtener un error
const plumber = require('gulp-plumber');

//Dependencias para las funciones de las imgs
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//Function para compilar el code scss a css
function css(done){
    src('src/scss/**/**.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'))
    done();
}

//Function para que las imagenes sean ligeras con su formato original
function imgs(done){

    const options = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{jpg, png}')
        .pipe( cache(imagemin(options)) )
        .pipe(dest('build/img'))
    done();
}

//Function para que las imagenes sean ligeras con su formato webp
function imgsWebp(done){
    const options = {
        quality: 50
    }
    src('src/img/**/*.jpg')
    src('src/img/**/*.png')
        .pipe( webp(options) )
        .pipe(dest('build/img'))
    done();
}

//Function para que las imagenes sean ligeras con su formato avif
function imgsAvif(done){
    const options = {
        quality: 50
    }
    src('src/img/**/*.jpg')
    src('src/img/**/*.png')
        .pipe( avif(options) )
        .pipe(dest('build/img'))
    done();
}

//Function para utilizar el watch method
function dev(done){
    watch('src/scss/**/**.scss', css)
    done();
}

exports.css = css;
exports.imgs = imgs;
exports.imgsWebp = imgsWebp;
exports.imgsAvif = imgsAvif;
exports.dev = dev;