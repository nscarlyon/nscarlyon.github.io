---
layout: post
title:  "Fighting Ajax: JS Prototypes and Handlebars"
date:   2016-08-24 15:55:23 -0400
---

When I first started injecting AJAX code into my rails recipe project, I felt much like Hector futily throwing a lance at Ajax, who then returns an impossibly large rock that nearly breaks my neck; however, after a few rounds, I now have a stronger understanding of AJAX. 

For this blog post, I will show you how to use ajax to request a specific recipe json, translate that json into a js object, and then render the js object's data on a show page, using a handlebars template, when the user clicks on the .js-nextRecipe button. 

First, you need to install handlebars. Handlebars is a javascript library that enables you to create dynamic templates for rendering js objects. Once, you have the handlebars library properlly included in your project, you may combine it with the power of AJAX. You may find the appropriate installation directions for your project here: [http://handlebarsjs.com/](http://) 


