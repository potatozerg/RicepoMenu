var app = angular.module('starter.controllers', []);

app.controller('mainCtrl',function($scope){

	//test case
	$scope.testJSON = {
						"name": "Signature Milk Tea",
						"price": 325,
						"options": [
							{
							  "name": "Add On",
							  "min": 1,
							  "max": 0,
							  "items": [
							    {
							      "name": "bubble",
							      "price": 50,
							      "available": true
							    },
							    {
							      "name": "pudding",
							      "price": 80,
							      "available": true
							    }
							  ]
							},
							{
							  "name": "Tea",
							  "min": 1,
							  "max": 3,
							  "items": [
							      {
							        "name": "milk tea",
							        "price": 50,
							        "available": true
							      },
							      {
							        "name": "green milk tea",
							        "price": 0,
							        "available": true
							      }
							    ]
							},
							{
							  "name": "Size",
							  "min": 1,
							  "max": 1,
							  "items": [
							      {
							        "name": "Large",
							        "price": 300,
							        "available": true
							      },
							      {
							        "name": "Medium",
							        "price": 150,
							        "available": false
							      },
							      {
							        "name": "Small",
							        "price": 0,
							        "available": true
							      }
							    ]
							}
						]
					};

	$scope.price = $scope.testJSON.price;
	//get the array of options
	$scope.optionsArray = _.cloneDeep($scope.testJSON["options"]);

	//initiate the 2d array that stores the count of each iteam
	$scope.count = [];
	_.times($scope.optionsArray.length, function(i){
		$scope.count[i] = [];
	    _.times($scope.optionsArray[i]["items"].length, function(j){
	    	$scope.count[i][j] = 0;
		});
	});

	//initiate the queue, each option has its own queue
	$scope.queue = [];
	_.times($scope.optionsArray.length, function(i){
		$scope.queue[i] = [];
	});
	
	//whether show the count on the right
	$scope.showCount = function(parentIndex,index){
		if($scope.count[parentIndex][index] > 0){
			return true;
		}else{
			return false;
		}
	}

	//add function
	$scope.add = function(parentIndex,index){

		//get the privous total number of selections for an option
		let previousCount = 0;
		_.times($scope.count[parentIndex].length, function(i){
			previousCount += $scope.count[parentIndex][i];			
		});
		//console.log(previousCount);
		//if max == 0 there is no limit, just add
		if($scope.optionsArray[parentIndex]["max"] != 0){
			//check if it's max count already
			if(previousCount == $scope.optionsArray[parentIndex]["max"]){

				//find the first selected item, make its index --
				let pop = $scope.queue[parentIndex].shift();
				//add the new one to queue
				let tempIndex = 0;
				//find the popped item index
				for (var i = 0; i < $scope.optionsArray[parentIndex]["items"].length; i++) {
					if($scope.optionsArray[parentIndex]["items"][i]["name"] == pop){	
						break;
					}else{
						tempIndex++;
					}			
				}
				$scope.count[parentIndex][tempIndex]--;
				$scope.price -= $scope.optionsArray[parentIndex]["items"][tempIndex]["price"];
					
			}
		}
		//count it and add it to the queue
		$scope.count[parentIndex][index]++;
		$scope.addToQueue(parentIndex,$scope.optionsArray[parentIndex]["items"][index]["name"]);
		$scope.price += $scope.optionsArray[parentIndex]["items"][index]["price"];
	}

	//add an item to the queue
	$scope.addToQueue = function(parentIndex,item){

		$scope.queue[parentIndex].push(item);
	}

	//remove function
	$scope.remove = function(parentIndex,index){
		
		$scope.count[parentIndex][index]--;
		//remove the item in the queue
		$scope.removeFromQueue(parentIndex,$scope.optionsArray[parentIndex]["items"][index]["name"]);
		$scope.price -= $scope.optionsArray[parentIndex]["items"][index]["price"];
	}

	//remove an item from the queue
	$scope.removeFromQueue = function(parentIndex,item){

		//find the last element for the item and remove it
		let index = $scope.queue[parentIndex].lastIndexOf(item);
		$scope.queue[parentIndex].splice(index,1);	
	}

	//function that triggers after the price is clicked
	$scope.priceClicked = function(){

		$scope.checkMin();
		//if all options min meet the requirement
		if($scope.minIndex.length == 0){
			$scope.priceArray = [];
			console.log($scope.price/100);
			_.times($scope.queue.length, function(i){
				$scope.priceArray = $scope.priceArray.concat($scope.queue[i]);
			});
			console.log($scope.priceArray);
		}else{

			let alertString = "";
			_.times($scope.minIndex.length, function(i){
				alertString += $scope.optionsArray[$scope.minIndex[i]]["name"]+" need at least "+$scope.optionsArray[$scope.minIndex[i]]["min"]+"\n";
			});
			alert(alertString);

		}
	}
	//check which option is not satisfied
	$scope.checkMin = function(){
		$scope.minIndex = []
		_.times($scope.queue.length, function(i){
			if($scope.queue[i]<$scope.optionsArray[i]["min"]){
				$scope.minIndex.push(i);
			}
		});
	}
	//check if the item is disabled
	$scope.disabledAdd = function(parentIndex,index){
		//console.log($scope.optionsArray[parentIndex]["items"][index]["available"]);
		return !$scope.optionsArray[parentIndex]["items"][index]["available"];	
	}
});

//filter for price
app.filter('priceFilter', function() {
    return function(x) {
       return x/100;
    };
});