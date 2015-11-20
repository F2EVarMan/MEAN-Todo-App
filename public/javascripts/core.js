var scotchTodo = angular.module('scotchTodo',[]);

function mainController($scope,$http){
	$scope.formData={};

	//请求接口 获得所有todos
	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data)
		})
		.error(function(data){
			console.log('error:' + data)
		})

		//创建todo
	$scope.createTodo = function(){
		$http.post('/api/todos',$scope.formData)
		.success(function(data){
			 $scope.formData = {};
             $scope.todos = data;
             console.log(data);
		})
	}
	   // 删除
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };	
}