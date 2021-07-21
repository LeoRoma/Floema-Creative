import {Camera, Renderer, Transform } from 'ogl';

export default class Canvas {
  constructor(){
    this.createRenderer();
  }

  createRenderer(){
    this.renderer = new Renderer();

    this.gl = this.renderer.gl;

    document.body.appendChild(this.gl.canvas);
  }

  onResize(){
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
}