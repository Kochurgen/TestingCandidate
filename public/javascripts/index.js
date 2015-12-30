+function($, undefined) {
//    window.tResult = function() {
       var url = "http://localhost:3000";
        console.log('connect');
        $('#edit').on('click', getTestsList());
        $('#delete').on('click', getUsers());

  window.getUsers = function() {
            $.ajax({
                url: url + "/users",
                context: document.body
            }).done(function () {

            });
        };

  window.getTestsList= function () {
            $.ajax({
                url: url + "/account/getTestlist",
                context: document.body
            }).done(function () {

            });
        };
//    }
}(jQuery);