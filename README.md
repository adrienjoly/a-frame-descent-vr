# Making a VR game with a-frame

Inspired by "Descent".

Built with [A-Frame](https://aframe.io).

Demo video: https://twitter.com/adrienjoly/status/1280182990073626632

## How to test it

### On a computer (with keyboard)

1. Open https://glitch.com/~pitch-gaudy-acai in Google Chrome (or other browser that supports WebXR)
2. Click on "Show"
3. Use the following keys to control the ship:
   ```
        W      |     Y    |
      A S D    |   G H J  |     L
               |          |
   translation | rotation | stabilize
   
   SPACE BAR = shoot
   ```

Press Ctrl-Alt-I to open a-frame's inspector.

### In Oculus Quest VR headset (with 2 controllers)

1. Open https://pitch-gaudy-acai.glitch.me in Oculus Browser or Firefox Reality
2. Click on the "VR" button, in the lower-right corner
3. Use your controllers' thumbsticks to control the ship, and the right trigger to shoot
4. Press an "Oculus" button to exit the experience

### Is my VR headset supported?

I don't know. 😅 Try it and let me know by posting an issue there: https://github.com/adrienjoly/a-frame-descent-vr/issues

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
- [x] Draw a simple cockpit around the camera, to make it look more like a ship => wip: how to import from google tilt brush ?
   - convert the .tilt file with something like [tilt-brush-toolkit](https://github.com/googlevr/tilt-brush-toolkit) or [TiltBrushConverter](https://github.com/DrHibbitts/TiltBrushConverter)
   - or import from google poly, using a component like [aframe-google-poly-component](https://github.com/mattrei/aframe-google-poly-component) or [aframe-gblock](https://github.com/archilogic-com/aframe-gblock)
   - [x] or draw one with tinkerCAD, inspired by [descent II](https://lparchive.org/Descent-II/) => [wip](https://www.tinkercad.com/things/is4G4UpZnln-epic-stantia/edit)
- [x] Draw a basic room
- [x] Add an enemy ship
- [x] Fire a laser when a button is pressed, like in [aframe-super-shooter-kit](https://github.com/supermedium/aframe-super-shooter-kit/blob/master/README.md)
- [x] Destroy enemy ship when hit by laser
- [ ] Draw a basic level: two rooms with a corridor
- [ ] Make ship collide on room walls
- [ ] Basic enemy movement: make their ship bounce on room walls
- [ ] Make enemy ship occasionally shoot a laser
- [ ] Lose a point when hit by laser
