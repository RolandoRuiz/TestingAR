import * as THREE from'https://unpkg.com/three@0.127.0/build/three.module.js'

import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'

import {GLTFLoader} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js'


const canvas = document.querySelector('canvas.WebGLcanvas')

const scene = new THREE.Scene()

const pointLight = new THREE.PointLight(0xdddddd, 10)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 2
scene.add(pointLight)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const loader = new GLTFLoader();
loader.load("3Dmodels/untitled.glb",
      (gltf) => {
        gltf.scene.scale.multiplyScalar(1 / 0.5) // adjust scalar factor to match your scene scale
        gltf.scene.position.x = 0 // once rescaled, position the model where needed
        gltf.scene.position.z = 0
        scene.add(gltf.scene)
      }
);

const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.5, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 20
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

