---
layout: post
title:  "Javascript Callbacks"
date:   2016-09-03 23:57:49 +0000
---

Knock Knock

"Who's there?"

*silence; time passes* 

Knock Knock

"Who's there?"

"Javascript!"

Javascript is like that one guy who sits in his car, outside your house after the party starts. Upon the arrival of his love interest, he jumps out of the car and crashes the party in style. He is the life of the party, and everybody knows it. He knows every single person in the room by name and knows how to push each person's buttons. You can't hide from javascript! 

This post will focus on callback functions, which is an essential part of Javascript. 

## What is a callback function? 
Essentially, a callback function is a function that is a parameter of another function. Ex:

```
function awesome(function() { 
   console.log("hello")
}
```

Function 'awesome' has a nameless callback function as one of its parameters. The callback function outputs "hello" to the console.

## Why use them? 


There are times when you want something to happen depending on a certain event. Let's say you want something to happen when a user clicks on a button:

``` 
  $('#button').on('click', function() { 
	     alert("Hello!") 
			 })
```

The '.on' sets a watcher on the element with the id of 'button'. The button is already there on the page, and the callback function is lurking in the shadows, waiting to pounce. Once the button is clicked, the callback function is called, and the user will see an alert saying "Hello!". Callback functions are handy because they let you bind certain events to certain actions. 

Another useful aspect of callback functions is that they can return information:

```
  $('td').click(function(event) {
    printNumber(3, event);
  });
	
	function printNumber(number, event) {
  $(event.target).html(number);
}

```

Something will happen when the user clicks on a table cell ('td'). The callback function has a parameter named event (it can really be named anything). This parameter, event, is the action of the user clicking on the table cell. It then calls another function call printNumber and pass it the same parameter 'event' and a number (3). printNumber will then display the number '3' in the specific table cell the user clicked on by replacing the html in event.target. 

'.target' is very handy. Basically, event.target is whatever element that was targeted upon the event. For instance, if a user clicks on a button, event.target may look like this:

```
<button id ="button">I'm a Button</button>
```

event.target is a very powerful tool that lets you quickly access the target of the event. 

## Final Note

Callback functions can be confusing at first. It helps me to think of it as a story. Imagine you were given instructions to water the plants when you hear the clock chime three times. As soon as you hear the clock chime three times, you go water the plants. One event, the chiming, caused another event to occurr, watering the plants. Here, watering the plants is like the callback function. =)
