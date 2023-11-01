function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'templates/member.html',
    controller: function () {
      this.member = member;
    },
    controllerAs: 'member'
  };
}