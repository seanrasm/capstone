$(function() {

    // SETUP
    var $list, $newItemForm, $newItemButton;
    var item = '';                                 // item is an empty string
    $list = $('#js_push');                         // Cache the unordered list
    $newItemForm = $('#newItemForm');              // Cache form to add new items
    $newItemButton = $('#newItemButton');          // Cache button to show form
  
    $('li-class').hide().each(function(index) {          // Hide list items
      $(this).delay(450 * index).fadeIn(1600);     // Then fade them in
    });
  
    // ITEM COUNTER
    function updateCount() {                       // Create function to update counter
      var items = $('li[class!=complete]').length; // Number of items in list
      $('#counter').text(items);                   // Added into counter circle
    }
    updateCount();                                 // Call the function
  
    // SETUP FORM FOR NEW ITEMS
    $newItemButton.show();                         // Show the button
    $newItemForm.hide();                           // Hide the form
    $('#showForm').on('click', function() {        // When click on add item button
      $newItemButton.hide();                       // Hide the button
      $newItemForm.show();                         // Show the form
    });
  
    // ADDING A NEW LIST ITEM
    $newItemForm.on('submit', function(e) {       // When a new item is submitted
      e.preventDefault();                         // Prevent form being submitted
      var text = $('input:text').val();           // Get value of text input
      text = encodeITEM(text);
      $list.append('<li class="hot li-class">' + text + '</li>');      // Add item to end of the list
      $('input:text').val('');                    // Empty the text input
      updateCount();                              // Update the count
    });

    //Function to sanitize data from the stacks input form on this page
    function encodeITEM(s) {
      if (s==='') return '_';
      return s.replace(/[<>]/g, function(match) {
          return '_'+match[0].charCodeAt(0).toString(16)+'_';
      });
  }
  
    // CLICK HANDLING - USES DELEGATION ON <ul> ELEMENT
    $list.on('click', 'li', function() {
      var $this = $(this);               // Cache the element in a jQuery object
      var complete = $this.hasClass('complete');  // Is item complete
  
      if (complete === true) {           // Check if item is complete
        $this.animate({                  // If so, animate opacity + padding
          opacity: 0.0,
          paddingLeft: '+=180'
        }, 500, 'swing', function() {    // Use callback when animation completes
          $this.remove();                // Then completely remove this item
        });
      } else {                           // Otherwise indicate it is complete
        item = $this.text();             // Get the text from the list item
        $this.remove();                  // Remove the list item
        $list                            // Add back to end of list as complete
          .append('<li class=\"complete\">' + item + '</li>')
          .hide().fadeIn(300);           // Hide it so it can be faded in
        updateCount();                   // Update the counter
      }                                  // End of else option
    });                                  // End of event handler
  
  });