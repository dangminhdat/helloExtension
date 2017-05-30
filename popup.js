$(function() {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "getFirstFormId" });
    });

    $('#checkPage').on('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, { "message": "start_to_fill_form", "formId": $('#formId').val() });
        });
    });
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "find_first_form") {
            $('#formId').val(request.formId);
        }
    }
);