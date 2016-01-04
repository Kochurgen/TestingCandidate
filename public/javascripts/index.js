+function($, undefined) {
       var url = "http://localhost:3000";
       var result = "connect";
        console.log('connect');
        $('#edit').on('click', getTestsList());
        $('#delete').on('click', getUsers());

  getUsers = function() {
            $.ajax({
                url: url + "/users",
                context: document.body
            }).done(function () {

            });
        };

  getTestsList= function () {
            $.ajax({
                url: url + "/account/getTestlist",
                context: document.body
            }).done(function () {

            });
        };
    return result;
}(jQuery);