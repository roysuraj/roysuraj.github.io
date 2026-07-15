const THREE = require('three');

const cameraPosition = new THREE.Vector3(0, 4.5, 15.5);
const cameraFocus = new THREE.Vector3(0, 2.2, 6);

const camera = new THREE.PerspectiveCamera(38, 1920 / 1080, 0.01, 100);
camera.position.copy(cameraPosition);
camera.lookAt(cameraFocus);
camera.updateMatrixWorld();

const roomGroup = new THREE.Group();
roomGroup.position.set(4.5, 5.7, 0);
roomGroup.rotation.set(0.1, -2.3, 0.09);
roomGroup.scale.set(0.85, 0.85, 0.85);
roomGroup.updateMatrixWorld();

const vw = 1920;
const vh = 1080;

const testPoints = {
  details: new THREE.Vector3(5.5, -3.2, 6.75),
  description: new THREE.Vector3(5.5, -7.5, 6.75),
  services: new THREE.Vector3(-6.5, -6.0, 6.75)
};

console.log("Calculated Screen Y coordinates (Absolute):");
for (const [name, point] of Object.entries(testPoints)) {
  const worldPoint = point.clone();
  roomGroup.localToWorld(worldPoint);
  
  const projected = worldPoint.clone();
  projected.project(camera);
  
  const screenY = -projected.y * vh * 0.5;
  const absY = vh * 0.5 + screenY;
  
  console.log(`- ${name}: Local y = ${point.y} => Abs Screen Y = ${absY.toFixed(1)}`);
}
