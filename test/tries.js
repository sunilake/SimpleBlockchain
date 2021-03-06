
var tries = require('../lib/tries');
var utils = require('../lib/utils');

exports['get trie as object'] = function (test) {
    var trie = tries.trie();
    
    test.ok(trie);
    test.equal(typeof trie, 'object');
};

exports['get no data from empty trie'] = function (test) {
    var trie = tries.trie();
    
    var result = trie.get('0123');
    
    test.equal(result, null);
};

exports['get default data from empty trie'] = function (test) {
    var trie = tries.trie();
    
    trie.default(42);
    
    var result = trie.get('0123');
    
    test.equal(result, 42);
};

exports['get default data from non empty trie'] = function (test) {
    var trie = tries.trie();
    
    trie.default(42);
    
    trie = trie.put('0000', 'foo');
    
    var result = trie.get('0123');
    
    test.equal(result, 42);
};

exports['get default data as immutable object from empty trie'] = function (test) {
    var trie = tries.trie();
    
    trie.default({ name: "Adam", age: 900 });
    
    var result = trie.get('0123');
    
    test.deepEqual(result, { name: "Adam", age: 900 });
    
    result.name = "Eve";
    result.age = 800;
    
    var result = trie.get('0123');
    
    test.deepEqual(result, { name: "Adam", age: 900 });
};

exports['put data and create another trie'] = function (test) {
    var trie = tries.trie();
    
    var result = trie.put('0123', 42);
    
    test.ok(result);
    test.ok(result !== trie);
};

exports['put array and get cloned array'] = function (test) {
    var trie = tries.trie();
    
    trie = trie.put('0123', [1, 2, 3]);
    
    var result = trie.get('0123');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.deepEqual(result, [1, 2, 3]);
    
    result[0] = 42;
    
    var result = trie.get('0123');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.deepEqual(result, [1, 2, 3]);
};

exports['put data and get data'] = function (test) {
    var trie = tries.trie();
    
    var result = trie.put('abcd', 42).get('abcd');
    
    test.ok(result);
    test.equal(result, 42);
};

exports['put two data and get two data'] = function (test) {
    var trie = tries.trie();
    var hash1 = utils.hash();
    var hash2 = utils.hash();
    
    var newtrie = trie.put(hash1, 42).put(hash2, 'foo');
    
    var result = newtrie.get(hash1);
    
    test.ok(result);
    test.equal(result, 42);
    
    var result = newtrie.get(hash2);
    
    test.ok(result);
    test.equal(result, 'foo');
};

exports['put two new data and retrieve them'] = function (test) {
    var trie = tries.trie();
    
    var result = trie.put('0123', 42)
        .put('3210', 1);
    
    test.ok(result);
    test.equal(result.get('0123'), 42);
    test.equal(result.get('3210'), 1);
    test.equal(trie.get('0123'), null);
    test.equal(trie.get('3210'), null);
};

