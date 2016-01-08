       //var url = "http://localhost:3000";
       //var result = "connect";
       // console.log('connect');
       // $('#edit').on('click', getTestsList());
       // $('#delete').on('click', getUsers());
       // console.log('result');
       // getUsers = function() {
       //     $.ajax({
       //         url: url + "/users/all",
       //         context: document.body
       //     }).done(function () {
       //
       //     });
       // };
       //
       //getTestsList= function () {
       //     $.ajax({
       //         url: url + "/account/getTestlist/all",
       //         context: document.body
       //     }).done(function () {
       //
       //     });
       //
       // };
       //deleteTest = function(){
       //    "use strict";
       //    $.ajax({
       //        url: url + "/account/getTestlist/all",
       //        context: document.body
       //    }).done(function () {
       //
       //    });
       //}
       document.forms.upload.onsubmit = function() {
           var input = this.elements.myfile;
           var file = input.files[0];
           console.log('file');
           if (file) {

               upload(file);
           }
           return false;
       }