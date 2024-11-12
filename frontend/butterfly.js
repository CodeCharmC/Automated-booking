//import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
//import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
/**
   <script type="importmap" nonce="123456">
      {
         "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@<version>/build/three.module.js",
            "three/addons/": "https://cdn.jsdelivr.net/npm/three@<version>/examples/jsm/"
         }
      }
    </script> 
    <script nonce="123456" type="module" src="butterfly.js"></script>
    */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.129.0/examples/jsm/controls/OrbitControls.js';


let butterfly;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
   10,
   window.innerWidth / window.innerHeight,
   0.1,
   1000
);
camera.position.z = 15;

const loader = new GLTFLoader();
loader.load(
   'butterfly.glb',
   function (gltf) {
      butterfly = gltf.scene;
      scene.add(gltf.scene);
   },
   undefined,
   function (error) {
      console.error(error);
   }
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0x000000);


function animate() {
   requestAnimationFrame(animate);
   renderer.render(scene, camera);
}
animate();
