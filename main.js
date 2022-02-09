
song_1 = "";
song_2 = "";
song1_status = "";
song2_status = "";
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
score_leftwrist = 0;
score_rightwrist = 0;

function preload() {
  song_1 = loadSound("song-1.mp3");
  song_2 = loadSound("song-2.mp3");
}
function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelloaded);
  poseNet.on("pose", gotPoses);
}
function modelloaded() {
  console.log("Posenet is initialised");
}
function gotPoses(results) {
  if (results.length > 0) {
      console.log(results);
    score_rightwrist = results[0].pose.keypoints[10].score;
    score_leftwrist = results[0].pose.keypoints[9].score;
    right_wrist_x = results[0].pose.rightWrist.x;
    right_wrist_y = results[0].pose.rightWrist.y;
    left_wrist_x = results[0].pose.leftWrist.x;
    left_wrist_y = results[0].pose.leftWrist.y;
  }
}
function draw() {
  image(video, 0, 0, 600, 500);
  console.log(score_rightwrist || " " || score_leftwrist);
  song1_status = song_1.isPlaying();
  song2_status = song_2.isPlaying();
  fill("#ff0000");
  stroke("#ff0000");
  if (score_rightwrist > 0.2) {
    circle(right_wrist_x, right_wrist_y, 20);
    song_2.stop();
    if (song1_status == false) {
      song_1.play();
      document.getElementById("song").innerHTML = "playing Night changes";
    }
  }

  if (score_leftwrist > 0.2) {
    circle(left_wrist_x, left_wrist_y, 20);
    song_1.stop();
    if (song2_status == false) {
      song_2.play();
      document.getElementById("song").innerHTML = "playing Blank space";
    }
  }
}
function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}
