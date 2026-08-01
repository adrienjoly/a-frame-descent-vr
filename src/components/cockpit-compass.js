/*globals AFRAME, THREE*/

AFRAME.registerComponent('cockpit-compass', {
  schema: {
    enemySelector: { default: '.enemy' }
  },

  init() {
    this.enemyEl = null;
    this.cameraEl = null;
    this.pointer = null;

    this.camPos = new THREE.Vector3();
    this.enemyPos = new THREE.Vector3();
    this.dir = new THREE.Vector3();
    this.localDir = new THREE.Vector3();
    this.camQuat = new THREE.Quaternion();
    this.invQuat = new THREE.Quaternion();

    this.setup = this.setup.bind(this);
    this.el.sceneEl.addEventListener('loaded', this.setup);
    this.setup();
  },

  setup() {
    this.cameraEl = this.el.querySelector('[camera]') || (this.el.sceneEl.camera && this.el.sceneEl.camera.el);
    if (!this.cameraEl || this.pointer) return;

    // Minimal cockpit frame (always visible in first-person)
    const cockpit = document.createElement('a-entity');
    cockpit.setAttribute('position', '0 0.3 -0.55');

    // 3D compass
    const compass = document.createElement('a-entity');
    compass.setAttribute('position', '0 -0.03 -0.02');

    const ring = document.createElement('a-torus');
    ring.setAttribute('radius', '0.07');
    ring.setAttribute('radius-tubular', '0.0025');
    ring.setAttribute('rotation', '90 0 0');
    ring.setAttribute('material', 'color: #7f8ab0; emissive: #4e5a86; emissiveIntensity: 0.5;');
    compass.appendChild(ring);

    this.pointer = document.createElement('a-entity');

    const shaft = document.createElement('a-box');
    shaft.setAttribute('position', '0 0.014 0');
    shaft.setAttribute('width', '0.004');
    shaft.setAttribute('height', '0.03');
    shaft.setAttribute('depth', '0.004');
    shaft.setAttribute('material', 'color: #b9dcff; emissive: #9ed1ff; emissiveIntensity: 0.8;');
    this.pointer.appendChild(shaft);

    const tip = document.createElement('a-cone');
    tip.setAttribute('position', '0 0.036 0');
    tip.setAttribute('radius-bottom', '0.008');
    tip.setAttribute('radius-top', '0');
    tip.setAttribute('height', '0.015');
    tip.setAttribute('material', 'color: #e3f2ff; emissive: #c6e6ff; emissiveIntensity: 1.0;');
    this.pointer.appendChild(tip);

    compass.appendChild(this.pointer);
    cockpit.appendChild(compass);
    this.cameraEl.appendChild(cockpit);
  },

  tick() {
    if (!this.cameraEl || !this.pointer) return;
    if (!this.enemyEl) this.enemyEl = this.el.sceneEl.querySelector(this.data.enemySelector);
    if (!this.enemyEl) return;

    const camObj = this.cameraEl.object3D;
    const enemyObj = this.enemyEl.object3D;
    if (!camObj || !enemyObj) return;

    camObj.getWorldPosition(this.camPos);
    enemyObj.getWorldPosition(this.enemyPos);

    this.dir.subVectors(this.enemyPos, this.camPos).normalize();
    camObj.getWorldQuaternion(this.camQuat);
    this.invQuat.copy(this.camQuat).invert();
    this.localDir.copy(this.dir).applyQuaternion(this.invQuat);

    // left/right direction relative to where player looks
    const yaw = Math.atan2(this.localDir.x, -this.localDir.z);
    this.pointer.object3D.rotation.z = -yaw;
  }
});