AFRAME.registerComponent('starry-sky', {
  schema: {
    target: { type: 'selector' },
    count: { default: 900 },
    radius: { default: 1400 },
    minY: { default: 120 },
    maxY: { default: 900 }
  },

  init() {
    const sky = document.createElement('a-sky');
    sky.setAttribute('color', '#020611');
    this.el.appendChild(sky);

    this.starRoot = new THREE.Group();
    this.el.object3D.add(this.starRoot);

    const { count, radius, minY, maxY } = this.data;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const y = minY + Math.random() * (maxY - minY);
      const ring = Math.sqrt(Math.max(0, radius * radius - y * y));

      positions[i * 3] = Math.cos(theta) * ring;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * ring;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xd9e4ff,
      size: 1.1,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.65,
      depthWrite: false
    });

    this.points = new THREE.Points(geometry, material);
    this.starRoot.add(this.points);
  },

  tick() {
    if (!this.data.target) return;
    const p = this.data.target.object3D.position;
    this.starRoot.position.set(p.x, p.y - 20, p.z);
  }
});