const gulp = require("gulp");
const {
	parallel,
	series
} = require("gulp");

const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const browserSync = require("browser-sync").create();
const nunjucksRender = require("gulp-nunjucks-render");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");

// /*
// TOP LEVEL FUNCTIONS
//     gulp.task = Define tasks
//     gulp.src = Point to files to use
//     gulp.dest = Points to the folder to output
//     gulp.watch = Watch files and folders for changes
// */

// Libs
function concatJs(cb) {
	gulp
		.src([
			"node_modules/jquery/dist/jquery.min.js",
			"node_modules/@popperjs/core/dist/umd/popper.min.js",
			"node_modules/bootstrap/dist/js/bootstrap.min.js",
			"node_modules/slick-slider/slick/slick.min.js"
		])
		.pipe(concat("core.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
	cb();
}

function concatCss(cb) {
	gulp
		.src([
			"node_modules/bootstrap/dist/css/bootstrap.min.css",
			"node_modules/slick-slider/slick/slick.css",
			"node_modules/slick-slider/slick/slick-theme.css"
		])
		.pipe(concat("core.css"))
		// @ts-ignore
		.pipe(cssmin())
		// @ts-ignore
		.pipe(gulp.dest("dist/css"));
	cb();
}

// Fonts
function fonts(cb) {
	gulp.src("src/assets/fonts/**/*").pipe(gulp.dest("dist/css/fonts"));
	cb();
}

// Gif
function imageGif(cb) {
	gulp.src("src/assets/img/*.gif").pipe(gulp.dest("dist/css"));
	cb();
}

// Optimise Images
function imageMin(cb) {
	gulp.src("src/assets/img/**/*").pipe(gulp.dest("dist/img"));
	cb();
}

// // Copy all HTML files to Dist
// function copyHTML(cb) {
// 	gulp.src("src/*.html").pipe(gulp.dest("dist"));
// 	cb();
// }

// // Minify HTML
// function minifyHTML(cb) {
// 	gulp
// 		.src("src/*.html")
// 		.pipe(gulp.dest("dist"))
// 		.pipe(
// 			htmlmin({
// 				collapseWhitespace: true,
// 			})
// 		)
// 		.pipe(gulp.dest("dist"));
// 	cb();
// }

// Scripts
function js(cb) {
	gulp
		.src("src/assets/js/*js")
		.pipe(
			babel({
				presets: ["@babel/preset-env"],
			})
		)
		//.pipe(concat("scripts.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
	cb();
}

// Compile Sass
function css(cb) {
	gulp
		.src("src/assets/scss/*.scss")
		.pipe(sass({
			outputStyle: "compressed"
		}).on("error", sass.logError))
		.pipe(
			autoprefixer({
				// @ts-ignore
				browserlist: ["last 2 versions"],
				cascade: false,
			})
		)
		.pipe(gulp.dest("dist/css"))
		// Stream changes to all browsers
		.pipe(browserSync.stream());
	cb();
}

// Process Nunjucks
function nunjucks(cb) {
	gulp
		.src("src/pages/*.html")
		.pipe(
			nunjucksRender({
				path: ["src/templates/"], // String or Array
			})
		)
		.pipe(gulp.dest("dist"));
	cb();
}

function nunjucksMinify(cb) {
	gulp
		.src("src/pages/*.html")
		.pipe(
			nunjucksRender({
				path: ["src/templates/"], // String or Array
			})
		)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
			})
		)
		.pipe(gulp.dest("dist"));
	cb();
}

// Watch Files
function watch_files() {
	browserSync.init({
		server: {
			baseDir: "dist/",
		},
	});
	gulp.watch("src/assets/scss/**/*.scss", css);
	gulp.watch("src/assets/js/*.js", js).on("change", browserSync.reload);
	gulp.watch("src/pages/*.html", nunjucks).on("change", browserSync.reload);
	gulp.watch("src/templates/*.html", nunjucks).on("change", browserSync.reload);
}

// Default 'gulp' command with start local server and watch files for changes.
exports.default = series(
	nunjucks,
	concatJs,
	concatCss,
	css,
	js,
	imageGif,
	imageMin,
	fonts,
	watch_files
);

// 'gulp build' will build all assets but not run on a local server.
exports.build = parallel(
	nunjucksMinify,
	concatJs,
	concatCss,
	css,
	js,
	fonts,
	imageGif,
	imageMin
);