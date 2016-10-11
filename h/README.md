# Recreating HackerNews in Angular

## Objectives

- Use the HackerNews API to create a clone app
- Render the top stories view
- Use ui-router for advanced routing
- Use dynamic views in routes
- Set the top stories view as the default route
- Create relevant Controllers and Services
- Use relevant Directives to bind ViewModels and Events
- Use routing resolves to preload data fetched from Services
- Allow a user to transition to a news item when clicked
- Show all comments for a post in the news item
- Nest replies to comments where necessary
- Display dates in human-readible formats
- Allow the user to navigate "Next" and "Previous" page

## Instructions

To run the local dev server, you'll need to run `npm install` and then `node server.js`. This will run a local dev server at http://localhost:8080.

HackerNews is a basic news site where people can post items and comment on them. Let's recreate some of it. [Take a look at it here.](https://news.ycombinator.com)

Create a state for the "top stories".

We should then grab all the top stories from the URL `https://hacker-news.firebaseio.com/v0/topstories.json`. If you go to that URL, you'll see we actually get lots of IDs - around 500 or so.

Create a service, and a method to grab all the top stories. Then create a method to grab information about a single post by it's ID. This should hit `https://hacker-news.firebaseio.com/v0/item/{id}.json`.

Display a list of 30 posts on the top stories, and put two links at the bottom to allow the user to change to the next/previous page. As we've already got the ~500 or so top stories, we can just slice a different chunk out of the array depending what page they're on instead of making a new request.

**Note** normally with pagination, we'd request a new dataset from the server depending what page number we're on. However, in this case, we'll already have all of the top stories, so we'll just need to slice a different part of the array.

Each top story should have it's URL displayed along with the amount of comments and the score.

Create another route to view a post with a given ID. This should make a request to the same URL above. Then, display the same information that we displayed for each item (URL, comments, score).

Each post has an array of `kids`. This is a list of comments inside the post. These again, are items, so to retrieve the info for the comment, we hit the same URL - `https://hacker-news.firebaseio.com/v0/item/{id}.json`. We can tell stories and comments apart by the `type` property.

Create a component to display the comments - this should grab data from the URL on initialisation. The comments contents are provided to use in HTML, however Angular doesn't allow us to inject HTML into our templates from a variable. Use the `ngSanitize` module to allow us to do this (hint: we need to use `ng-bind-html`).

Each kid (comment) might have kids (comments) inside it - so each comment should actually call the comment component inside of it. This means we've got a recursive component - awesome!

There are simple styles for you to use inside `app.css` to make it look pretty!

## Resources

- [ngSanitize](https://docs.angularjs.org/api/ngSanitize)
