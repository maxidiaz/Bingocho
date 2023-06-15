const Sounds = (function () {
  let Game;
  const audios = {
    "btn_pressed": document.querySelector("#btn_pressed_audio"),
    "full_line": document.querySelector("#full_line_audio"),
    "win": document.querySelector("#win_audio"),
    "shuffle": document.querySelector("#shuffle_audio"),
    "new_ball": document.querySelector("#new_ball_audio")
  }

  return {
    setup: (_game) => {
      Game = _game
    },
    play: (audio) => {
      if (Game.Settings.isSoundEnabled) {
        audios[audio].play()
      }
    }
  }
})()