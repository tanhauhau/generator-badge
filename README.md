# generator-badge

# ⚠️ WORK IN PROGRESS ⚠️

> Generate badges for your readme

# Installation

```bash
$ npm install --save --global generator-badge
```

## Usage

*Expected Usage:* 

**BEFORE**

README.md:

```
# MY-AWESOME-PROJECT
<!-- badge -->
<!-- endbadge -->
```

**THEN**

Terminal: 

```bash
awesome-project$ badge install travis npm-version
```

**AFTER**

README.md:

```
# MY-AWESOME-PROJECT
<!-- badge -->
[![travis](https://img.shields.io/travis/tanhauhau/awesome-project.svg)](https://travis-ci.org/tanhauhau/awesome-project)
[![npm-version](https://img.shields.io/npm/v/awesome-project.svg)](https://www.npmjs.com/package/awesome-project)
<!-- endbadge -->
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

# License
MIT
