AFRAME.registerComponent('futuristic-city-scene', {
  init() {
    const isQuest = /OculusBrowser|Quest/i.test(navigator.userAgent);
    const lowPower = AFRAME.utils.device.isMobile() || isQuest;

    const starrySky = document.createElement('a-entity');
    starrySky.setAttribute(
      'starry-sky',
      lowPower
        ? 'target: #rig; count: 180; radius: 340; minY: 40; maxY: 260;'
        : 'target: #rig; count: 500; radius: 420; minY: 40; maxY: 320;'
    );
    this.el.appendChild(starrySky);

    const ocean = document.createElement('a-entity');
    ocean.setAttribute(
      'infinite-ocean',
      lowPower ? 'target: #rig; size: 2600; y: -2; lowPower: true;' : 'target: #rig; size: 7000; y: -2;'
    );
    this.el.appendChild(ocean);

    const city = document.createElement('a-entity');
    city.setAttribute(
      'city-generator',
      lowPower
        ? 'grid: 16; spacing: 38; minHeight: 20; maxHeight: 120; gapRadius: 130; skipChance: 0.45; quality: low;'
        : 'grid: 34; spacing: 34; minHeight: 24; maxHeight: 180; gapRadius: 100; skipChance: 0.2; quality: high;'
    );
    this.el.appendChild(city);
  }
});