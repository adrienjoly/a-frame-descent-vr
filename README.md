# Making a VR game with a-frame

Inspired by "Descent".

Built with [A-Frame](https://aframe.io).

Demo video: https://twitter.com/adrienjoly/status/1280182990073626632

## How to test it

### On a computer

1. Open https://glitch.com/~pitch-gaudy-acai in Google Chrome (or other browser that supports WebXR)
2. Click on "Show"
3. Use the following keys to control the ship:
   ```
        W      |     Y
      A S D    |   G H J
               |
   translation | rotation
   ```

### In Oculus Quest VR headset

1. Open https://pitch-gaudy-acai.glitch.me in Oculus Browser or Firefox Reality
2. Click on the "VR" button, in the lower-right corner
3. Use your controllers' joysticks to control the ship
4. Press an "Oculus" button to exit the experience

### Is my VR headset supported?

I don't know. Try it and let me know by posting an issue there: https://github.com/adrienjoly/a-frame-descent-vr/issues

## Progress on development

- [x] Detect press on Oculus Quest's joystick => change ground color
- [x] Detect movement on Oculus Quest's joystick => display in JS console
- [x] Display JS console remotely in Brave browser, from Oculus Browser ([source](https://developer.oculus.com/documentation/oculus-browser/browser-remote-debugging/?device=QUEST)), it used to work once or twice. until I got a "DOMException: The specified session configuration is not supported" error.
- [x] Display JS console remotely in Firefox, from Firefox Reality (about:debugging#/runtime/this-firefox)
- [x] Move ship (camera) position (X and Z axes) based on joystick movement
- [x] Use joystick of second controller to change direction (rotate the ship up/down and left/right)
- [x] Fix: keep lateral rotation VS vertical rotation independent
- [x] Move ship forwardaccording to direction, independently from head direction
- [x] Stabilize the ship (parallel to ground) when L or the joystick is pressed
- [ ] Draw a simple cockpit around the camera, to make it look more like a ship
- [ ] Fire a laser when a button is pressed
- [ ] Add an enemy ship
- [ ] Destroy enemy ship when hit by laser
- [ ] Draw a basic level: two rooms with a corridor
- [ ] Make ship collide on room walls
- [ ] Basic enemy movement: make their ship bounce on room walls
- [ ] Make enemy ship occasionally shoot a laser
- [ ] Lose a point when hit by laser
