


/*

This accordion function will create an accordion using the following HTML code:

<div class="accordion">
  <button class="accordion-header" aria-expanded="false">Section 1</button>
  <div class="accordion-content" aria-hidden="true">
    <p>Content for section 1</p>
  </div>
  <button class="accordion-header" aria-expanded="false">Section 2</button>
  <div class="accordion-content" aria-hidden="true">
    <p>Content for section 2</p>
  </div>
</div>

The accordion should have the following features:

-The accordion should be fully accessible to users with disabilities, including screen reader users.
-The accordion should be able to toggle between sections when the corresponding header is clicked.
-The accordion should update the aria-expanded attribute of the header and the aria-hidden attribute of the content to reflect the current state of the accordion.
-The accordion should support keyboard navigation, including the ability to toggle sections using the Enter and Space keys.

To use this function, simply add the following code to your HTML:

<script>
var accordion = new Accordion('.accordion');
</script>

*/

/**
 * Accordion function
 * 
 * @param {string} selector - The selector for the accordion element
 */
function Accordion(selector) {
  this.accordion = document.querySelector(selector);
  this.headers = this.accordion.querySelectorAll('.accordion-header');
  this.contents = this.accordion.querySelectorAll('.accordion-content');

  // Bind the event listeners to the instance of the Accordion
  // This will ensure that 'this' refers to the Accordion when the event handlers are fired
  this.accordion.addEventListener('click', this.clickHandler.bind(this));
  this.accordion.addEventListener('keydown', this.keydownHandler.bind(this));
}

/**
 * Event handler for when the accordion is clicked
 * 
 * @param {Event} event 
 */
Accordion.prototype.clickHandler = function(event) {
  // Check if the click was on a header
  if (event.target.classList.contains('accordion-header')) {
    // Get the content element that corresponds to the clicked header
    var content = event.target.nextElementSibling;

    // Toggle the 'aria-expanded' attribute of the header
    // If it is 'true', set it to 'false'
    // If it is 'false', set it to 'true'
    if (event.target.getAttribute('aria-expanded') === 'true') {
      event.target.setAttribute('aria-expanded', 'false');
    } else {
      event.target.setAttribute('aria-expanded', 'true');
    }

    // Toggle the 'aria-hidden' attribute of the content
    // If it is 'true', set it to 'false'
    // If it is 'false', set it to 'true'
    if (content.getAttribute('aria-hidden') === 'true') {
      content.setAttribute('aria-hidden', 'false');
    } else {
      content.setAttribute('aria-hidden', 'true');
    }
  }
}

/**
 * Event handler for when a key is pressed
 * 
 * @param {Event} event 
 */
Accordion.prototype.keydownHandler = function(event) {
  // Check if the pressed key is Enter or Space
  if (event.key === 'Enter' || event.key === ' ') {
    // If it is, we'll treat it like a click
    this.clickHandler(event);
  }
}