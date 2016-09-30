---
layout: post
title:  "Keeping Promises "
date:   2016-09-20 19:19:54 -0400
---

It took some for my head to wrap around the idea of 'promises' in AngularJS, so I'm going to write down my understanding before I lose it.=)

**What is a promise?**

A promise is the representation of an eventual event. For example, say you want to display a list of user names. You go to the web page and see nothing! Wait, no there are the user names. What happened here is the web page loaded before getting the list of user names. What you want to happen is the server 'promises' that it will display the page as soon as it receives the list of user names. Getting the user names is the promise.

**Resolving a Promise**

So how do you go about making sure the page waits until it get the necessary data? You resolve the promise. Here is an example:

```
    $stateProvider
      .state('users', {
        url: '/users/index',
        templateUrl: 'users/index.html',
        controller: 'UsersController as user',
        resolve: {
          users: function(User) {
            return User.getUsers()
          }
        })
```
Resolve is a property attached to a state. It contains one or more promises that must resolve successfully before the state loads, meaning the data must become available prior to showing the view. In the resolve, there's a function that has the parameter 'User'. In this case, User is a service function:

```
function User($http) {

  this.getUsers = function() {
    return $http.get('/users.json')
  }
}
```

The 'User.getUsers()' function sends a $http request to your server to get a list of users in the form of a json. An $http request returns a promise. When the promise has successfully resolve, which means the data is now available and attached to a response object, the variable 'users' is available to be injected into the UsersController.

```
function UsersController(users) {
  this.data = users.data
}
```

You can now use the injected 'users' and assign it to a variable in the controller. The reason why there is a '.data' attached to 'users' is because 'users' is a response object that automatically contains five properties:

1. Config: The initial config object used to make the request.
2. Data (information like the json returned from server; Angular will automatically parse the received data)
3. Headers: Contains information like the content-type and other headers related info
4. Status: HTTP status code of request
5. Status Text: Text that goes with status like 'OK' or 'Bad request'

You could choose to display the other properties such as Status Text.

**Final Thoughts**

Before I just blindly used the 'resolve' property, but now that I have a better understanding of 'resolve', I will make sure that I wield it wisely.
