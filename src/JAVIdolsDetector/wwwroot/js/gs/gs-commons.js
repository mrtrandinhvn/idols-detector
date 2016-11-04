module.exports = {
    isImage: function (url, callback) {// check if an url is an image
        var img = new Image();
        img.onerror = function () { callback(url, false); }
        img.onload = function () { callback(url, true); }
        img.src = url
    }
};