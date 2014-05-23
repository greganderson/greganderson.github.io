var clockoutApp = angular.module('clockOut', ['ui.bootstrap', 'ui-rangeSlider']);

clockoutApp.controller('ClockCtrl', function ($scope,$timeout) {
	$scope.time = 0;
	$scope.hoursRemaining = 0;
	$scope.minutesRemaining = 0;
	$scope.secondsRemaining = 0;
    $scope.counter = 0;
	$scope.started = false;
	$scope.d = new Date();
	$scope.mytime = new Date();
	$scope.ampm = 'null';
	$scope.h = 0;
	$scope.m = 0;

	// For the sliders
	$scope.hoursWorked = 20;
	$scope.granularity = 0;

	var TimepickerDemoCtrl = function ($scope) {
		$scope.mytime = new Date();
	};

    $scope.onTimeout = function() {
        $scope.counter -= .01;
		var total = $scope.counter / 60 / 60;
		$scope.hoursRemaining = parseInt(total);
		total = (total - $scope.hoursRemaining) * 60;
		$scope.minutesRemaining = parseInt(total);
		total = (total - $scope.minutesRemaining) * 60;
		$scope.secondsRemaining = total.toFixed(2);

		if ($scope.counter.toFixed(2) == 300) {
			document.getElementById("five_minutes").play();
		}
		if ($scope.counter.toFixed(2) == 60) {
			document.getElementById("one_minute").play();
		}
		if ($scope.counter.toFixed(2) == 0) {
			$timeout.cancel(mytimeout);
			document.getElementById("warning").play();
		}
		else
			mytimeout = $timeout($scope.onTimeout,10);
    }

	$scope.start = function(time) {
		// Prevent user from starting more than once
		if ($scope.started)
			return;
		$scope.started = true;
		var time = $scope.hoursWorked + ($scope.granularity * .01);
		// - 30 at the end for the buffer
		var total = ((40.0 - time) * 60 * 60) - 30;
		
		var overHours = $scope.d.getHours() - $scope.h;
		var overMinutes = $scope.d.getMinutes() - $scope.m;

		total = total - (overHours * 60 * 60) - (overMinutes * 60);

		$scope.counter = total;

		var mytimeout = $timeout($scope.onTimeout,10);
	}




	/**************************** UMAIR START ************************/

	$scope.reset = function() {
		$scope.started = false;
		$scope.message = "";
		$scope.hoursWorked = 20;
		$scope.granularity = 0;
		
		$scope.counter = 0;
		$scope.hoursRemaining = 0;
		$scope.minutesRemaining = 0;
		$scope.secondsRemaining = 0;
		$timeout.cancel(mytimeout);
	}

	$scope.calculate = function (clockInTime) {
		var hoursWorked = $scope.hoursWorked + ($scope.granularity * .01);
		if(hoursWorked && clockInTime) {
			var timeArray, hour, minutes, totalTime, timeLeft;  
			
			var timeClockedIn = new Date(clockInTime);


			hour = timeClockedIn.getHours();
			minutes = timeClockedIn.getMinutes();

			timeLeft = 40 - hoursWorked;

			$scope.h = parseInt(hour);
			$scope.m = parseInt(minutes);

			$scope.start(hoursWorked);
			
			$scope.message = calculateTime(timeLeft, hour, minutes) + ' ' + this.ampm;
		}
	};
	
	var calculateTime = function(timeLeft, hour, minutes) {
		// Flag to check if timeLeft is a float
		var check = timeLeft.toString().indexOf(".");

		if(check === -1) {
			hour = +timeLeft + +hour;
		
			determineMeridiem(hour);

			hour = hour % 12;

			if (hour == 0)
				hour = 12;
			if (minutes < 10)
				minutes = '0' + minutes;
			
			return (hour + ':' + minutes);
		}
		else {
			var accumulatedTimeArray, hrs, tempMin,  min; 

			accumulatedTimeArray = timeLeft.toString().split('.');
			
			hrs = (accumulatedTimeArray[0]);
			tempMin = accumulatedTimeArray[1];

			tempMin = "0." + tempMin;

			min = parseFloat(tempMin);

			min = (min * 60);

			hour = +hour + +hrs; 
			minutes = (+minutes + +min);

			if(minutes > 59) {
				hour++;
				minutes = +minutes - 60;
			}
		
			minutes = parseInt(minutes);

			console.log('Minutes ' + minutes);
			if(minutes < 10){
				minutes = "0" + minutes;
			}
			
			determineMeridiem(hour);
			
			hour = hour % 12;

			if (hour == 0) {
				hour = 12;
			}

			return (hour + ':' + minutes); 
		}
	
	};
	
	/* Determines whether time has changed from
	 * AM to PM and vice versa.
	 */
	var determineMeridiem = function(hour) {
		console.log('Hour is: ' + hour);	
		if(hour > 11 && hour < 24)
			$scope.ampm = 'PM';
		else
			$scope.ampm = 'AM';
	};
	
	$scope.display = function() {
		return this.message;	
	};
});
