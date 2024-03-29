import React, { Component } from "react"

import * as THREE from "three"
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { css } from "@emotion/core"

export default class ThreeD extends Component {
  componentDidMount() {
    init(this)
    animate()
  }

  render() {
    return (
      <div
        ref={ref => (this.mount = ref)}
        css={css`
          width: 100vw;
          height: 100vh;
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          z-index: -9999;
        `}
      />
    )
  }
}

var group, camera, scene, renderer

function init(reactElement) {
  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(scene.background, 10, 20)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setClearColor(0xf4f4f4, 1)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  reactElement.mount.appendChild(renderer.domElement)

  // camera

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.set(0, 0, 15)
  scene.add(camera)

  // controls

  //let controls = new OrbitControls(camera, document.body)
  //controls.minDistance = 20
  //controls.maxDistance = 50
  //controls.maxPolarAngle = Math.PI / 2

  scene.add(new THREE.AmbientLight(0x222222))

  // light

  let light = new THREE.PointLight(0xffffff, 1)
  camera.add(light)

  group = new THREE.Group()
  scene.add(group)

  var geometry = new THREE.ConeGeometry(2, 5, 7)
  var material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
  var cone = new THREE.Mesh(geometry, material)

  cone.matrixAutoUpdate = true
  group.add(cone)

  window.addEventListener("resize", onWindowResize, false)
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)

  render()
}

function render() {
  renderer.render(scene, camera)
}
