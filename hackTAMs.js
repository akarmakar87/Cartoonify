// JavaScript source code

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const arr = new Uint8ClampedArray(40000);

for (let i = 0; i < arr.length; i += 4) {
  arr[i + 0] = 0;
  arr[i + 1] = 255;
  arr[i + 2] = 0;
  arr[i + 3] = 255;
}

let imageData = new ImageData(arr, 200);
ctx.putImageData(imageData, 20, 20);

var origImg;

//console.log();

function showOriginal() {
    origImg = document.getElementById("upload_original").value;
    alert(origImg);
//    document.getElementById("upload_original").src = value
}