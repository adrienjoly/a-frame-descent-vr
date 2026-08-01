/*globals AFRAME, THREE*/

/**
 * Change color when hit.
 */
AFRAME.registerComponent("destroyable", {
  dependencies: ["material"],

  init: function() {
    var color;
    var el = this.el;

    color = new THREE.Color();
    color.set("#666");
    el.components.material.material.color.copy(color);
    el.addEventListener("hit", () => {
      color.addScalar(0.05);
      el.components.material.material.color.copy(color);
    });

    el.addEventListener("die", () => {
      color.setRGB(1, 0, 0);
      el.components.material.material.color.copy(color);
    });
  }
});

AFRAME.registerComponent("enemy-ship", {
  init() {
    const el = this.el;

    el.removeAttribute("geometry");
    el.removeAttribute("material");
    el.innerHTML = "";

    const root = document.createElement("a-entity");
    root.setAttribute("scale", "2.1 2.1 2.1");

    // Main body: slightly wider and chunkier
    const body = document.createElement("a-box");
    body.setAttribute("position", "0 0 0");
    body.setAttribute("width", "1.6");
    body.setAttribute("height", "0.42");
    body.setAttribute("depth", "3.1");
    body.setAttribute("material", "color: #2f3547; metalness: 0.25; roughness: 0.72;");
    root.appendChild(body);

    // Nose
    const nose = document.createElement("a-cone");
    nose.setAttribute("position", "0 0 1.92");
    nose.setAttribute("rotation", "90 0 0");
    nose.setAttribute("radius-bottom", "0.68");
    nose.setAttribute("radius-top", "0.02");
    nose.setAttribute("height", "1.15");
    nose.setAttribute("material", "color: #515a72; metalness: 0.25; roughness: 0.6;");
    root.appendChild(nose);

    // Cockpit
    const cockpit = document.createElement("a-sphere");
    cockpit.setAttribute("position", "0 0.18 0.35");
    cockpit.setAttribute("radius", "0.2");
    cockpit.setAttribute("material", "color: #9be8ff; emissive: #7fdfff; emissiveIntensity: 1;");
    root.appendChild(cockpit);

    // Swept wings
    const wingL = document.createElement("a-box");
    wingL.setAttribute("position", "-1.05 0 -0.05");
    wingL.setAttribute("width", "0.2");
    wingL.setAttribute("height", "0.06");
    wingL.setAttribute("depth", "1.95");
    wingL.setAttribute("rotation", "0 0 20");
    wingL.setAttribute("material", "color: #3b4256; metalness: 0.2; roughness: 0.8;");
    root.appendChild(wingL);

    const wingR = document.createElement("a-box");
    wingR.setAttribute("position", "1.05 0 -0.05");
    wingR.setAttribute("width", "0.2");
    wingR.setAttribute("height", "0.06");
    wingR.setAttribute("depth", "1.95");
    wingR.setAttribute("rotation", "0 0 -20");
    wingR.setAttribute("material", "color: #3b4256; metalness: 0.2; roughness: 0.8;");
    root.appendChild(wingR);

    // Twin engine pods
    const engineL = document.createElement("a-cylinder");
    engineL.setAttribute("position", "-0.5 0 -1.48");
    engineL.setAttribute("rotation", "0 0 90");
    engineL.setAttribute("radius", "0.14");
    engineL.setAttribute("height", "0.72");
    engineL.setAttribute("material", "color: #6a7387; metalness: 0.3; roughness: 0.6;");
    root.appendChild(engineL);

    const engineR = document.createElement("a-cylinder");
    engineR.setAttribute("position", "0.5 0 -1.48");
    engineR.setAttribute("rotation", "0 0 90");
    engineR.setAttribute("radius", "0.14");
    engineR.setAttribute("height", "0.72");
    engineR.setAttribute("material", "color: #6a7387; metalness: 0.3; roughness: 0.6;");
    root.appendChild(engineR);

    // Subtle engine glow
    const glowL = document.createElement("a-sphere");
    glowL.setAttribute("position", "-0.5 0 -1.86");
    glowL.setAttribute("radius", "0.055");
    glowL.setAttribute("material", "color: #7fdfff; emissive: #7fdfff; emissiveIntensity: 1;");
    root.appendChild(glowL);

    const glowR = document.createElement("a-sphere");
    glowR.setAttribute("position", "0.5 0 -1.86");
    glowR.setAttribute("radius", "0.055");
    glowR.setAttribute("material", "color: #7fdfff; emissive: #7fdfff; emissiveIntensity: 1;");
    root.appendChild(glowR);

    // Twin tail fins
    const finL = document.createElement("a-box");
    finL.setAttribute("position", "-0.55 0.34 -0.72");
    finL.setAttribute("width", "0.08");
    finL.setAttribute("height", "0.58");
    finL.setAttribute("depth", "0.95");
    finL.setAttribute("rotation", "0 0 16");
    finL.setAttribute("material", "color: #41495c; metalness: 0.15; roughness: 0.85;");
    root.appendChild(finL);

    const finR = document.createElement("a-box");
    finR.setAttribute("position", "0.55 0.34 -0.72");
    finR.setAttribute("width", "0.08");
    finR.setAttribute("height", "0.58");
    finR.setAttribute("depth", "0.95");
    finR.setAttribute("rotation", "0 0 -16");
    finR.setAttribute("material", "color: #41495c; metalness: 0.15; roughness: 0.85;");
    root.appendChild(finR);

    el.appendChild(root);
  }
});

AFRAME.registerComponent('enemy-patrol', {
  schema: {
    center: { type: 'selector' },
    radius: { default: 240 },   // was 620
    height: { default: 140 },   // was 235
    speed: { default: 0.00016 },// slightly slower
    bob: { default: 10 },
    bobSpeed: { default: 0.9 }
  },

  init() {
    this.angle = Math.random() * Math.PI * 2;
    this.center = new THREE.Vector3();
    this.lookTarget = new THREE.Vector3();
    this.syncCenter();
    this.syncPosition(0);
  },

  syncCenter() {
    if (this.data.center) {
      this.center.copy(this.data.center.object3D.position);
    } else {
      this.center.set(0, 0, 0);
    }
  },

  syncPosition(time) {
    const { radius, height, bob, bobSpeed } = this.data;
    const x = this.center.x + Math.cos(this.angle) * radius;
    const z = this.center.z + Math.sin(this.angle) * radius;
    const y = height + Math.sin(time * 0.001 * bobSpeed) * bob;

    this.el.object3D.position.set(x, y, z);

    // Face roughly along the path
    const nx = this.center.x + Math.cos(this.angle + 0.03) * radius;
    const nz = this.center.z + Math.sin(this.angle + 0.03) * radius;
    this.lookTarget.set(nx, y, nz);
    this.el.object3D.lookAt(this.lookTarget);
    this.el.object3D.rotateY(Math.PI);
  },

  tick(time, dt) {
    this.syncCenter();
    this.angle += this.data.speed * dt;
    this.syncPosition(time);
  }
});
