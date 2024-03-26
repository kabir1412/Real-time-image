function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  classifier = ml5.imageClassifier('Mobilenet', modelLoaded);
}

function modelLoaded(){
console.log("Model loaded!");
}


function draw(){
image(video, 0, 0, 300, 300);
classifier.classify(video, gotResults);
}

var previous_result = "";

function gotResults(error, results){
if(error){
console.log(error);
}  
else{
if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
console.log(results);
previous_result = results[0].label;
var synth = window.speechSynthesis;
speak_data = 'Object detected is ' + results[0].label;
utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);

document.getElementById("result_span").innerHTML = results[0].label;
document.getElementById("accuracy_span").innerHTML = results[0].confidence.toFixed(3);
}

}
}



