'use strict';

$(document).ready(function () {
    let arr = [];
    const inputTag = $("#inputcontent");
    const outputTag = $("#outputcontent");
    const errorMsg = $("#errormsg");
    inputTag.click(clearResult);
    $("#btn").click(displayOutput);

    function clearResult(){
        inputTag.val("");
        errorMsg.html("");
        outputTag.val("");
    }

    function historyList(input, result) {
        let row = '<tr><td>' + input + '</td><td>' + result + '</td></tr>';
        $("tbody").append(row);
        arr.push(row);
        if (arr.length > 10) {
            $("tbody").find("tr").eq(1).remove();
            arr.shift();
        }
    }


    function expressServer(inputContent) {
        let radio = $(".choose input[name='trans']:checked").val();
        $.get("/" + radio + "?code=" + inputContent)
            .done((data, status) => {
                getData(data,inputContent)
            })
    }

    function getData(data,inputContent){
        if (!data.success) {
            outputTag.val("");
            errorMsg.html(data.data);
        } else {
            errorMsg.html("");
            outputTag.val(data.data);
            historyList(inputContent, data.data);
        }
    }

    function displayOutput() {
        let inputContent = inputTag.val();
        if ((inputContent === "") || (inputContent === null)) {
            errorMsg.html("Empty! Please input the relevant code!.");
        } else {
            expressServer(inputContent);
        }
    }

});

