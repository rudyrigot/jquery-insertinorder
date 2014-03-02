# JQuery InsertInOrder plugin

A JQuery plugin to insert a new DOM element at the right place within sibling DOM elements.

For instance, say you have an HTML list like this:
```html
<ul>
  <li>Hello 0</li>
  <li>Hello 2</li>
  <li>Hello 4</li>
</ul>
```
and you want to insert  `<li>Hello 3</li>` at the right place, this library does just that
effortlessly (by using an extra `data-order` attribute, not represented here).

## Getting Started

### Install on your website manually

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/rudyrigot/jquery-insertinorder/master/dist/insertinorder.min.js
[max]: https://raw.github.com/rudyrigot/jquery-insertinorder/master/dist/insertinorder.js

In your web page:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="js/insertinorder.min.js"></script>
```

### Install on your website with Bower

*This assumed you installed [Bower](http://bower.io/), and ran `bower init`*

Run in the terminal:

```
bower install --save jquery-insertinorder
```

Add into your webpage:
```html
<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="bower_components/jquery-insertinorder/dist/insertinorder.min.js"></script>
```

## Documentation

Three prerequisites:
 * [JQuery](http://jquery.com/) must be included in your webpage, of course.
 * the elements in the list you're inserting into all have a `data-order` attribute (those that don't will be ignored), and this attribute is a numeral.
 * the elements already in the list are ordered on their `data-order` attribute, in the same direction as the one you're using to insert the element.

Apply the method on the JQuery element objet of the parent element. Note that even though the library was created with a
particular use case in mind, that you will probably apply the method on a `ul` DOM element, in order to
keep its `li` children ordered, this is actually not a necessity (it should work with `div` elements within `div`
elements, or anything else).

Parameters in `insertinorder(liStr, order, options)`
 * `liStr` (mandatory): the string representation of the element you're inserting. If you wish to insert other elements later, don't forget to give it a `data-order` attribute containing its order in the list.
 * `order` (mandatory): its order within the list, as a numeral value (can seem repetitive, as you most likely inserted it in `liStr`'s `data-order` attribute, but having it directly as a number makes the whole thing more performant).
 * `options` (optional): an object containing options (see below)

Options:
 * `direction`:
  * `'asc'`: the list is ordered in an ascending direction, smallest first (**default value**).
  * `'desc'`: the list is ordered in a descending direction, biggest first.

## Examples

### Adding an element in the ascending direction

If this is in your DOM:
```html
<ul id="foo">
  <li data-order="0">Hello 0</li>
  <li data-order="2">Hello 2</li>
  <li data-order="4">Hello 4</li>
  <li data-order="6">Hello 6</li>
</ul>
```
And you run:
```javascript
$('#foo').insertinorder('<li data-order="3">Hello 3</li>', 3)
```

You get:
```html
<ul id="foo">
  <li data-order="0">Hello 0</li>
  <li data-order="2">Hello 2</li>
  <li data-order="3">Hello 3</li>
  <li data-order="4">Hello 4</li>
  <li data-order="6">Hello 6</li>
</ul>
```


### Adding an element in the descending direction

If this is in your DOM:
```html
<ul id="foo">
  <li data-order="6">Hello 6</li>
  <li data-order="4">Hello 4</li>
  <li data-order="2">Hello 2</li>
  <li data-order="0">Hello 0</li>
</ul>
```
And you run:
```javascript
$('#foo').insertinorder('<li data-order="3">Hello 3</li>', 3, { direction: 'desc' })
```

You get:
```html
<ul id="foo">
  <li data-order="6">Hello 6</li>
  <li data-order="4">Hello 4</li>
  <li data-order="3">Hello 3</li>
  <li data-order="2">Hello 2</li>
  <li data-order="0">Hello 0</li>
</ul>
```
### From scratch

If this is in your DOM:
```html
<ul id="foo">
</ul>
```
And you do:
```javascript
$('#foo').insertinorder('<li data-order="3">Hello 3</li>', 3)
$('#foo').insertinorder('<li data-order="1">Hello 1</li>', 3)
$('#foo').insertinorder('<li data-order="5">Hello 5</li>', 3)
$('#foo').insertinorder('<li data-order="2">Hello 2</li>', 3)
```

You get:
```html
<ul id="foo">
  <li data-order="1">Hello 1</li>
  <li data-order="2">Hello 2</li>
  <li data-order="3">Hello 3</li>
  <li data-order="5">Hello 5</li>
</ul>
```

## Releases

Check out [our release history on GitHub](https://github.com/rudyrigot/jquery-insertinorder/releases).

## History of the plugin

I needed the plug-in while building an open-source project called "NowSpeak" (that yet has to be released),
in order to be used with [Firebase](https://www.firebase.com/).

As a synchronized approach to cloud data, you get to retrieve data in Firebase by setting listeners. If you want
to retrieve a list of Firebase references (that's how they call their stored "objects"), you listen to the
`child_added` event on the parent reference, and insert in the DOM each received data. This allows to immediately
synchronize everything with the current state of the data, but also to keep the data current, if new bits of data
(references) are added by someone else.

However, it is impossible to predict in which order the references will arrive. There is [an ordering feature
in Firebase](https://www.firebase.com/docs/ordered-data.html), but it didn't match my use case: I needed to
update the order of elements (in Firebase's feature, the reference's priority is set at its creation, and
cannot be changed later without removing the reference and re-creating it, including its sub-references).

The most relevant solution was therefore to leave the references unordered in the model, make sure to store their
order field properly for each one, and simply insert each reference properly into the DOM when it is received by
the application.
