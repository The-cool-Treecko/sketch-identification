function preload(){
    classifier = ml5.imageClassifier("DoodleNet", modelLoaded);
}

function modelLoaded(){
    console.log("model is loaded.");
}

function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    background("white");
    canvas.mouseReleased(canvasClassify);
    synth = window.speechSynthesis;
}

function canvasClassify(){
    classifier.classify(canvas,gotResults);
}

function gotResults(error,results){
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        label = results[0].label;
        confidence = Math.round(results[0].confidence*100);
        document.getElementById("label").innerHTML = "Object: "+ label;
        document.getElementById("accuracy").innerHTML = "Accuracy: "+ confidence + "%";
        utterThis = new SpeechSynthesisUtterance(label);
        synth.speak(utterThis);
    }
}

function draw(){
    stroke(0,0,0);
    strokeWeight(4);
    if (mouseIsPressed) {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function clearCanvas(){
    background("white");
    document.getElementById("label").innerHTML = "Object:";
    document.getElementById("accuracy").innerHTML = "Accuracy:";
}