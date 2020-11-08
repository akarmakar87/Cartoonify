// JavaScript source code

var original;
var origWidth;
var origHeight;
var fileObject;

function showOriginal(input) {
    alert("reached");
    original = input;

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#uploadedPic').attr('src', e.target.result)

            var imgOrig = document.getElementById("uploadedPic");
            origWidth = imgOrig.width;
            origHeight = imgOrig.height;

            $('#uploadedPic')
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function pixels() {

    // alert(1);

    var img = document.getElementById("uploadedPic");

    // createCanvas(origWidth, origHeight);
    $("#canvas").width(img.width).height(img.height);

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    
    // alert(2);

    var imgData = ctx.getImageData(0, 0, origWidth, origHeight);

    const tempArr = new Uint8ClampedArray(origWidth * origHeight);
    for (let i = 0; i < imgData.data.length; i += 4) {
        // alert(imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]);
        let ind = i / 4;
        let row = ind / origWidth;
        let col = ind % origWidth;
        let adj = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        let up = (row > 0);
        if (up) {
            let upInd = (ind - origWidth) * 4;
            adj[0] = imgData.data[upInd];
            adj[1] = imgData.data[upInd + 1];
            adj[2] = imgData.data[upInd + 2];
        }
        let down = (row < origHeight-1);
        if (down) {
            let downInd = (ind + origWidth) * 4;
            adj[3] = imgData.data[downInd];
            adj[4] = imgData.data[downInd + 1];
            adj[5] = imgData.data[downInd + 2];
        }
        let left = (col > 0);
        if (left) {
            let leftInd = (ind - 1) * 4;
            adj[6] = imgData.data[leftInd];
            adj[7] = imgData.data[leftInd + 1];
            adj[8] = imgData.data[leftInd + 2];
        }
        let right = (col < origWidth-1);
        if (right) {
            let rightInd = (ind + 1) * 4;
            adj[9] = imgData.data[rightInd];
            adj[10] = imgData.data[rightInd + 1];
            adj[11] = imgData.data[rightInd + 2];
        }

        let err1 = adj[0] + adj[1] + adj[2];
        let err2 = adj[3] + adj[4] + adj[5];
        let err3 = adj[6] + adj[7] + adj[8];
        let err4 = adj[9] + adj[10] + adj[11];

        let err = err1 + err2 + err3 + err4;
        // console.log(adj[0] + " " + adj[1] + " " + adj[2] + " " + adj[3]);
        // alert(err1 + " " + err2 + " " + err3 + " " + err4);
        // console.log(err);
        if (err > 1000) {
            tempArr[ind] = true;
        } else {
            tempArr[ind] = false;
        }
    }

    // alert(3);

    for (let i = 0; i < imgData.data.length; i += 4) {
        ind = i / 4;
        if (tempArr[ind]) {
            imgData.data[i] = 0;
            imgData.data[i + 1] = 0;
            imgData.data[i + 2] = 0;
        } else {
            imgData.data[i] = 255;
            imgData.data[i + 1] = 255;
            imgData.data[i + 2] = 255;
        }
    }
   
    ctx.putImageData(imgData, 0, 0);
};

function pixelss() {
    var img = document.getElementById("uploadedPic");

    $("#canvas").width(img.width).height(img.height);

    alert(img.width + " " + img.height);

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var imgData = ctx.getImageData(0, 0, origWidth, origHeight);

    for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i + 1] = 255 - imgData.data[i + 1];
        imgData.data[i + 2] = 255 - imgData.data[i + 2];
        imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
    alert("reached");

};

// function createCanvas(w, h) {
//     let frame = document.getElementById('processedFrame');
//     let canvasElement = `<canvas id='canvas' width="` + w + `"; height="` + h + `";>
//                         Your browser does not support the HTML5 canvas tag.
//                         </canvas>`;
//     frame.innerHTML = canvasElement;
// }

// function download() {
//     var button = document.getElementById('downloadCanvas');
//     button.addEventListener('click', function (e) {
//         var dataURL = canvas.toDataURL('image/png');
//         button.href = dataURL;
//     });
// }