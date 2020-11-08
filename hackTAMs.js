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

var original;

function showOriginal(input) {

    original = input;

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#uploadedPic')
                .attr('src', e.target.result)
                .width(300);
        };

        reader.readAsDataURL(input.files[0]);
    }
}