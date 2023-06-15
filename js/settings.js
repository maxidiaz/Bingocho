const Settings = (function () {
  let Game;

  let markerColor = "#FF0000";
  let cartonColor = "#0000FF";

  const $settingsBtn = document.querySelector("#settings_btn");
  const $closeSettingsBtn = document.querySelector("#close_settings_btn");

  const $settingsSection = document.querySelector("#settings");

  const $enableSoundBtn = document.querySelector("#enableSoundBtn");
  const $enableSoundBtnIcon = $enableSoundBtn.children[0];

  const $colorSelector = document.querySelector("#colorSelector");
  const $markerColorSelector = document.querySelector("#colorSelectorMarker");
  const $reloadCartonBtn = document.querySelector("#reloadCartorBtn");

  const Settings = {
    isSoundEnabled: true,
  };

  Settings.setup = function (_game) {
    Game = _game;
    Game.setSettings(this);

    $settingsBtn.addEventListener("pointerdown", Settings.toggleVisibility);
    $closeSettingsBtn.addEventListener(
      "pointerdown",
      Settings.toggleVisibility
    );
    $enableSoundBtn.addEventListener("pointerdown", () => {
      Settings.enableSound(!Settings.isSoundEnabled);
    });
    $reloadCartonBtn.addEventListener("pointerdown", Game.newCarton.bind(Game));
    $colorSelector.addEventListener("change", (e) => {
      Settings.setCartonColor(e.target.value);
    });
    $markerColorSelector.addEventListener("change", (e) => {
      Settings.setMarkerColor(e.target.value);
    });
  };

  Settings.enableSound = function (_enable) {
    Settings.isSoundEnabled = _enable;
    $enableSoundBtnIcon.classList.toggle("fa-volume-xmark");
  };

  Settings.toggleVisibility = function () {
    toggleOverlay();
    $settingsSection.classList.toggle("roll-left");
  };

  Settings.setMarkerColor = function (_color) {
    markerColor = _color;
    Game.carton.setMarkerColor(markerColor);
  };

  Settings.setCartonColor = function (_color) {
    cartonColor = _color;
    Game.carton.setColor(cartonColor);
  };

  Settings.getMarkerColor = function () {
    return markerColor;
  };

  Settings.getCartonColor = function () {
    return cartonColor;
  };

  return Settings;
})();
