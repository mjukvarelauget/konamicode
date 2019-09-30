// Globally available functions
let addKonamiListener;

// Internal state defined in the follwing block
{
  // ↑↑↓↓←→←→ba
  let progress = 0;
  let listeners = [];

  // IDs as used by the keydown event
  const up_key    = 38;
  const down_key  = 40;
  const left_key  = 37;
  const right_key = 39;

  // Keydown does not distinguish between capitals and non-capitals
  const a_key = 65;
  const b_key = 66;

  const code = [up_key, up_key, down_key, down_key,
                left_key, right_key, left_key, right_key,
                b_key, a_key];

  // To avoid IME composition to trigger buffer updates, we need to do this little check
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
  const isIMECompose = (e) => {
    if(e.isComposing || event.keyCode === 229)
      return true;
    return false;
  };

  // Basic idea: first make sure this is not a composition event,
  // then see if the next input is the one the we expect
  // if yes, then increase progress, if not, reset it.
  // The state denoted by progress = 2 is special
  // On successfull code input, all subscribing callbacks are notified
  const clickHandler = (e) => {
    if(isIMECompose(e))
      return;

    if(code[progress] === e.keyCode) {
      progress++;
      if (progress >= code.length) {
        notifyListeners();
        progress = 0;
      }
    }
    else if(progress == 2 && e.keyCode == up_key) {
      progress = 2;
    }
    else {
      progress = 0;
    }
  };

  const notifyListeners = () => {
    for(let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  };

  addKonamiListener = (callback) => {
    if(typeof(callback) === "function"){
      listeners.push(callback);
    }
    else {
      throw("The callback provided to the konami event handler was not a function");
    }
  };
  window.addEventListener("keydown", clickHandler);
}
