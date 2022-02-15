$("#inputText").keyup(function () {
    var inputText = $('#inputText').val();
    var wordArr = inputText.split(/,|\s+|\.|\?|\!|\:|;/);
    $("#AnswerBox").empty();
    $("#AnswerBox").append("<center><h4>Answer</h4></center>")
    for (var i = 0; i < wordArr.length; i++) {
        if (wordArr[i].length > 0) {
            $("#AnswerBox").append("<input type=\"checkbox\" class=\"form-check-input answerOption\" value=\"" + wordArr[i] + "\" id=\"word_" + i.toString() + "\">" + wordArr[i] + "<br>");
        }
    }
});

function getAllCheckedCheckBoxValue() {
    var checkBoxValueArr = [];
    $('input[type=checkbox].answerOption:checked').each(function () {
        var sThisVal = (this.checked ? $(this).val() : "");
        checkBoxValueArr.push(sThisVal);
    });
    return checkBoxValueArr;
}

$("#AnswerBox").on("change", ".answerOption", function () {
    // if ($(this).is(':checked')) {
    //     console.log($(this).val() + ' is now checked');
    // } else {
    //     console.log($(this).val() + ' is now unchecked');
    // }
    var checkBoxValueArr = getAllCheckedCheckBoxValue();
    var optionsText = "";
    for (var i = 0; i < checkBoxValueArr.length; i++) {
        optionsText += checkBoxValueArr[i] + "\n";
    }
    $('#optionsBox').val(optionsText);
});

$("#generateBtn").click(function () {
    var outputText = "";
    var outputRaw = "";

    // var activityType = $('#activityTypeSelectBox :selected').val();
    var instruction = $('#activityTypeSelectBox :selected').val();

    // switch (activityType) {
    //     case "Drag the text":
    //         instruction = "Read and choose. Drag";
    //         break;
    //     case "Grammar quiz":
    //         instruction = "Look and read. Choose";
    //         break;
    //     case "Picture label":
    //         instruction = "Look and read. Match";
    //         break;
    //     case "Mystery image":
    //         instruction = "Look, read and say.";
    //         break;
    //     case "True/False":
    //         instruction = "Look and read. Click";
    //         break;
    //     default:
    //         instruction = "";
    // }

    if (instruction.length > 0) {
        outputText += "<p class='font-weight-bold custom-font'>" + instruction + "</p>";
        outputRaw += instruction + "\n";
    }

    var imageText = $('#inputImage').val();

    if (imageText.length > 0) {
        outputText += "<p class='custom-font'>Image: " + imageText + "</p>";
        outputRaw += "Image: " + imageText + "\n";
    }

    var textRawInput = $('#inputText').val();

    var textInput = textRawInput.replace("\n", "<br>")

    if (textInput.length > 0) {
        outputText += "<p class='custom-font'>Text:<br>" + textInput + "</p>";
        outputRaw += "Text:\n" + textRawInput + "\n";
    }

    var optionText = "";
    var optionRawText = "";
    var optionsRaw = $('#optionsBox').val();
    var optionsRawArr = optionsRaw.split(/\n/);
    var checkBoxValueArr = getAllCheckedCheckBoxValue();

    for (var i = 0; i < optionsRawArr.length; i++) {
        if (optionsRawArr[i].length > 0) {
            var isAnswer = false;
            for (var j = 0; j < checkBoxValueArr.length; j++) {
                if (optionsRawArr[i] == checkBoxValueArr[j]) {
                    isAnswer = true;
                    break;
                }
            }
            if (isAnswer == true) {
                optionText += "<b>" + optionsRawArr[i] + "</b><br>"
            }
            else {
                optionText += optionsRawArr[i] + "<br>"
            }
            optionRawText += optionsRawArr[i] + "\n";
        }
    }

    if (optionText.length > 0) {
        outputText += "<p class='custom-font'>Options:<br>" + optionText + "</p>";
        outputRaw += "Options:\n" + optionRawText;
    }

    $("#outputArea").empty();
    $("#outputArea").append(outputText);

    $("#outputRawText").val(outputRaw);
});

$("#copyToClipBoardBtn").click(function () {
    var outputRawBox = $("#outputRawText");
    outputRawBox.select();
    navigator.clipboard.writeText(outputRawBox.val());
    $("#copyAlertArea").empty();
    $("#copyAlertArea").append("<div id='copyAlert' class=\"alert alert-success alert-dismissible fade show\" role=\"alert\"> \
                                    Ouput is copied successfully! Alert will disappear after 2s. \
                                    <button type=\"button\" class= \"close\" data-dismiss=\"alert\" aria-label=\"Close\"> \
                                        <span aria-hidden=\"true\">&times;</span> \
                                    </button> \
                                </div>");
    setTimeout(function() {
        $("#copyAlert").alert('close');
    }, 2000);
});