function JSEdit() {
    this.allFiles = [];
    var baseClass = this;
    baseClass.editor = function(name){
        $.ajax({
            url: '/account/testEditor',
            method:"POST",
            data: {name: name},
            timeout: 2000,
            success: function(result){

            }});

    }
}

var edit = new JSEdit();

$(document).ready(function()
{
    var name = document.edit;
    var startName = document.test;
    if(name) {
        if (document.test.toString() == "[object HTMLFormElement]") {
            for (var i = 0; i < name.length; i++) {
                name.testName.value = startName.testName.value;
            }
        } else {
            for (var i = 0; i < name.length; i++) {
                name[i].testName.value = startName[i].testName.value;
            }
        }
    }
    $(".edit").click(function(event){

        //edit.editor(name)
    });
    var email = document.wathResalt;
    var email2 = document.users;
    if(email) {
        for (var i = 0; i < email.length; i++) {
            email[i].email.value = email2[i].email.value;
        }
    }
    $("#addFilesButton").click(function() {
        $("#uploadFiles").replaceWith($("#uploadFiles").clone(true));
        $("#uploadFiles").click();
    });

    $("#uploadAllFilesButton").click(function() {
        uploader.uploadAllFiles();
    });

    $("#uploadFiles").change(function() {
        var files = this.files;

        uploader.addFiles(files);
    });

});