function TopStoriesController(posts) {
  var ctrl = this;
  var postsPerPage = 30;

  ctrl.page = 0

  ctrl.paginate = function() {
    ctrl.posts = posts.data.slice(ctrl.page * postsPerPage, (ctrl.page + 1) * postsPerPage)
  };

  ctrl.nextPage = function() {
    ctrl.page++;
    ctrl.paginate()
  }

  ctrl.previousPage = function() {
    ctrl.page++
    ctrl.paginate();
  }

  ctrl.paginate();
}

angular
  .module('app')
  .controller('TopStoriesController', TopStoriesController)
