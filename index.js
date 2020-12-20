function findNumberConnected3(x, y, data){
    var stack = [];
    var connectedPoints = [];
    var dragEndPointX = 0;
    var dragEndPointY = 0;
    var dragStartPointX = 0;
    var dragStartPointY = 0;
    stack.push([x, y]);
    var check = (data[x][y] == 0) ? 0 : 1;
    var set = (check == 1) ? 0 : 1;
    while (stack.length != 0){
        var point = stack.pop();
        if (data[point[0]][point[1]] == check){
            data[point[0]][point[1]] = set;
            if (point[0] > dragEndPointY)
               dragEndPointY = point[0];
            if (point[1] > dragEndPointX)
               dragEndPointX = point[1];  
            if (point[0] < dragStartPointY)
               dragStartPointY = point[0];
            if (point[1] < dragStartPointX)
               dragStartPointX = point[1]; 
            connectedPoints.push(point);
            if (point[0] + 1 < data.length)
               stack.push([point[0] + 1, point[1]]);
               
            if (point[0] - 1 >= 0)
               stack.push([point[0] - 1, point[1]]);
               
            if (point[1] - 1 >= 0)
               stack.push([point[0], point[1] - 1]);
               
            if (point[1] + 1 < data[0].length)
               stack.push([point[0], point[1] + 1]);   

        }
    }
    return connectedPoints;

};

function upload(e){
    var reader = new FileReader();

    reader.onload = function (event){
        var myImg = new Image();

        myImg.onload = function(){

            var imgCanvas = document.getElementById("imgCanvas");
            var ctx = imgCanvas.getContext("2d");

            ctx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
            ctx.drawImage(myImg, 0, 0, myImg.width, myImg.height);

            var img2DArray = convertCanvasInto2DArray("imgCanvas");
            var connectedPoints = findNumberConnected3(cursorY = 0, cursorX = 0, img2DArray);

            for (var i = 0; i < connectedPoints.length; ++i){
                var x = connectedPoints[i][0];
                var y = connectedPoints[i][1];
                ctx.clearRect(y, x, 1, 1);
            }

            merge();

        }
        myImg.src = event.target.result;
    }

    reader.readAsDataURL(e.target.files[0]);

};

function merge(){
    var outputCanvas = document.getElementById("outputCanvas");
    var ctx = outputCanvas.getContext("2d");

    ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);

    var genCanvas = document.getElementById("genCanvas");
    ctx.drawImage(genCanvas, 0, 0);

    var imgCanvas = document.getElementById("imgCanvas");
    ctx.drawImage(imgCanvas, 0, 0);
};

function convertCanvasInto2DArray(canvasName){
    const canvas = document.getElementById(canvasName);
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    console.log(imageData);

    var binaryArray = [];
    for (var i = 0; i < imageData.length; i+= (4 * canvas.width)){
        var tempArray = [];
        for (var j = i; j < i + (4 * canvas.width); j += 4){
            var pixelAvg = ((imageData[j] + imageData[j + 1] + imageData[j + 2]) / 3);
            if (pixelAvg < 140){
                tempArray.push(0);
            }else{
                tempArray.push(1);
            }
        }
        binaryArray.push(tempArray);
    }
    return binaryArray;

};

function draw1(){
    var c = document.getElementById("genCanvas");
    
    var ctx=c.getContext("2d")
    ctx.clearRect(0,0,240,480);


    merge();
    
}


function draw2(){
    var c = document.getElementById("genCanvas");
    
    var ctx=c.getContext("2d")
    ctx.clearRect(0,0,240,480);


    merge();
    
}



function draw3(){
    var c = document.getElementById("genCanvas");
    var ctx=c.getContext("2d")
    ctx.clearRect(0,0,240,480);


    merge();
    
}



