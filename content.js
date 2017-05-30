// content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "getFirstFormId") {
            var firstForm = $('form').first().attr('id');
            chrome.runtime.sendMessage({ "message": "find_first_form", "formId": firstForm });
        }

        if (request.message === "start_to_fill_form") {
            var formId = request.formId;
            var root = $('#' + formId);
            fillOutForm(root);
        }
    }
);

function randomName() {
    var words = ['Rock', 'Paper', 'Scissors', 'This', 'form', 'allows', 'you', 'to', 'generate', 'random'];
    return words[Math.floor(Math.random() * words.length - 1)];
}

function randomNumber(length) {
    var possible = "0123456789";
    var text = "";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function getRandomEmail(length) {
    var domain = randomName();
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + "@" + domain + ".com";
}

var email = getRandomEmail("@domain.com", 15);

function fillOutForm(root) {
    var emailRex = "/email/";
    var inputTexts = root.find("input[type=text]");
    inputTexts.each(function() {
        var t = $(this).attr('id') + $(this).attr('name');
        if (t.toLowerCase().indexOf('email') >= 0) {
            $(this).val(getRandomEmail(10));
        } else
        if (t.toLowerCase().indexOf('code') >= 0) {
            $(this).val(randomNumber(6));
        } else
        if (t.toLowerCase().indexOf('phone') >= 0) {
            $(this).val(randomNumber(10));
        } else {
            $(this).val(randomName());
        }
    });

    root.find("input[type=password]").val("123567");
    root.find("input[type=checkbox]").prop('checked', 'checked');;

    root.find("select").each(function() {
        $(this).find('option').last().attr('selected', true);
    });

    root.find('#BirthdayYear').val('1993');
}