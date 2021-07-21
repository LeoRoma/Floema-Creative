import { Mesh, Program, Texture } from 'ogl';


import fragment from '../../shaders/plane-fragment.glsl'; // Need to install 'raw-loader' to be able to use these files 
import vertex from '../../shaders/plane-vertex.glsl';

export default class Media {
  constructor({ element, geometry, gl, index, scene, sizes }) {
    this.element = element;
    this.geometry = geometry;
    this.gl = gl;
    this.index = index;
    this.scene = scene;
    this.sizes = sizes;


    this.createTexture();
    this.createProgram();
    this.createMesh();
  }

  createTexture() {
    this.texture = new Texture(this.gl);

    this.image = new window.Image();
    this.image.crossOrigin = 'anonymous' // To set the image for cross origin;
    this.image.src = this.element.getAttribute('data-src');
    this.image.onload = () => (this.texture.image = this.image);
  }

  createProgram() {
    this.program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        tMap: { value: this.texture }
      }
    })
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });

    this.mesh.setParent(this.scene);

    this.mesh.scale.x = 2;
  }

  createBounds({ sizes }) {
    // for the responsive images in canvas
    this.bounds = this.element.getBoundingClientRect();

    this.updateScale(sizes);
    this.updateX();
    this.updateY();
  }

  updateScale({ height, width }) {
    // get the % of the width and height
    this.height = this.bounds.height / window.innerHeight;
    this.width = this.bounds.width / window.innerWidth;

    this.mesh.scale.x = width * this.width;
    this.mesh.scale.y = height * this.height;

    this.x = this.bounds.left / window.innerWidth;
    this.y = this.bounds.top / window.innerHeight;

    this.mesh.position.x = (-width / 2) + (this.mesh.scale.x / 2) + (this.x * width);
    this.mesh.position.y = (height / 2) - (this.mesh.scale.y / 2) - (this.y * height);
  }

  updateX() {

  }

  updateY() {

  }

  onResize(sizes) {
    this.createBounds(sizes);
  }
}