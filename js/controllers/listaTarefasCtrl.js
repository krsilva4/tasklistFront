angular.module("tasklist").controller("listaTarefasCtrl", function ($scope, $http) {
	$scope.cabecalho = "Lista de tarefas";
	$scope.tarefas = [];
	$scope.tarefasApi = [];
	$scope.id = 0;
	$scope.titulo = "";
	$scope.status = false;
	//local
	//var url = "http://localhost:8080/task";
	
	//local
	 var url = "https://tasklistbbackend.herokuapp.com/task";


	//Realizar tratamento para obter descricao de status.
	function obterDescricaoStatus(status) {
		if(status){
			return "Concluido";
		}else{
			return "Pendente";
		}
	}
	
	$scope.statusDescricao = obterDescricaoStatus(false);

	//Realizar tratamento para obter descricao de status.
	function tratarStatus(tarefasApi) {
		$scope.tarefas = [];
		tarefasApi.forEach(function (item, indice, array) {
			item.selecionado = obterDescricaoStatus(item.status);
			$scope.tarefas.push(item);
		});
	}

	//Busca todas as tarefas da base.
	var carregarTask = function () {
		$http.get(url).success(function (data) {
			$scope.tarefasApi = data;
			tratarStatus($scope.tarefasApi);
		}).error(function (data, status) {
			alert("Aconteceu um problema: " + data + status);
		});
	};
	 carregarTask();
	//Carregamento de variaveis.
	$scope.selecionar = function (tarefa) {
		$scope.id = tarefa.id;
		$scope.titulo = tarefa.titulo;
		$scope.status = tarefa.status;
		$scope.statusDescricao = obterDescricaoStatus($scope.status);
	};

	//Carregamento de variaveis.
	$scope.isCheck = function () {
		$scope.statusDescricao = obterDescricaoStatus($scope.status);
	};

	//Salvar tarefa na base.
	$scope.salvar = function () {
		var request = {};
		request.titulo = $scope.titulo;
		request.status = $scope.status;
		$http.post(url, request).success(function (data) {
			alert('Salvo com Sucesso');
			carregarTask();
		}).error(function (data, status) {
			alert("Aconteceu um problema: " + status);
		});
	};
	//Salvar atualiza tarefa na base.
	$scope.atualizar = function () {
		var request = {};
		request.id = $scope.id;
		request.titulo = $scope.titulo;
		request.status = $scope.status;

		$http.put(url, request).success(function (data) {
			alert('Aterado com Sucesso');
			carregarTask();
		}).error(function (data, status) {
			alert("Aconteceu um problema: " + status);
		});
	};

	//Apagar tarefa na base.
	$scope.apagar = function (id) {
		$http.delete(url + "/"+ id).success(function (data) {
			alert('Excluido com Sucesso');
			carregarTask();
		}).error(function (data, status) {
			alert("Aconteceu um problema: " + status);
		});
	};

	//Consistencia de entrada.
	$scope.validarEntrada = function () {
		return !$scope.titulo.length > 0;
	};
	
});