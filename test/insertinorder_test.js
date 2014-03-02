(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#insertinorder', {
    // This will run before each test in this module.
    setup: function() {
      this.fixture = $('#qunit-fixture');
    }
  });

  test('works in an descending direction', function(){
    expect(1);
    $('#desc', this.fixture).insertinorder('<li data-order="3">Hello 3</li>', 3, { direction:'desc' });
    equal(
      $('#desc', this.fixture).html().trim().replace(/<\/li>\s*<li/g, ''),
      "<li data-order=\"6\">Hello 6 data-order=\"4\">Hello 4 data-order=\"3\">Hello 3 data-order=\"2\">Hello 2 data-order=\"0\">Hello 0</li>",
      'should order properly in descending directions'
    );
  });

  test('works in an ascending direction', function(){
    expect(1);
    $('#asc', this.fixture).insertinorder('<li data-order="3">Hello 3</li>', 3);
    $('#asc', this.fixture).insertinorder('<li data-order="5">Hello 5</li>', 5, {direction: 'asc'});
    $('#asc', this.fixture).insertinorder('<li data-order="7">Hello 7</li>', 7, {direction: 'wrongword'});
    equal(
      $('#asc', this.fixture).html().trim().replace(/<\/li>\s*<li/g, '</li><li'),
      "<li data-order=\"0\">Hello 0</li><li data-order=\"2\">Hello 2</li><li data-order=\"3\">Hello 3</li><li data-order=\"4\">Hello 4</li><li data-order=\"5\">Hello 5</li><li data-order=\"6\">Hello 6</li><li data-order=\"7\">Hello 7</li>",
      'should order properly in ascending directions'
    );
  });

  test('works on empty sets', function(){
    expect(1);
    $('#empty', this.fixture).insertinorder('<li data-order="3">Hello 3</li>', 3);
    $('#empty', this.fixture).insertinorder('<li data-order="5">Hello 5</li>', 5, {direction: 'asc'});
    $('#empty', this.fixture).insertinorder('<li data-order="7">Hello 7</li>', 7, {direction: 'wrongword'});
    equal(
      $('#empty', this.fixture).html().trim().replace(/<\/li>\s*<li/g, '</li><li'),
      "<li data-order=\"3\">Hello 3</li><li data-order=\"5\">Hello 5</li><li data-order=\"7\">Hello 7</li>",
      'should order properly from an empty set'
    );
  });

  test('works on multiple sets', function(){
    expect(2);
    $('#empty, #asc', this.fixture).insertinorder('<li data-order="1">Hello 1</li>', 1);
    $('#empty, #asc', this.fixture).insertinorder('<li data-order="10">Hello 10</li>', 10);
    equal(
      $('#empty', this.fixture).html().trim().replace(/<\/li>\s*<li/g, '</li><li'),
      "<li data-order=\"1\">Hello 1</li><li data-order=\"10\">Hello 10</li>",
      'should work on multiple sets'
    );
    equal(
      $('#asc', this.fixture).html().trim().replace(/<\/li>\s*<li/g, '</li><li'),
      "<li data-order=\"0\">Hello 0</li><li data-order=\"1\">Hello 1</li><li data-order=\"2\">Hello 2</li><li data-order=\"4\">Hello 4</li><li data-order=\"6\">Hello 6</li><li data-order=\"10\">Hello 10</li>",
      'should work on multiple sets'
    );
  });

  test('is chainable', function(){
    expect(1);
    equal(
      $('#asc', this.fixture)
        .insertinorder('<li data-order="3">Hello 3</li>', 3)
        .insertinorder('<li data-order="7">Hello 7</li>', 7)
        .html()
        .trim().replace(/<\/li>\s*<li/g, '</li><li'),
      "<li data-order=\"0\">Hello 0</li><li data-order=\"2\">Hello 2</li><li data-order=\"3\">Hello 3</li><li data-order=\"4\">Hello 4</li><li data-order=\"6\">Hello 6</li><li data-order=\"7\">Hello 7</li>",
      'should be chainable'
    );
  });

}(jQuery));
