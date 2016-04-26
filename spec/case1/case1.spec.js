var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');
describe("basic test", function(){
    beforeEach(function(done){
        var run = spawn('node', [path.resolve(__dirname, '../../lib/cli.js'), 'install', '']);
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
    describe('check if the file is same', function(){
        it('should be the same', function(done){
            expect(fs.readFileSync(path.resolve(__dirname, 'README.md'), 'utf-8'))
            .toEqual(fs.readFileSync(path.resolve(__dirname, 'EXPECT.md'), 'utf-8'));
        });
    });
});
