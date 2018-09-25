let gulp = require("gulp");
let clean = require("gulp-clean");
let less = require("gulp-less");
let cssmin = require("gulp-cssmin");
let rename = require("gulp-rename");
let htmlmin = require("gulp-htmlmin");
let jsmin = require("gulp-uglify");
let concat = require("gulp-concat");

let app = {
	src: "src/less/bootstrap.less",
	dist: "dist/src/css"
}

let clean_resource = function() {
	gulp.src("dist")
		.pipe(clean());
};

gulp.task("clean", clean_resource);

gulp.task("default", function() {
	gulp.src(app.src)
		.pipe(less())
		.pipe(cssmin())
		.pipe(rename("boostrap.min.css"))
		.pipe(gulp.dest(app.dist));
	
	gulp.src("src/*.htm")
		.pipe(htmlmin({
	        removeComments: true,		// 清除注释
	        collapseWhitespace: true	// 清除空白字符
		}))
		.pipe(gulp.dest("dist/src"));
	
	/*
	gulp.src("src/*.js")
		.pipe(jsmin())
		//.pipe(rename({suffix: ".min"}))
		.pipe(rename(function (target) {		// target就是每次重命名的文件名对象
			//console.log(target);
			target.extname = ".min" + target.extname;
		}))
		.pipe(gulp.dest("dist/src"));
	*/
	gulp.src("src/*.js")
		.pipe(concat("all.min.js"))			// 合并同时重命名
		.pipe(jsmin())
		.pipe(gulp.dest("dist/src"));
	
});





