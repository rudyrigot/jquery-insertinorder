/*! JQuery InsertInOrder plugin - v0.1.0 - 2014-03-01
* https://github.com/rudyrigot/jquery-insertinorder
* Copyright (c) 2014 Rudy Rigot; Licensed MIT */
;(function($) {

  // Adding the insertinorder method to the JQuery prototype
  $.fn.insertinorder = function(liStr, order, options) {
    // Will it be ascending or descending direction?
    var direction = (options && options.direction && options.direction==='desc' ? 'desc' : 'asc');
    return this.each(function(ulIndex, ulCurrent){
      var wasInserted = false; // making sure it only gets inserted once
      $('[data-order]', ulCurrent).each(function(liIndex, liCurrent){ // looping through existing DOM elements
        var orderCurrent = parseInt($(liCurrent).attr('data-order'), 10); // getting the order of the current DOM element
        if (!wasInserted && ((direction ==='desc' && order > orderCurrent) || (direction ==='asc' && order < orderCurrent))) { // if the current element is the first to be "too far"
          $(liCurrent).before(liStr); // then we insert our string before the current element
          wasInserted = true; // and note that all was indeed inserted
        }
      });
      // if nothing was inserted: either we're trying to insert the element that will take the last position,
      // or more simply, we're currently inserting the very first element to be received.
      if (!wasInserted) { $(ulCurrent).append(liStr); }
    });
  };

}(jQuery));
