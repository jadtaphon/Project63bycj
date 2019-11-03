function myTest(){
    var app = angular.module('MyApp', []);
    app.controller('myController', ['$scope', myCo]);

    var data = [];

    function myCo($scope) {
    $scope.uploadExcel = function(){
        var myFile = document.getElementById('file');
        var input = myFile;
        var reader = new FileReader()
            reader.onload=function(){
                var fileData = reader.result;
                var workbook = XLSX.read(fileData, {type: 'binary'});
                workbook.SheetNames.forEach(function(sheetName){
                    var rowOj = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    data = rowOj;
                });
                for(var i = 0; i< data.length; i++){
                    var datas = data[i];
                    console.log(data[i]);
                }
            };
            reader.readAsBinaryString(input.files[0])
        } 
    }
};

