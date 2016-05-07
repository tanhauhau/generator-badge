var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');

module.exports = {};
module.exports.prepare = function(template, filename, args, cwd){
    return function(done){
        var rs = fs.createReadStream(template);
        rs.on('error', function(e){
            console.log('!! Error: !! ' + e);
            done();
        });
        var ws = fs.createWriteStream(filename);
        ws.on('error', function(e){
            console.log('!! Error: !! ' + e);
            done();
        });
        ws.on('close', function(){
            var run = spawn('node', args, {cwd: cwd});
            var called = false;
            function finish(){

                if(!called){
                    called = true;
                    done();
                }
            }
            run.on('exit', finish);
            run.on('error', finish);
        });
        rs.pipe(ws);
    };
};
