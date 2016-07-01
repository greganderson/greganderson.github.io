var christmasApp = angular.module('christmasApp', []);

christmasApp.component('christmasApp', {
    templateUrl: 'main.html',
    controller: christmasController
});

function christmasController() {
    var ctrl = this;

    ctrl.familyList = [];
    ctrl.numFamilies = 10;

    ctrl.range = function(max) {
        ctrl.familyList = [];
        var input = [];
        for (var i = 1; i <= max; i++) {
            input.push(i);
            ctrl.familyList.push(i);
        }
        return input;
    }

    ctrl.blamo = function() {
        console.log('yay');
    }

    ctrl.wham = function() {
        console.log(ctrl.familyList);
        console.log(ctrl.stuff);
    }
}
