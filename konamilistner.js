"use strict";
// ↑↑↓↓←→←→ba
// Global state
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

window.onload = () => {
    window.addEventListener("keydown", clickHandler);
};

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
// On successfull code input, all subscribing callbacks are notified
const clickHandler = (e) => {
    // Update the click handler
    console.log(e.keyCode);
    if(isIMECompose(e))
        return;

    if(code[progress] === e.keyCode) {
        progress++;
        if (progress >= code.length) {
            console.log("The code has been writ!");
            progress = 0;
        }
    }
    else {
        progress = 0;
    }
};
