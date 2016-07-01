var christmasApp = angular.module('christmasApp', []);

christmasApp.component('christmasApp', {
    templateUrl: 'main.html',
    controller: christmasController
});

function christmasController() {
    var ctrl = this;

    ctrl.familyList = [];

    ctrl.myfunc = function() {
        console.log('got called');
        console.log(ctrl.numFamilies)
    };

    ctrl.range = function(max) {
        var input = [];
        for (var i = 1; i <= max; i++) {
            input.push(i);
        }
        return input;
    }
}
