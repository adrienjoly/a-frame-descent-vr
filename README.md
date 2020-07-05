# Making a VR game with a-frame

Inspired by "Descent".

Built with [A-Frame](https://aframe.io), tested on my Oculus Quest.

Open and try it from Glitch: https://glitch.com/edit/#!/pitch-gaudy-acai

Progress

- [x] Detect press on Oculus Quest's joystick => change ground color
- [x] Detect movement on Oculus Quest's joystick => display in JS console
- [x] Display JS console remotely in Brave browser, from Oculus Browser ([source](https://developer.oculus.com/documentation/oculus-browser/browser-remote-debugging/?device=QUEST)), it used to work once or twice. until I got a "DOMException: The specified session configuration is not supported" error.
- [x] Display JS console remotely in Firefox, from Firefox Reality (about:debugging#/runtime/this-firefox)
- [x] Move ship (camera) position (X and Z axes) based on joystick movement
- [x] Use joystick of second controller to change direction (rotate the ship up/down and left/right)
- [x] Fix: keep lateral rotation VS vertical rotation independent
- [ ] Move ship forwardaccording to direction, independently from head direction
- [ ] Draw a simple cockpit around the camera, to make it look more like a ship
- [ ] Fire a laser when a button is pressed
- [ ] Add an enemy ship
- [ ] Destroy enemy ship when hit by laser

