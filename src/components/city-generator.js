AFRAME.registerComponent('city-generator', {
  schema: {
    grid: { default: 34 },
    spacing: { default: 34 },
    minHeight: { default: 24 },
    maxHeight: { default: 180 },
    gapRadius: { default: 100 },
    skipChance: { default: 0.15 },
    quality: { default: 'high' }
  },

  init() {
    const { grid, spacing, minHeight, maxHeight, gapRadius, skipChance, quality } = this.data;
    const isLowQuality = quality === 'low';
    const half = Math.floor(grid / 2);

    for (let gx = -half; gx <= half; gx++) {
      for (let gz = -half; gz <= half; gz++) {
        const x = gx * spacing;
        const z = gz * spacing;

        // Keep center more open for combat
        if (Math.hypot(x, z) < gapRadius) continue;
        if (Math.random() < skipChance) continue; // streets / empty lots

        const h = minHeight + Math.random() * (maxHeight - minHeight);
        const w = 10 + Math.random() * 18;
        const d = 10 + Math.random() * 18;
        const y = h / 2;

        const towerColor = ['#3e465d', '#454d66', '#394156'][Math.floor(Math.random() * 3)];
        const tower = document.createElement('a-box');
        tower.setAttribute('position', `${x} ${y.toFixed(2)} ${z}`);
        tower.setAttribute('width', w.toFixed(2));
        tower.setAttribute('height', h.toFixed(2));
        tower.setAttribute('depth', d.toFixed(2));
        tower.setAttribute(
          'material',
          isLowQuality
            ? `shader: flat; color: ${towerColor};`
            : `color: ${towerColor}; roughness: 0.9; metalness: 0.18;`
        );
        tower.setAttribute('class', 'city-obstacle');
        this.el.appendChild(tower);

        // Base plinth for some buildings
        if (Math.random() < (isLowQuality ? 0.15 : 0.35)) {
          const base = document.createElement('a-box');
          base.setAttribute('position', `${x} ${(Math.max(2.2, h * 0.08)).toFixed(2)} ${z}`);
          base.setAttribute('width', (w * 1.15).toFixed(2));
          base.setAttribute('height', (Math.max(2.2, h * 0.12)).toFixed(2));
          base.setAttribute('depth', (d * 1.15).toFixed(2));
          base.setAttribute(
            'material',
            isLowQuality ? 'shader: flat; color: #2f3648;' : 'color: #2f3648; roughness: 1; metalness: 0.12;'
          );
          this.el.appendChild(base);
        }

        // Lighted windows: more strips, on more buildings
        if (Math.random() < (isLowQuality ? 0.35 : 0.78)) {
          const sideCount = 1 + Math.floor(Math.random() * (isLowQuality ? 1 : 3));
          for (let side = 0; side < sideCount; side++) {
            const useDepthFace = Math.random() < 0.5;
            const faceOffset = useDepthFace ? d / 2 + 0.06 : w / 2 + 0.06;
            const faceSign = Math.random() < 0.5 ? -1 : 1;
            const windowCount = isLowQuality
              ? 1 + Math.floor(Math.random() * 2)
              : 3 + Math.floor(Math.random() * 6);

            for (let i = 0; i < windowCount; i++) {
              const strip = document.createElement('a-box');

              const wx = useDepthFace
                ? x + (Math.random() * 0.7 - 0.35) * w
                : x + faceSign * faceOffset;

              const wz = useDepthFace
                ? z + faceSign * faceOffset
                : z + (Math.random() * 0.7 - 0.35) * d;

              const wy = (0.12 + Math.random() * 0.72) * h;

              strip.setAttribute('position', `${wx.toFixed(2)} ${wy.toFixed(2)} ${wz.toFixed(2)}`);
              strip.setAttribute('width', (0.45 + Math.random() * 1.6).toFixed(2));
              strip.setAttribute('height', (0.12 + Math.random() * 0.22).toFixed(2));
              strip.setAttribute('depth', '0.06');
              strip.setAttribute(
                'material',
                isLowQuality
                  ? 'shader: flat; color: #f8dd86;'
                  : 'color: #f8dd86; emissive: #ffd96a; emissiveIntensity: 0.9; roughness: 1; metalness: 0;'
              );
              this.el.appendChild(strip);
            }
          }
        }

        // Roof details: antenna + beacon on taller towers
        if (h > 70 && Math.random() < (isLowQuality ? 0.2 : 0.85)) {
          const roof = document.createElement('a-box');
          roof.setAttribute('position', `${x} ${(h + 0.6).toFixed(2)} ${z}`);
          roof.setAttribute('width', (w * 0.35).toFixed(2));
          roof.setAttribute('height', '0.8');
          roof.setAttribute('depth', (d * 0.35).toFixed(2));
          roof.setAttribute(
            'material',
            isLowQuality ? 'shader: flat; color: #596279;' : 'color: #596279; roughness: 0.85; metalness: 0.2;'
          );
          this.el.appendChild(roof);
        }

        if (!isLowQuality && h > 95 && Math.random() < 0.7) {
          const antenna = document.createElement('a-cylinder');
          antenna.setAttribute('position', `${x} ${(h + 2.4).toFixed(2)} ${z}`);
          antenna.setAttribute('radius', '0.08');
          antenna.setAttribute('height', (1.2 + Math.random() * 2.4).toFixed(2));
          antenna.setAttribute('material', 'color: #8d96ab; roughness: 0.7; metalness: 0.35;');
          this.el.appendChild(antenna);

          const beacon = document.createElement('a-sphere');
          beacon.setAttribute('position', `${x} ${(h + 3.6).toFixed(2)} ${z}`);
          beacon.setAttribute('radius', '0.22');
          beacon.setAttribute(
            'material',
            'color: #ff6262; emissive: #ff6262; emissiveIntensity: 1.4;'
          );
          beacon.setAttribute(
            'animation',
            'property: material.emissiveIntensity; dir: alternate; dur: 700; loop: true; to: 0.15; easing: easeInOutSine;'
          );
          this.el.appendChild(beacon);
        }

        // Small side lights on some medium towers
        if (!isLowQuality && h > 55 && Math.random() < 0.3) {
          const pulse = document.createElement('a-sphere');
          pulse.setAttribute('position', `${x} ${(h * 0.72).toFixed(2)} ${z}`);
          pulse.setAttribute('radius', '0.12');
          pulse.setAttribute('material', 'color: #9be8ff; emissive: #9be8ff; emissiveIntensity: 1.1;');
          this.el.appendChild(pulse);
        }
      }
    }
  }
});