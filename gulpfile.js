const {src, dest, series, watch} = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('sass');
const gulpSass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlMin = require('gulp-htmlmin');
const svgSprite = require('gulp-svg-sprite');
const svgMin = require('gulp-svgmin');
const gulpIf = require('gulp-if');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const mainSass = gulpSass(sass);
const del = require('del');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');

let isProd = false; // dev by default

const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist/resources'))
}

const images = () => {
  return src([
      'src/img/**/*.jpg',
      'src/img/**/*.png',
      'src/img/*.svg',
      'src/img/**/*.jpeg'
    ])
    .pipe(dest('dist/img'))
};

const htmlInclude = () => {
  return src(['src/*.html'])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const styles = () => {
  return src('src/scss/**/*.scss', {
      sourcemaps: !isProd
    })
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(mainSass())
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(gulpIf(isProd, cleanCSS({
      level: 2
    })))
    .pipe(dest('dist/css', {
      sourcemaps: '.'
    }))
    .pipe(browserSync.stream());
};

const scripts = () => {
  src('src/js/vendor/**.js')
		.pipe(concat('vendor.js'))
		.pipe(dest('dist/js/'))
  return src([
    'src/js/scripts.js',
    'src/js/components/**.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

const configSvg = {
  mode: {
    symbol: {
      dest: '.',
      sprite: 'sprite.svg'
    }
  }
};

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(
      svgMin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite(configSvg))
    .pipe(dest('dist/img'));
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/scss/**/*.scss', styles);
watch('src/**/*.js', scripts);
watch('src/partials/*.html', htmlInclude);
watch('src/*.html', htmlInclude);
watch('src/resources/**', resources);
watch('src/img/**.{jpg,jpeg,png,svg}', images);
watch('src/img/**/**/**.{jpg,jpeg,png}');
watch('src/img/svg/**/*.svg', svgSprites);

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'));
}

const toProd = (done) => {
  isProd = true;
  done();
};


exports.default = series(clean, htmlInclude, scripts, styles, resources, images, svgSprites, watchFiles);
exports.build = series(toProd, clean, htmlInclude, scripts, styles, resources, images, svgSprites, htmlMinify);