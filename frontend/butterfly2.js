import * as THREE from 'three';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

let butterfly;
let mixer;
const loader = new GLTFLoader();

// Load the butterfly model
loader.load(
   'butterfly.glb',
   function (gltf) {
      butterfly = gltf.scene;
      butterfly.castShadow = true;
      butterfly.traverse((node) => {
         if (node.isMesh) node.castShadow = true;
      });
      scene.add(butterfly);
      mixer = new THREE.AnimationMixer(butterfly);
      mixer.clipAction(gltf.animations[0]).play();
      updateButterflyPosition();
   },
   undefined,
   function (error) {
      console.error(error);
   }
);

const container3D = document.getElementById('container3D');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container3D.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.position.set(3, 5, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.bottom = -20;
scene.add(directionalLight);

// Shadow plane
const shadowPlane = new THREE.Mesh(
   new THREE.PlaneGeometry(500, 500),
   new THREE.ShadowMaterial({ opacity: 0.3 })
);
shadowPlane.rotation.x = -Math.PI / 2.01;
shadowPlane.position.y = -0.5;
shadowPlane.receiveShadow = true;
scene.add(shadowPlane);

// Positions for butterfly in different sections
const sectionPositions = [
   { id: 'intro', position: { x: -1, y: 0.5, z: -50 }, rotation: { x: 0.5, y: -0.5, z: 0 } },
   { id: 'appointment-form', position: { x: 1.5, y: -1, z: -10 }, rotation: { x: 0.5, y: 0.5, z: 0 } },
   { id: 'footer', position: { x: -1, y: 0.5, z: -5 }, rotation: { x: 0.5, y: -0.5, z: 0 } },
];

// Move the butterfly based on section visibility
const updateButterflyPosition = () => {
   let currentSection;
   const sections = document.querySelectorAll('.section');
   sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 3) {
         currentSection = section.id;
      }

      const activePosition = sectionPositions.find((item) => item.id === currentSection);
      if (activePosition) {
         gsap.to(butterfly.position, {
            duration: 1.5,
            ...activePosition.position,
            ease: 'power1.out'
         });
         gsap.to(butterfly.rotation, {
            duration: 1.5,
            ...activePosition.rotation,
            ease: 'power1.out'
         });
      }
   });
};

// Update butterfly position on scroll
window.addEventListener('scroll', () => {
   if (butterfly) {
      requestAnimationFrame(updateButterflyPosition);
   }
});

// Animation loop
function animate() {
   requestAnimationFrame(animate);
   if (mixer) mixer.update(0.02);
   renderer.render(scene, camera);
}
animate();

// Update camera aspect ratio on window resize
function onWindowResize() {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);
