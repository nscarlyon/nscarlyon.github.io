var Item = {
  bindings: {
    id: '='
  },
  templateUrl: 'views/item.html',
  controllerAs: 'item',
  controller: function(StoriesService) {
    var ctrl = this;

    StoriesService
      .getStory(this.id)
      .then(function(res) {
         ctrl.data = res.data
      })
  }
}

angular
  .module('app')
  .component('item', Item)
