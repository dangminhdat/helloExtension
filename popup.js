document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            try {
                var url = document.getElementById('tabUrl');
                url.value = tab.url;
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                alert('Copying text command was ' + msg);
            } catch (err) {
                alert('Oops, unable to copy');
            }
        });
    }, false);
}, false);

// event handler
function copy(e) {

    // find target element
    var
        t = e.target,
        c = t.dataset.copytarget,
        inp = (c ? document.querySelector(c) : null);

    // is element selectable?
    if (inp && inp.select) {

        // select text
        inp.select();

        try {
            // copy text
            document.execCommand('copy');
            inp.blur();
        } catch (err) {
            alert('please press Ctrl/Cmd+C to copy');
        }
    }

}