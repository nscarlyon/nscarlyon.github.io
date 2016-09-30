---
layout: post
title:  "Creating an AngularJS Filter Drop Down Menu"
date:   2016-09-30 13:42:33 -0400
---

For my Art Lister app, I wanted to create a drop down menu where a user can select a specific property such as an artist name and type in an artist name to see a list of artworks filtered by the artist name. My googling skills only came up with half solutions that did not meet these requirements. However, after stumbling upon the angular-filter repo, I found my answer. Angular-filter is a library of useful filters you can implement in your AngularJS application.

**Installing angular-filter**

[https://github.com/a8m/angular-filter](http://)

The angular-filter repo gives good instructions on how to install it, but here are the instructions I followed:

1. npm install angular-filter
2. Include angular-filter.js or angular-filter.min.js in index.html, after including Angular itself
3. Add 'angular.filter' to your main module's list of dependencies.

**Creating Drop Down Menu**

Next, I created the drop down menu and input field like so:

```
<select ng-model="filterInput" required>
<option value="">Select Property</option>
<option value="title">Title</option>
<option value="artist.name">Artist</option>
<option value="medium">Medium</option>
<option value="location">Location</option>
<option value="date_seen">Date Seen</option>

<input ng-model="searchInput" placeholder="search Input">

```
**Filter Artworks**

I then filtered the search results by the selected filter and input value:

```
<tr ng-repeat="artwork in artworks.data | filterBy: [filterInput]: searchInput | orderBy: 'title' ">
```

'filterBy' is one of the helpful filters in the angular-filter file. It filters the array of artworks by a property, filterInput in this case. So when a user selects 'Title' from the dropdown menu, the value for that option('title') is bound to filterInput. 'filterBy' also takes in another parameter. After you specify the property, there is a colon and then 'searchInput'. searchInput is whatever the user entered in the input field. Thus, if a user selects 'date_seen' and types in 'Jan', she will see all artworks with the letters Jan in the date_seen field.   

**Final Thoughts**

'angular-js' is a library with many useful filters besides 'filterBy'. I will certainly use this library in the future. [https://github.com/a8m/angular-filter](http://)
