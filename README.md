# generator-badge

<!-- badge -->
[![travis status](https://img.shields.io/travis/tanhauhau/generator-badge.svg)](https://travis-ci.org/tanhauhau/generator-badge)
[![npm version](https://img.shields.io/npm/v/generator-badge.svg)](https://www.npmjs.com/package/generator-badge)
[![npm license](https://img.shields.io/npm/l/generator-badge.svg)](https://www.npmjs.com/package/generator-badge)
[![npm download](https://img.shields.io/npm/dm/generator-badge.svg)](https://www.npmjs.com/package/generator-badge)
[![npm download](https://img.shields.io/npm/dt/generator-badge.svg)](https://www.npmjs.com/package/generator-badge)
[![david dependency](https://img.shields.io/david/tanhauhau/generator-badge.svg)]()
[![david dev-dependency](https://img.shields.io/david/dev/tanhauhau/generator-badge.svg)]()
[![wercker status](https://app.wercker.com/status/15d1bfe55ec05c73b82704c4912f4323/s)](https://app.wercker.com/project/bykey/15d1bfe55ec05c73b82704c4912f4323)
[![wercker status](https://app.wercker.com/status/15d1bfe55ec05c73b82704c4912f4323/m)](https://app.wercker.com/project/bykey/15d1bfe55ec05c73b82704c4912f4323)
[![GitHub followers](https://img.shields.io/github/followers/tanhauhau.svg?style=social&label=Follow)](https://github.com/tanhauhau/generator-badge)
[![GitHub forks](https://img.shields.io/github/forks/tanhauhau/generator-badge.svg?style=social&label=Fork)](https://github.com/tanhauhau/generator-badge/fork)
[![GitHub stars](https://img.shields.io/github/stars/tanhauhau/generator-badge.svg?style=social&label=Star)](https://github.com/tanhauhau/generator-badge)
[![GitHub watchers](https://img.shields.io/github/watchers/tanhauhau/generator-badge.svg?style=social&label=Watch)](https://github.com/tanhauhau/generator-badge)
[![GitHub issues](https://img.shields.io/github/issues/tanhauhau/generator-badge.svg)](https://github.com/tanhauhau/generator-badge/issues)
<!-- endbadge -->

> Generate badges for your readme

# Installation

```bash
$ npm install --save --global generator-badge
```

## Example

**BEFORE**

README.md:

```markdown
# MY-AWESOME-PROJECT
<!-- badge -->
<!-- endbadge -->
```

**THEN YOU DO**

Terminal:

```bash
awesome-project$ badge install travis npm-version
```

**WHAT YOU GET**

README.md:

```markdown
# MY-AWESOME-PROJECT
<!-- badge -->
[![travis](https://img.shields.io/travis/tanhauhau/awesome-project.svg)](https://travis-ci.org/tanhauhau/awesome-project)
[![npm-version](https://img.shields.io/npm/v/awesome-project.svg)](https://www.npmjs.com/package/awesome-project)
<!-- endbadge -->
```

## Usage

**Install badges**

```bash
$ badge install <badges> [<args>]
```

You can specify required field values into arguments:

```bash
$ badge install travis --repo-username=tanhauhau --repo-name=awesome-project
```

For field values that is missing, `badge` will prompt you to enter.

```bash
$ badge install travis
  Inferring information needed...
  ? repo-username: tanhauhau
  ? repo-name: awesome-project
  Preparing the badges...
  Looking for README...
  Injecting badges into README...
  Done :)
```

**List of all badges available**

```bash
$ badge list
```

**Help**

```bash
$ badge help <badge>
$ badge help travis
 travis-default
 Build apps with confidence.
 Description : Travis build status of master branch
 Fields      : repo-username, repo-name
```

## Todo List

- [ ] Find README of various format: markdown, textile, rdoc, rst, pod, html
- [ ] Inferring git, svn repo information
- [ ] Storing global preferences, eg: able to remember author name in global
- [ ] Storing local preferences, eg: able to remember repo info in local package
- [ ] Filename as argument
- [ ] [More badges available](https://github.com/tanhauhau/generator-badge/blob/master/doc/list.md)

## Badge credits to

[![shields.io](http://shields.io/logo.svg)](http://shields.io)


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

# License
MIT
