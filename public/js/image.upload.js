function JSUploader() {
    this.allFiles = [];
    var baseClass = this;

    this.addFiles = function(files) {
        $.each(files, function(i, file) {
            var temp = {file: file, progressTotal: 0, progressDone: 0, element: null, valid: false};

            temp.valid = (file.type == 'image/png'
                || file.type == 'image/jpeg'
                || file.type == 'image/jpg') && file.size / 1024 / 1024 < 2;

            temp.element = baseClass.attachFileToView(temp);
            baseClass.allFiles.unshift(temp);
            if($('.img-fullsize')>0) {
                var address = $('.img-fullsize').attr('src');
                $('#address').val(address);
            }
        });
    };

    this.uploadFile =  function(index) {
        var file = baseClass.allFiles[index];
            var address = $('.img-fullsize').attr('src');
            $('#address').val(address);
        file.element.find('button.uploadButton').remove();
        baseClass.updateTotalProgress(100,100);
        baseClass.updateFileProgress(0,100,100, file.element);
    };

    this.uploadAllFiles =  function() {
        $.each(baseClass.allFiles, function(i, file) {
            baseClass.uploadFile(i);
        });
    };

    this.addAnswer = function () {
        var p = $('<p>');
        //
        var input = $('<input>');
        input.attr('type', 'text');
        input.attr('class', 'form-control input-spec .input-group');
        input.attr('style', 'margin-right:10px');
        input.attr('name', 'answer');
        //
        var checkbox = $("<input>", {
            "data-answer": true,
            "name": "correctAnswer_" + ($("[data-answer]").length),
            "style": "transform: scale(2); margin-left: 2em;",
            "type": "checkbox",
        });
        //
        //var checkbox = $('<input>');
        //checkbox.attr('name', 'correctAnswer');
        //checkbox.attr('style', 'margin-right:10px');
        //checkbox.attr('type', 'checkbox');
        //checkbox.attr('value', false);
        //
        //var checkbox2 = $('<input>');
        //checkbox2.attr('name', 'correctAnswer');
        //checkbox2.attr('type', 'checkbox');
        //checkbox2.attr('value', true);
        //
        p.append(input);
        p.append(checkbox);
        //p.append(checkbox2);
        $('#questionForm').append(p);
    };

    this.updateFileProgress = function(index, done, total, view) {
        var percent = (Math.floor(done/total*1000)/10);

        var progress = view.find('div.progress-bar');

        progress.width(percent + '%');
        progress.html(percent + '%');
    };

    this.updateTotalProgress = function(done, total) {
        var percent = (Math.floor(done/total*1000)/10);
        $('#progress').width(percent + '%');
        $('#progress').html(percent + '%');
    };

    this.totalProgressUpdated = function() {
        var done = 0.0;
        var total = 0.0;

        $.each(baseClass.allFiles, function(i, file) {
            done += file.progressDone;
            total += file.progressTotal;
        })

        baseClass.updateTotalProgress(done, total);
    };

    this.attachFileToView = function(file) {
        var row = $('<tr>');
        row.hide();

        var isValidType = (file.file.type == 'image/png'
        || file.file.type == 'image/jpeg'
        || file.file.type == 'image/jpg');

        var isValidSize = file.file.size / 1024 / 1024 < 2;

        //create preview
        var preview = $('<td>');
        preview.width('100px');
        if(isValidType)
        {
            var img = $('<img>');
            img.attr('class', 'img-fullsize');

            var reader = new FileReader();
            reader.onload = function (e) {
                img.attr('src', e.target.result);
            }
            reader.readAsDataURL(file.file);

            preview.append(img);
        }

        //create file info column
        var fileInfo = $('<td>');
        fileInfo.width('200px');

        var fileName = $('<div>');
        fileName.html(file.file.name);

        var fileType = $('<div>');
        fileType.html(file.file.type);

        var fileSize = $('<div>');
        var size = file.file.size;

        if((file.file.size / 1024 / 1024) > 1.0) {
            fileSize.html(Math.floor(file.file.size / 1024 / 1024) + ' MB');
        }
        else if((file.file.size / 1024) > 1.0) {
            fileSize.html(Math.floor(file.file.size / 1024) + ' KB');
        }
        else {
            fileSize.html(file.file.size + ' bytes');
        }


        fileInfo.append(fileName);
        fileInfo.append(fileType);
        fileInfo.append(fileSize);

        //create message column
        var messageColumn = $('<td>');
        messageColumn.attr('class', 'message');
        messageColumn.width('200px');
        if(!isValidType)
        {
            messageColumn.html('Unsupported mimetype ' + file.file.type);
        }
        if(!isValidSize) {
            messageColumn.html(messageColumn.html() + 'File size is ' + Math.floor(file.file.size / 1024 / 1024) + ' MB. Limit is2 MB.');
        }

        //create progress
        var progressColumn = $('<td>');
        progressColumn.attr('style', 'vertical-align: middle;');
        if(file.valid) {
        }

        //create buttons
        var button1 = $('<td>');
        button1.attr('style', 'vertical-align: middle; width:50px');

        var uploadButton = $('<button>');
        uploadButton.attr('class', 'btn btn-primary uploadButton');
        uploadButton.html('Upload');
        uploadButton.click(function(){
            baseClass.uploadFile(row.index());
        });
        if(file.valid) {
            button1.append(uploadButton);
        }

        var button2 = $('<td>');
        button2.width('50px');

        var removeButton = $('<button>');
        removeButton.attr('class', 'close');
        removeButton.html('&times');
        removeButton.click(function(){
            baseClass.allFiles.splice(row.index(), 1);
            row.fadeOut(300, function(){
                $(this).remove();
            });
        });
        button2.append(removeButton);

        row.append(preview);
        row.append(fileInfo);
        row.append(messageColumn);
        row.append(progressColumn);
        row.append(button1);
        row.append(button2);
        row.fadeIn();

        $('#files').prepend(row);

        return row;
    };
}

var uploader = new JSUploader();

$(document).ready(function()
{
    $("#addPossibleAnswer").click(function(){
        uploader.addAnswer();
    });

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
