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
							  "max": 1,
							  "items": [
							    {
							      "name": "bubble",
							      "price": 50,
							      "available": true
							    },
							    {
							      "name": "pudding",
							      "price": 50,
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
							  "max": 1,
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
	console.log($scope.adjustedJSON["options"][0].name);
	$scope.count = [];
	console.log($scope.adjustedJSON["options"].length);
	console.log($scope.adjustedJSON["options"][0]["items"].length);

	_.times($scope.adjustedJSON["options"].length, function(i){
		$scope.count[i] = [];
	    _.times($scope.adjustedJSON["options"][i]["items"].length, function(j){
	    	$scope.count[i][j] = 0;
		});
	});
	//$scope.count[2][0]=4;
	console.log($scope.testJSON.options[0].max);


	$scope.queue = [];

	_.times($scope.adjustedJSON["options"].length, function(i){
		$scope.queue[i] = [];
	});

	$scope.addToQueue = function(index,item){

		$scope.queue[index].push(item);
		console.log($scope.queue[index]);
	}
	
	$scope.showCount = function(parentIndex,index){
		if($scope.count[parentIndex][index]>0){
			return true;
		}else{
			return false;
		}
	}


	$scope.add = function(parentIndex,index){
		//console.log("clicked");
		$scope.count[parentIndex][index]++;
		//console.log($scope.count[0][0]);
		$scope.addToQueue(parentIndex,$scope.adjustedJSON["options"][parentIndex]["items"][index]["name"]);
	}

	$scope.remove = function(parentIndex,index){
		//console.log("clicked");
		$scope.count[parentIndex][index]--;
		//console.log($scope.count[0][0]);
	}



});

app.filter('priceFilter', function() {
    return function(x) {
       return x/100;
    };
});