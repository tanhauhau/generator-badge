#!/usr/bin/env node
'use strict';
var meow = require('meow'),
    help = require('./cmd/help.js'),
 install = require('./cmd/install.js'),
    list = require('./cmd/list.js'),
   clear = require('./cmd/clear.js');

const cli = meow(`
	Usage
      To add badge(s):
        $ badge install <command> [<args>]

      To see description of badge(s):
        $ badge help <command>

      To list all badges:
        $ badge list

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
if(cli.input[0] === 'help'){
    help(cli.input.slice(1));
}else if(cli.input[0] === 'install'){
    install(cli);
}else if(cli.input[0] === 'list'){
    list(cli.input.slice(1));
}else if(cli.input[0] === 'clear'){
    clear();
}else{
    cli.showHelp();
}
