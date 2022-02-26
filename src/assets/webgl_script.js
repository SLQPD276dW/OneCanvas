// WebGLで四角形を描写するサンプル

// 定数
const vertex_source =
    `#version 300 es

  in vec3 vertex_position;
  in vec4 color;
  
  out vec4 v_color;
  
  void main() {
      v_color = color;
      gl_Position = vec4(vertex_position, 1.0);
  }
  `;

const fragment_source =
    `#version 300 es

  precision highp float;
  
  in vec4 v_color;
  out vec4 fragment_color;
  
  void main() {
      fragment_color = v_color;
  }
  `;

const halfsize = 0.5;
const vertices = new Float32Array([
    -halfsize, halfsize, 0.0,
    -halfsize, -halfsize, 0.0,
    halfsize, halfsize, 0.0,
    -halfsize, -halfsize, 0.0,
    halfsize, -halfsize, 0.0,
    halfsize, halfsize, 0.0
]);
const colors = new Float32Array([
    1.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 1.0, 1.0
]);

const VERTEX_SIZE = 3;
const COLOR_SIZE = 4;
const VERTEX_NUMS = 6;

//

const canvas = document.querySelector('canvas');
console.log(canvas);
const context = canvas.getContext('webgl2');
console.log(context);

// 頂点シェーダー
const vertex_shader = context.createShader(context.VERTEX_SHADER);

context.shaderSource(vertex_shader, vertex_source);
context.compileShader(vertex_shader);
const vertex_shader_compile_status = context.getShaderParameter(vertex_shader, context.COMPILE_STATUS);
if (!vertex_shader_compile_status) {
    var info = context.getShaderInfoLog(vertex_shader);
    console.warn(info);
}
console.log("compiled vertex shader.");
//


// フラグメントシェーダー
const fragment_shader = context.createShader(context.FRAGMENT_SHADER);

context.shaderSource(fragment_shader, fragment_source);
context.compileShader(fragment_shader);
const fragment_shader_compile_status = context.getShaderParameter(fragment_shader, context.COMPILE_STATUS);
if (!fragment_shader_compile_status) {
    const info = context.getShaderInfoLog(fragment_shader);
    console.warn(info);
}
console.log("compiled fragment shader.");
//

// WebGLProgram
const program = context.createProgram();

context.attachShader(program, vertex_shader);
context.attachShader(program, fragment_shader);
context.linkProgram(program);
const link_status = context.getProgramParameter(program, context.LINK_STATUS);
if (!link_status) {
    const info = context.getProgramInfoLog(program);
    console.warn(info);
}
console.log("created WebGLProgram.");
//

context.useProgram(program);
const vertex_buffer = context.createBuffer();
const color_buffer = context.createBuffer();
const vertex_attrib_location = context.getAttribLocation(program, 'vertex_position');
const color_attrib_location = context.getAttribLocation(program, 'color');

context.bindBuffer(context.ARRAY_BUFFER, vertex_buffer);
context.enableVertexAttribArray(vertex_attrib_location);
context.vertexAttribPointer(vertex_attrib_location, VERTEX_SIZE, context.FLOAT, false, 0, 0);

context.bindBuffer(context.ARRAY_BUFFER, color_buffer);
context.enableVertexAttribArray(color_attrib_location);
context.vertexAttribPointer(color_attrib_location, COLOR_SIZE, context.FLOAT, false, 0, 0);

context.bindBuffer(context.ARRAY_BUFFER, vertex_buffer);
context.bufferData(context.ARRAY_BUFFER, vertices, context.STATIC_DRAW);

context.bindBuffer(context.ARRAY_BUFFER, color_buffer);
context.bufferData(context.ARRAY_BUFFER, colors, context.STATIC_DRAW);

context.clearColor(0.0, 0.0, 0.0, 1.0);
context.drawArrays(context.TRIANGLES, 0, VERTEX_NUMS);
context.flush();
