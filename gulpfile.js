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

//Function para compilar el code scss a css
function css(done){
    src('src/scss/**/**.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'))
    done();
}

//Function para utilizar el watch method
function dev(done){
    watch('src/scss/**/**.scss', css)
    done();
}

exports.css = css;
exports.dev = dev;