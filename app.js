// @ts-nocheck
(function () {
    document.getElementById("document")
        .addEventListener("change", handleFileSelect, false);

    function handleFileSelect(event) {
        readFileInputEventAsArrayBuffer(event, function (arrayBuffer) {
            mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then(displayResult)
                .done();
        });
    }

    function displayResult(result) {
        var copy = document.getElementById("output").innerHTML = result.value;
        document.getElementById("select-this").value = copy;
    }

    function readFileInputEventAsArrayBuffer(event, callback) {
        var file = event.target.files[0];

        var reader = new FileReader();

        reader.onload = function (loadEvent) {
            var arrayBuffer = loadEvent.target.result;
            callback(arrayBuffer);
        };

        reader.readAsArrayBuffer(file);
    }
})();

function myFunction() {
    document.getElementById("select-this").select();
}