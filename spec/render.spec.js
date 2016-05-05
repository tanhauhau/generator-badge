var render = require('../lib/util/render');

describe('Render', function(){
    it('should return empty string', function(){
        expect(render()).toEqual('');
        expect(render('')).toEqual('');
        expect(render('', {a:1})).toEqual('');
    });
    it('should return original string', function(){
        expect(render('asdf')).toEqual('asdf');
        expect(render('wera {{}')).toEqual('wera {{}');
        expect(render('wera {}')).toEqual('wera {}');
        expect(render('adsf', {a : 1})).toEqual('adsf');
    });
    it('should return render blank', function(){
        expect(render('asdf {{a}}', {b:1})).toEqual('asdf ');
        expect(render('asdf {{a}}')).toEqual('asdf ');
    });
    it('should return render value', function(){
        expect(render('asdf {{a}}', {a:1})).toEqual('asdf 1');
        expect(render('asdf {{ a}}', {a:1})).toEqual('asdf 1');
        expect(render('asdf {{ a }}', {a:1})).toEqual('asdf 1');
        expect(render('asdf {{    a    }}', {a:1})).toEqual('asdf 1');
    });
    it('should return render repeating value', function(){
        expect(render('{{a}} asdf {{a}}', {a:1})).toEqual('1 asdf 1');
        expect(render('{{  a  }} asdf {{ a}}', {a:1})).toEqual('1 asdf 1');
        expect(render('{{  a  }} {{a}}sdf {{ a}}', {a:1})).toEqual('1 1sdf 1');
    });
    it('should return render multiple values', function(){
        expect(render('{{a}} asdf {{b}}', {a:1, b:2})).toEqual('1 asdf 2');
        expect(render('{{  a  }} asdf {{ a}} {{b}}', {a:1, b:2})).toEqual('1 asdf 1 2');
        expect(render('{{  a  }} {{a}}sdf{{c}} {{ a}} {{b}}', {a:1, b:3, c:4})).toEqual('1 1sdf4 1 3');
    });
    it('should ok with alphabets and hyphen', function(){
        expect(render('{{a-b}} asdf {{bD}}', {'a-b':1, bD:2})).toEqual('1 asdf 2');
    });
})
