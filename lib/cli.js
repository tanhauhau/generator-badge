#!/usr/bin/env node
'use strict';
var meow = require('meow'),
    help = require('./cmd/help.js'),
 install = require('./cmd/install.js'),
    list = require('./cmd/list.js');

const cli = meow(`
	Usage
      To inject a badge:
        $ badge install <command> [<args>]

      To see option available for a badge:
        $ badge help <command>

	Examples
	  $ badge install travis --user="tanhauhau" --repo="generator-badge"
	  $ badge help travis
`, {
	alias: {
		h: 'help'
	}
});
if(cli.input[0] === 'help'){
    help(cli.input.slice(1));
}else if(cli.input[0] === 'install'){
    install(cli);
}else if(cli.input[0] === 'list'){
    list();
}else{
    cli.showHelp();
}
