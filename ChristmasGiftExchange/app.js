var christmasApp = angular.module('christmasApp', []);

christmasApp.component('christmasApp', {
    templateUrl: 'main.html',
    controller: christmasController
});

function christmasController() {
    var ctrl = this;

    ctrl.myfunc = function() {
        console.log('got called');
    };
}
