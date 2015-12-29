url = "localhost:3000";
console.log('connect');
$('#getTests').on('click',getTestsList());
$('#getUsers').on('click',getUsers());

function getUsers(){
    $.ajax({
        url: url+"/account/getUsers",
        context: document.body
    }).done(function() {

    });
}
function getTestsList(){
    $.ajax({
        url: url+"/account/getTestlist",
        context: document.body
    }).done(function() {

    });
}
