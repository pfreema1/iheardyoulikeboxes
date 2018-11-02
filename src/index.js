var container;
var camera, scene, renderer;
var uniforms, uniforms1, material, material1, mesh;
var scale = 0.0;
var mouseX = 0, mouseY = 0,
lat = 0, lon = 0, phy = 0, theta = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var cube, cube1;  
var startTime = Date.now();
var geometry, geometry1;
var synth;
var tweenController = new TweenController();

init();
animate();

function init() {
  container = document.getElementById( 'container' );
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
  scene = new THREE.Scene();

  
  
  uniforms = {
    time: { type: "f", value: 1.0 },
    resolution: { type: "v3", value: new THREE.Vector3() },
    scale: { type: "f", value: 1.0 },
  };
  
  uniforms1 = {
    time: { value: 1.0 }
  };
  
  geometry = new THREE.BoxBufferGeometry(20, 20, 20);
  material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  });
  cube = new THREE.Mesh( geometry, material );
  cube.position.set(0, 0, 0);
  scene.add( cube );
  
  geometry1 = new THREE.BoxBufferGeometry(20, 20, 20);
  material1 = new THREE.ShaderMaterial({
    uniforms: uniforms1,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragment_shader4' ).textContent
  });
  cube1 = new THREE.Mesh(geometry, material);
  cube1.position.set(30, 5, 0);     
  scene.add(cube1);
  
  // right cube tween
  let tween = new TweenMax.fromTo(cube1.rotation, 5, {
    y: '-0.4'
  },{
    y: '0.1'
  });
  cube1.tl = new TimelineMax({
    yoyo: true,
    repeat: -1,
    ease: Power2.easeInOut,
  });
  cube1.tl.add(tween);
  
  camera.position.z = 50;
  
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  
  container.appendChild( renderer.domElement );
  
  uniforms.resolution.value.x = window.innerWidth;
  uniforms.resolution.value.y = window.innerHeight;
  
  initializeTone();
  listeners();
  
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  var elapsedMilliseconds = Date.now() - startTime;
  var elapsedSeconds = elapsedMilliseconds / 1000.;

  uniforms.time.value = 60. * elapsedSeconds;
  uniforms.scale.value = scale;

  uniforms1.time.value += 60. * elapsedSeconds;

  cube.rotation.y += 0.005;
  cube.rotation.x += 0.003;

  // if(scale > 0.2) scale -= 0.04;
  
  // if(scale < 0.1) scale = 0.1;
  
  renderer.render( scene, camera );
}

function initializeTone() {
  synth = new Tone.Synth().toMaster();

  
}

function listeners() {
  document.body.onkeyup = function(e) {
    if(e.keyCode == 32) {
      handleSpacePress();
    }
  }
}

function handleSpacePress() {
  // visual
  scale = 1.0;

  // aural
  // play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease('C2', '8n');
  
}

function TweenController() {
  this.currTween = null;
}