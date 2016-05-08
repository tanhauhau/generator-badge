#!/usr/bin/env node
'use strict';
var   meow = require('meow'),
      help = require('./cmd/help.js'),
   install = require('./cmd/install.js'),
 installed = require('./cmd/installed.js'),
      list = require('./cmd/list.js'),
     clear = require('./cmd/clear.js');

const cli = meow(`
	Usage
      To add badge(s):
        $ badge install <command> [<args>]

      To list installed badge(s):
        $ badge installed

      To see description of badge(s):
        $ badge help <command>

      To list all badges available:
        $ badge list

      To list badges that will be installed:
        $ badge list <command>

      To clear all badges:
        $ badge clear

	Examples
	  $ badge install travis --repo-username="tanhauhau" --repo-name="generator-badge"
	  $ badge help travis
`, {
	alias: {
		h: 'help'
	}
});

switch(cli.input[0]){
    case 'help':
        return help(cli.input.slice(1));
    case 'install':
        return install(cli);
    case 'installed':
        return installed();
    case 'list':
        return list(cli.input.slice(1));
    case 'clear':
        return clear();
    default:
        cli.showHelp();
}
