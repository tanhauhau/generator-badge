var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');
describe("basic test", function(){
    beforeEach(function(done){
        var rs = fs.createReadStream(path.resolve(__dirname, 'DEFAULT.md'));
        rs.on('error', done);
        var ws = fs.createWriteStream(path.resolve(__dirname, 'README.md'));
        ws.on('error', done);
        ws.on('close', function(){
            var run = spawn('node', [path.resolve(__dirname, '../../lib/cli.js'), 'install', 'travis', 'npm-version', '--repo-username=tanhauhau', '--repo-name=awesome-project'], {cwd: __dirname});
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
    });
    describe('check if the file is same', function(){
        it('should be the same', function(){
            expect(fs.readFileSync(path.resolve(__dirname, 'README.md'), 'utf-8'))
            .toEqual(fs.readFileSync(path.resolve(__dirname, 'EXPECT.md'), 'utf-8'));
        });
    });
});
