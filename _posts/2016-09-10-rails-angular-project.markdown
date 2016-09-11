---
layout: post
title:  "Rails-AngularJS-Project "
date:   2016-09-09 20:58:02 -0400
---

This was my last Learn project. It was certainly the most difficult journey project as of yet, but I know that there will be more challening tasks in my future! I have learned a lot through this experience, and it has helped solidify my understanding of the fundamentals of AngularJS. In this blog post, I will go over some of the things I have learned:

### Connecting Rails Backend to Angular Frontend

The first challenge was figuring out how to connect Rails to AngularJS, which is something I have never done prior to this project. Fortunately, a learn instructor was able to point me in the right direction. I thought it would be a complicated mess, but all I had to do was add the angular-rails-templates gem and follow the simple instructions on the README. Here is a link to the directions: [https://github.com/pitr/angular-rails-templates](http://)

### Controllers and Scopes and Services and Oh My! 

At the beggining of this project, I was still confused by the relationship between all the components of AngularJS. I could see single trees, but I missed the forest. After reading multiple sources, watching a few youtube videos, and doing some serious coding, I now have a good grasp on the basics. Let's start at the beggining. 

AngularJS is like adding an extra limb to HTML. It uses html syntax to make static HTML pages into fully functional, dynamic pages.

It all beings with a module. The module is like a picnic basket where you place all your items. It is the container that holds all your angular code. To instantiate a module, you first define it:

```
angular
  .module('app', [])
```

 angular.module is saying that you are now defining a module with the name 'app'. The empty brackets is the act of creating the module. 
 
 Controllers are like the tree trunks of angular. They provide the logic behind the templates or pages. The main function of a controller is to define the object that will be displayed in the view. This is done by using a $scope. I feel that the best way to understand $scope is to think of it as the glue between the controller and the view. Here's an example:
 
 `
 
 angular 
   .module('app) 
	 .controller('myController', myController)
	 
	 function myController($scope) { 
	  $scope.artwork = "Mona Lisa"
  }
 `
 
 The code above is a controller. You can think of a controller as like a constructor function; it constructs the object, which is the list of artworks in this case. It attaches all the data("Mona Lisa") to the $scope. You can then display this data via the $scope in the view:
 
 `
 <div ng-controller="myController as ctrl">
 Look at the {{ctrl.artwork}}
 </div>
 `
 
 The view will display as: Look at the Mona Lisa
 
 The directive ng-controller binds the $scope in the view to this specific controller called myController that is nicknamed ctrl. {{}} tells the view to get the $scope's data from the controller and then send it back to the view. 
 
 One of the tools of AngularJS is services. I like to think of them as waiters/servers. They help the controller by transferring data. For instance, you could use a server to send a $http.get request. Now, it is true that you can do the same in the controller, but it is best practice ot keep the controllers lean and clean. You want controllers to focus on defining the $scope. If you start inserting different code in the controllers, your app is more prone to bugs. 
 
 That's just some of the basics of AngularJS. I plan on writing more details on this amazing programming language in the future.

### Final Thoughts

I feel that the most important thing I took away from this experience was gaining a stronger understanding of the fundamentals. I can now see why we user AngularJS. Prior to AngularjS, web developers would often have to trick HTML into thinking it was a dynamic app. They would have to write long and convuluted code to acheive what we can now do with AngularJS. AngularJS provides web developers with the tools to transform static pages into dynamic creations.

Here's a link to my project: [https://github.com/nscarlyon/rails-angular-project](http://)
