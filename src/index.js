var container;
var camera, scene, renderer;
var uniforms, material, mesh;
var scale = 0.0;
var mouseX = 0, mouseY = 0,
lat = 0, lon = 0, phy = 0, theta = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var cube;  
var startTime = Date.now();

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
  
  var geometry = new THREE.BoxBufferGeometry(10, 10, 10);
  material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  });
  //material = new THREE.MeshBasicMaterial();
  cube = new THREE.Mesh( geometry, material );
  cube.position.set(0, 0, 0);
  scene.add( cube );

  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  
  container.appendChild( renderer.domElement );
  
  uniforms.resolution.value.x = window.innerWidth;
  uniforms.resolution.value.y = window.innerHeight;

  //camera.position.z = 1000;
  //camera.lookAt(cube.position);
  

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

  cube.rotation.y += 0.005;
  cube.rotation.x += 0.003;
  
  if(scale > 1.0) scale -= 0.07;
  
  if(scale < 0.5) scale = 0.5;
  
  renderer.render( scene, camera );
}



function listeners() {
  document.body.onkeyup = function(e) {
    if(e.keyCode == 32) {
      handleSpacePress();
    }
  }
}

function handleSpacePress() {
  scale = 3.0;
  console.log('hi');  
}