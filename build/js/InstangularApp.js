angular.module('InstangularApp',['ngAnimate'])
  .controller('instagramFetchCtrl', function($scope, $http){

    $scope.tag = '';
    $scope.searchInProgress = false;

    $scope.fetchPhotos = function(){
      if($scope.instaForm.$valid){
        $scope.invalidForm      = false;
        $scope.picturesReceived = false;
        $scope.searchInProgress = true;

        var url = "https://api.instagram.com/v1/tags/"+$scope.tag+"/media/recent";
        var request = {
            client_id: "2adb2ccf23734869b2634bb9f4721a4f",
            callback: "JSON_CALLBACK"
        };
        $scope.cachedTag = $scope.tag;

        $http({
            method: 'JSONP',
            url: url,
            params: request
        }).

        success(function(result) {
          $scope.searchInProgress = false;
          $scope.tag = '';

          if(result.data === undefined){
            $scope.inappropriateTag = true;
            $scope.noPictures       = false;
          } else if(result.data.length === 0){
            $scope.noPictures    = true;
            $scope.errorFetching = false;
          } else {
            $scope.errorFetching    = false;
            $scope.inappropriateTag = false;
            $scope.noPictures       = false;
            $scope.picturesReceived = result.data;
          }
        }).

        error(function() {
            $scope.errorFetching    = true;
            $scope.searchInProgress = false;
        });
      } else {
        $scope.invalidForm = true;
      }
    };

  });