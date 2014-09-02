angular.module('InstangularApp',['ngAnimate'])
  .controller('instagramFetchCtrl', function($scope, $http){

    $scope.tag = '';
    //Question for Jon, should all scopes be defined up here? I have a lot of booleans down there.

    $scope.fetchPhotos = function(){
      if($scope.instaForm.$valid){
        $scope.invalidForm = false;
        var url = "https://api.instagram.com/v1/tags/"+$scope.tag+"/media/recent";
        var request = {
            client_id: "2adb2ccf23734869b2634bb9f4721a4f",
            callback: "JSON_CALLBACK"
        };

        $http({
            method: 'JSONP',
            url: url,
            params: request
        }).

        success(function(result) {
          if(result.data === undefined){
            $scope.nothingReturned = true;
          } else {
            $scope.errorFetching    = false;
            $scope.nothingReturned  = false;
            $scope.picturesReceived = result.data;
          }
        }).

        error(function() {
            $scope.errorFetching   = true;
        });
      } else {
        $scope.invalidForm = true;
      }
    };

  });