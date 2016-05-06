# List of badges available

# [Travis](http://travis-ci.org/)

1. Travis Build Status  
[![Travis](https://img.shields.io/travis/tanhauhau/generator-badge.svg?)]()  
Name: `travis` or `travis-default`  
Field: `repo-username`, `repo-name`  

2. Travis Branch Build Status  
[![Travis](https://img.shields.io/travis/tanhauhau/generator-badge/master.svg?)]()  
Name: `travis-branch`  
Field: `repo-username`, `repo-name`, `repo-branch`  

# [npm](http://npmjs.com/)

1. npm version number  
[![npm version](https://img.shields.io/npm/v/generator-badge.svg)](https://www.npmjs.com/package/generator-badge)  
Name: `npm-version`  
Field: `name`  

2. npm license  
[![npm license](https://img.shields.io/npm/l/generator-badge.svg)](https://www.npmjs.com/package/generator-badge)  
Name: `npm-license`  
Field: `name`  

3. npm downloads per month  
[![npm download](https://img.shields.io/npm/dm/generator-badge.svg)](https://www.npmjs.com/package/generator-badge)  
Name: `npm-download-month`  
Field: `name`  

4. npm total downloads  
[![npm download](https://img.shields.io/npm/dt/generator-badge.svg)](https://www.npmjs.com/package/generator-badge)  
Name: `npm-download-total`  
Field: `name`  

# [apm](https://atom.io/packages)

1. apm version number  
[![apm version](https://img.shields.io/apm/v/vim-mode.svg)]()  
Name: `apm-version`  
Field: `name`  

2. apm license  
[![apm license](https://img.shields.io/apm/l/vim-mode.svg)]()  
Name: `apm-license`  
Field: `name`  

3. apm downloads per month  
[![apm download](https://img.shields.io/apm/dm/vim-mode.svg)]()  
Name: `apm-download-month`  
Field: `name`  


# [david](http://david-dm.org/)

1. David dependency  
[![david dependency](https://img.shields.io/david/tanhauhau/generator-badge.svg)]()  
Name: `david` or `david-default`  
Field: `repo-username`, `repo-name`  

2. David dev-dependency  
[![david dev-dependency](https://img.shields.io/david/dev/tanhauhau/generator-badge.svg)]()  
Name: `david-development`  
Field: `repo-username`, `repo-name`  

# [Gitter](http://gitter.im/)

1. Chat on Gitter  
[![chat gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)]()  
Name: `gitter`  
Field: `repo-username`, `repo-name`  

-----

You use `badge install <badge_name>` to install.

For example, to add a `Travis build` badge, you use `badge install travis`. 
   
Names are **nested**, meaning `npm-download`, `npm-license` and `npm-version` is under `npm`. So, by using `badge install npm`, this is equivalent to `badge install npm-download npm-license npm-version`
	
However if you have something as **default**, such as `david-default`, you can ignore the `default` and use `david` instead. If such case exists, `david` is equivalent to `david-default`, not `david-default` + `david-development`
