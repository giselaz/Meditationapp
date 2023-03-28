const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //SOUNDS
  const sound = document.querySelectorAll(".sound-picker button");
  const timeDisplay = document.querySelector(".time-display");
  const timePicker = document.querySelectorAll(".time-select button");
  let fakeDuration = 600;
  const outlineLength = outline.getTotalLength();
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Pick different sounds
  sound.forEach((sound) => {
    sound.addEventListener("click", () => {
      song.src = sound.dataset.sound;
      video.src = sound.dataset.video;
      checkPlaying(song);
    });
  });
  //Play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  timePicker.forEach((time) => {
    time.addEventListener("click", () => {
      fakeDuration = time.dataset.time;
      console.log(fakeDuration);
      timeDisplay.textContent = `${Math.floor(
        fakeDuration / 60
      )} : ${Math.floor(fakeDuration % 60)}`;
    });
  });

  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./images/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./images/play.svg";
    }
  };

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    seconds = Math.floor(elapsed % 60);
    minutes = Math.floor(elapsed / 60);
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;

    outline.style.strokeDashoffset = progress;
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./images/play.svg";
      video.pause();
    }
  };
};
app();
