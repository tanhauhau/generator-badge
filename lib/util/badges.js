'use strict';
var arrify = require('arrify'),
         _ = require('lodash'),
      path = require('path'),
      yaml = require('read-yaml');

// Badge
const BADGES = yaml.sync(path.resolve(__dirname, './badges.yml'));

// Searching
const VERIFY_REGEX = /^[a-zA-Z]+(\-[a-zA-Z]+)*$/;
const PARSE_REGEX  = /[a-zA-Z]+/g;

function extend(parent, child){
    var result = _.extend(_.clone(parent), child);
    result.field = _.concat(arrify(parent.field), arrify(child.field));
    return result;
}

function getAll(location, parent, keys){
    if(location.include === undefined){
        var obj = _.omit(extend(parent, location), ['include']);
        obj._name = keys.join('-');
        return obj;
    }else{
        var all = Array();
        _.forIn(location.include, function(value, key){
            all = _.concat(all, getAll(value, extend(parent, location), _.concat(keys, key)));
        });
        return all;
    }
}

function lookInto(names, location, parent, keys){
    if(names.length === 0){
        if(location === undefined && !_.isEmpty(parent)){
            return getAll(parent, {}, []);
        }else if(location.default !== undefined){
            return getAll(location.default, parent, _.concat(keys, 'default'));
        }else{
            var all = Array();
            _.forIn(location, function(value, key){
                all = _.concat(all, getAll(value, parent, _.concat(keys, key)));
            });
            return all;
        }
    }else{
        var name = names[0];
        if(location === undefined || location[name] === undefined){
            return undefined;
        }else if(names.length === 1 && location[name].include === undefined){
            return getAll(location[name], parent, _.concat(keys, name));
        }else{
            return lookInto(names.slice(1), location[name].include, extend(parent, location[name]), _.concat(keys, name));
        }
    }
}
function searchBadges(name){
    if(!VERIFY_REGEX.test(name)) return [];
    var badge = name.match(PARSE_REGEX);
    return arrify(lookInto(badge, BADGES, {}, []));
}
searchBadges.all = function(names){
    var rejected = [];
    var badges = [];
    _.forIn(names, function(name){
        var badge = searchBadges(name);
        if(badge.length === 0){
            rejected.push(name);
        }else{
            _.each(badge, function(b){
                if(_.findIndex(badges, function(o){ return _.isEqual(b, o); }) === -1){
                    badges.push(b);
                }
            });
        }
    });
    return {
        rejected: rejected,
        badges: badges
    };
};

// Listing
function list(node){
    return (node === null) ? [] :
        _.map(node, function(value, key){
            var n = { name: key, description: value.description };
            if(value.include !== undefined){
                n.include = list(value.include);
            }
            return n;
        });
}
function goto(name){
    if(!VERIFY_REGEX.test(name)) return null;
    var badge = name.match(PARSE_REGEX);
    var last = badge.pop();
    var node = BADGES, result = {};
    _.each(badge, function(value){
        node = (node === undefined) ? undefined : node[value].include;
    });
    return (node !== undefined && node[last] !== undefined) ?
                (result[last] = node[last]) && result :
                null;
}
searchBadges.list = function(name){
    return (name === undefined) ? list(BADGES) : list(goto(name));
};
module.exports = searchBadges;
