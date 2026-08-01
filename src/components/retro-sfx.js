/*globals AFRAME*/

AFRAME.registerComponent('retro-sfx', {
  schema: {
    player: { default: '#rig' },
    enemy: { default: '#enemyShip' },
    volume: { default: 0.12 }
  },

  init() {
    this.ctx = null;
    this.playerEl = null;
    this.enemyEl = null;

    this.onShoot = this.onShoot.bind(this);
    this.onDie = this.onDie.bind(this);
    this.unlockAudio = this.unlockAudio.bind(this);

    // Browser autoplay policy: create AudioContext on first user gesture.
    window.addEventListener('pointerdown', this.unlockAudio, { once: true });
    window.addEventListener('keydown', this.unlockAudio, { once: true });

    this.attachListeners();
    this.el.sceneEl.addEventListener('loaded', () => this.attachListeners());
  },

  remove() {
    if (this.playerEl) this.playerEl.removeEventListener('shoot', this.onShoot);
    if (this.enemyEl) this.enemyEl.removeEventListener('die', this.onDie);
  },

  unlockAudio() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      this.ctx = Ctx ? new Ctx() : null;
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },

  attachListeners() {
    this.playerEl = this.el.sceneEl.querySelector(this.data.player);
    this.enemyEl = this.el.sceneEl.querySelector(this.data.enemy);

    if (this.playerEl) this.playerEl.addEventListener('shoot', this.onShoot);
    if (this.enemyEl) this.enemyEl.addEventListener('die', this.onDie);
  },

  onShoot() {
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1320, t);
    osc.frequency.exponentialRampToValueAtTime(520, t + 0.07);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(this.data.volume, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

    osc.connect(gain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);
  },

  onDie() {
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Noise burst
    const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.25, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, t);
    filter.frequency.exponentialRampToValueAtTime(120, t + 0.22);

    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(this.data.volume * 1.2, t);
    nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);

    noise.connect(filter).connect(nGain).connect(this.ctx.destination);
    noise.start(t);
    noise.stop(t + 0.24);

    // Retro downward tone overlay
    const osc = this.ctx.createOscillator();
    const oGain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(48, t + 0.22);

    oGain.gain.setValueAtTime(this.data.volume * 0.8, t);
    oGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);

    osc.connect(oGain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.23);
  }
});