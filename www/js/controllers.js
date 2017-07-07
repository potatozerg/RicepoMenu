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
							  "max": 3,
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
							  "max": 1,
							  "items": [
							      {
							        "name": "milk tea",
							        "price": 0,
							        "avilable": true
							      },
							      {
							        "name": "green milk tea",
							        "price": 0,
							        "avilable": true
							      }
							    ]
							},
							{
							  "name": "Size",
							  "min": 1,
							  "max": 3,
							  "items": [
							      {
							        "name": "Large",
							        "price": 0,
							        "avilable": true
							      },
							      {
							        "name": "Medium",
							        "price": 0,
							        "avilable": true
							      },
							      {
							        "name": "Small",
							        "price": 0,
							        "avilable": true
							      }
							    ]
							}
						]
					};

	$scope.price = $scope.testJSON.price;
	$scope.adjustedJSON = _.cloneDeep($scope.testJSON);
	delete $scope.adjustedJSON["name"];
	delete $scope.adjustedJSON["price"];

	//initiate the 2d array that stores the count of each iteam
	$scope.count = [];
	_.times($scope.adjustedJSON["options"].length, function(i){
		$scope.count[i] = [];
	    _.times($scope.adjustedJSON["options"][i]["items"].length, function(j){
	    	$scope.count[i][j] = 0;
		});
	});

	//initiate the queue, each option has its own queue
	$scope.queue = [];
	_.times($scope.adjustedJSON["options"].length, function(i){
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
		if($scope.adjustedJSON["options"][parentIndex]["max"] != 0){
			//check if it's max count already
			if(previousCount == $scope.adjustedJSON["options"][parentIndex]["max"]){

				//find the first selected item, make its index --
				let pop = $scope.queue[parentIndex].shift();
				//add the new one to queue
				let tempIndex = 0;
				//find the popped item index
				for (var i = 0; i < $scope.adjustedJSON["options"][parentIndex]["items"].length; i++) {
					if($scope.adjustedJSON["options"][parentIndex]["items"][i]["name"] == pop){	
						break;
					}else{
						tempIndex++;
					}			
				}
				$scope.count[parentIndex][tempIndex]--;
				$scope.price -= $scope.adjustedJSON["options"][parentIndex]["items"][tempIndex]["price"];
				//console.log($scope.count[parentIndex][tempIndex]);	
			}
		}
		//count it and add it to the queue
		$scope.count[parentIndex][index]++;
		$scope.addToQueue(parentIndex,$scope.adjustedJSON["options"][parentIndex]["items"][index]["name"]);
		$scope.price += $scope.adjustedJSON["options"][parentIndex]["items"][index]["price"];
	}

	//add an item to the queue
	$scope.addToQueue = function(parentIndex,item){

		$scope.queue[parentIndex].push(item);
		console.log($scope.queue[parentIndex]);
	}

	//remove function
	$scope.remove = function(parentIndex,index){
		
		$scope.count[parentIndex][index]--;
		//console.log($scope.count[0][0]);
		//remove the item in the queue
		$scope.removeFromQueue(parentIndex,$scope.adjustedJSON["options"][parentIndex]["items"][index]["name"]);
		$scope.price -= $scope.adjustedJSON["options"][parentIndex]["items"][index]["price"];
	}

	//remove an item from the queue
	$scope.removeFromQueue = function(parentIndex,item){

		//console.log("item: "+item);
		//find the last element for the item and remove it
		let index = $scope.queue[parentIndex].lastIndexOf(item);
		$scope.queue[parentIndex].splice(index,1);
		console.log($scope.queue[parentIndex]);		
	}

	//function that triggers after the price is clicked
	$scope.priceClicked = function(){

		if(1){
			$scope.priceArray = [];
			console.log($scope.price/100);
			_.times($scope.queue.length, function(i){
				$scope.priceArray = $scope.priceArray.concat($scope.queue[i]);
			});
			console.log($scope.priceArray);

		}else{

		}
	}
});

//filter for price
app.filter('priceFilter', function() {
    return function(x) {
       return x/100;
    };
});