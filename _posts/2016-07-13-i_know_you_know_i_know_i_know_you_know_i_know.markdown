---
layout: post
title:  "I know. You know I know. I know you know I know...."
date:   2016-07-13 11:10:07 -0400
---

In the beginning, understanding all the associations between the diverse classes and the consequences of these associations felt like learning the intricate relationships between political parties. I learned that sometimes it was better to take a step back from the computer and turn to old school pen and paper. By drawing a diagram of the different classes in my sinatra project, I was able to see what has what and who belongs to whom and how one class knows another through a different class. 

The purpose of this project was to create a CRUD app that kept a track of something important to you. I made a list of trackable items, and I eventually decided on tracking artworks. I always wanted to keep a list of artwork I have seen in my life. This was a wonderful opportunity to create an application that would accomplish that task.

In order to create a successful CRUD app, it is essential that you understand the relationship between the models. Here is a simple diagram I made on Gliffy to understand the different relationships between my models/tables.

![](http://i.imgur.com/n1CFCeI.gif)

By making this diagram, I was able to see that the user had access to only artworks she added to her list. It was important for the artwork table to have a user id, so only a specific user can have access to that data. A different user would not be able to see the artwork created by another user. The diagram also helped me see how the artist had many artwork movements through the artworks. This resembles real life. An artist is not considered a part of an art movement, unless he is creating artwork associated with that movement. Perhaps comparing associations to political parties was not far-fetch.

Leonardo da Vinci said, "Art is never finished, only abandoned." I believe programming is a lot like art. You are creating code and then constantly tweaking, removing, or adding to the code in order to grasp some beauty or truth. After submitting this assignment, I know that the project is not finished. I could do so much more like creating a page where all the user's artworks is separated by type of medium. I could create more classes such as location. I could add attributes to the existing classes such as the year made for each art work. I could refactor some of the code. There is so much more I can do, but like Leonardo, you must eventually abandon art, so you can create more.
