function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'app/member/skills/skills.html',
    controller: 'SkillsMemberController',
    controllerAs: 'skillsMemberCtrl',
    bindToController: true
  };
}
