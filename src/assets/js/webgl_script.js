import { mat4 } from "https://cdn.skypack.dev/gl-matrix@3.4.3";

// グローバル変数

const vertex_source =
  `#version 300 es
  precision mediump float;
  
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  
  in vec3 aVertexPosition;
  in vec4 color;
  out vec4 vColor;
  
  void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
      vColor = color;
  }
`;

const fragment_source =
  `#version 300 es
precision mediump float;

in vec4 vColor;
out vec4 fragColor;

void main() {
    /* fragColor = vec4(0.5, 0.9, 0.2, 1.0); */
    fragColor = vColor;
}`;

const vertices = [
  // 前面
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,

  // 背面
  -1.0, -1.0, -1.0,
  -1.0, 1.0, -1.0,
  1.0, 1.0, -1.0,
  1.0, -1.0, -1.0,

  // 上面
  -1.0, 1.0, -1.0,
  -1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, -1.0,

  // 底面
  -1.0, -1.0, -1.0,
  1.0, -1.0, -1.0,
  1.0, -1.0, 1.0,
  -1.0, -1.0, 1.0,

  // 右側面
  1.0, -1.0, -1.0,
  1.0, 1.0, -1.0,
  1.0, 1.0, 1.0,
  1.0, -1.0, 1.0,

  // 左側面
  -1.0, -1.0, -1.0,
  -1.0, -1.0, 1.0,
  -1.0, 1.0, 1.0,
  -1.0, 1.0, -1.0
];

const indices = [
  0, 1, 2, 0, 2, 3,    // 前面
  4, 5, 6, 4, 6, 7,    // 背面
  8, 9, 10, 8, 10, 11,   // 上面
  12, 13, 14, 12, 14, 15,   // 底面
  16, 17, 18, 16, 18, 19,   // 右側面
  20, 21, 22, 20, 22, 23    // 左側面
];

// 頂点の色
const colors = [
  1.0, 1.0, 1.0, 1.0,
  1.0, 0.0, 0.0, 1.0,
  0.0, 1.0, 0.0, 1.0,
  0.0, 0.0, 1.0, 1.0,
  1.0, 1.0, 0.0, 1.0,
  1.0, 0.0, 1.0, 1.0,

  1.0, 1.0, 1.0, 1.0,
  1.0, 0.0, 0.0, 1.0,
  0.0, 1.0, 0.0, 1.0,
  0.0, 0.0, 1.0, 1.0,
  1.0, 1.0, 0.0, 1.0,
  1.0, 0.0, 1.0, 1.0,

  1.0, 1.0, 1.0, 1.0,
  1.0, 0.0, 0.0, 1.0,
  0.0, 1.0, 0.0, 1.0,
  0.0, 0.0, 1.0, 1.0,
  1.0, 1.0, 0.0, 1.0,
  1.0, 0.0, 1.0, 1.0,

  1.0, 1.0, 1.0, 1.0,
  1.0, 0.0, 0.0, 1.0,
  0.0, 1.0, 0.0, 1.0,
  0.0, 0.0, 1.0, 1.0,
  1.0, 1.0, 0.0, 1.0,
  1.0, 0.0, 1.0, 1.0,
];

let coneVAO;
let projectionMatrix = mat4.create();
let modelViewMatrix = mat4.create();

let aVertexPosition;
let uProjectionMatrix;
let uModelViewMatrix;

let vColorPosition;

let rotation = 0;

//

Init();

// Init: 初期化
function Init() {
  const canvas = document.querySelector('canvas');
  const gl = canvas.getContext('webgl2');

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);

  const program = InitProgram(gl);

  aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
  uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix');
  uModelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix');

  vColorPosition = gl.getAttribLocation(program, 'color');

  getBuffers(gl, vertices, indices);
  Draw(gl);
}

// InitProgram: Program取得
function InitProgram(context) {
  const vertex_shader = context.createShader(context.VERTEX_SHADER);
  context.shaderSource(vertex_shader, vertex_source);
  context.compileShader(vertex_shader);

  if (!context.getShaderParameter(vertex_shader, context.COMPILE_STATUS)) {
    const info = context.getShaderInfoLog(vertex_shader);
    console.warn(info);
  }

  const fragment_shader = context.createShader(context.FRAGMENT_SHADER);
  context.shaderSource(fragment_shader, fragment_source);
  context.compileShader(fragment_shader);

  if (!context.getShaderParameter(fragment_shader, context.COMPILE_STATUS)) {
    const info = context.getShaderInfoLog(fragment_shader);
    console.warn(info);
  }

  const program = context.createProgram();
  context.attachShader(program, vertex_shader);
  context.attachShader(program, fragment_shader)
  context.linkProgram(program);

  if (!context.getProgramParameter(program, context.LINK_STATUS)) {
    const info = context.getProgramInfoLog(program);
    console.warn(info);
  }

  context.useProgram(program);

  return program;
}

// getBuffers: Buffers取得
function getBuffers(context, vertices, indices) {
  coneVAO = context.createVertexArray();

  context.bindVertexArray(coneVAO);

  const boxVertexBuffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, boxVertexBuffer);
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);
  context.vertexAttribPointer(aVertexPosition, 3, context.FLOAT, false, 0, 0);
  context.enableVertexAttribArray(aVertexPosition);

  const coneIndexBuffer = context.createBuffer();
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, coneIndexBuffer);
  context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW);

  const boxColorBuffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, boxColorBuffer);
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(colors), context.STATIC_DRAW);
  context.vertexAttribPointer(vColorPosition, 4, context.FLOAT, false, 0, 0);
  context.enableVertexAttribArray(vColorPosition);

  context.bindVertexArray(null);
  context.bindBuffer(context.ARRAY_BUFFER, null);
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
}

// Draw: 描写
function Draw(context) {
  requestAnimationFrame(function () { Draw(context) });

  context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
  context.viewport(0, 0, context.canvas.width, context.canvas.height);

  mat4.perspective(projectionMatrix, 45, context.canvas.width / context.canvas.height, 0.1, 10000);
  mat4.identity(modelViewMatrix);
  mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -5]);
  mat4.rotate(modelViewMatrix, modelViewMatrix, -15, [1, 0, 0]);
  mat4.rotate(modelViewMatrix, modelViewMatrix, rotation + 15, [0, 1, 0]);

  context.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);
  context.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);

  context.bindVertexArray(coneVAO);

  context.drawElements(context.TRIANGLES, indices.length, context.UNSIGNED_SHORT, 0);

  context.bindVertexArray(null);

  rotation += 0.02;
}