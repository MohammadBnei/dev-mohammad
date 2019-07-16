import React, { Component } from "react"
import ReactDOM from "react-dom"

import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ConvexBufferGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js'

import { css } from "emotion";

export default class ThreeD extends Component {
    componentDidMount() {
        // === THREE.JS CODE START ===
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        var renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        ReactDOM.findDOMNode(this).append(renderer.domElement);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        // control

        let controls = new OrbitControls(camera, renderer.domElement)
        controls.minDistance = 20
        controls.maxDistance = 50
        controls.maxPolarAngle = Math.PI / 2

        scene.add(new THREE.AmbientLight(0x222222))

        // light

        let light = new THREE.PointLight(0xffffff)
        camera.add(light)

        var animate = function () {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
        // === THREE.JS EXAMPLE CODE END ===
    }

    render() {
        return (<div className={css`
            width: 100vw;
            height: 100vh;
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            z-index: -9999;
        `} />)
    }
}