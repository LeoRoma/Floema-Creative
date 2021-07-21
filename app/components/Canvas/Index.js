import { Camera, Renderer, Transform } from 'ogl';

import Home from './Home';

export default class Canvas {
  constructor() {
    this.createRenderer();
    this.createCamera();
    this.createScene();

    this.onResize();

    this.createHome();
  }

  createRenderer() {
    this.renderer = new Renderer();

    this.gl = this.renderer.gl;

    document.body.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);

    this.camera.position.z = 5;
  }

  createScene() {
    this.scene = new Transform();
  }

  createHome() {
   this.home = new Home({
     gl: this.gl,
     scene: this.scene,
     sizes: this.sizes
   });
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight
    })
  
    // This 3 lines of code is to match the size of what is rendered from canvas to the size of CSS code
    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.sizes = {
      height, 
      width
    }

    if(this.home){
      this.home.onResize({
        sizes: this.sizes
      })
    }

  }

  update(){
    this.renderer.render({
      camera: this.camera,
      scene: this.scene
    });
  }

}