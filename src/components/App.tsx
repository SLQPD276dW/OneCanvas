/**
 * App.tsx
 */

import { useState } from 'react'  
import './App.css'

// Components
import Canvas from './Canvas'
import Script from './Script'
import Navbar from './Navbar'
import Console from './Console'

import { Col, Container, Row } from 'react-bootstrap'

/**
 * One Canvasを構成するHook
 * 
 * @returns App.tsxを構成するDOM
 */
export default function App() {

  // スクリプトを保持・受け渡しする変数
  const [script, SetScript] = useState("");

  // ログを保持・受け渡しする変数
  const [log, SetLog] = useState("");
  
  // パスを保持・受け渡しする変数(初期値:"webgl")
  const [path, SetPath] = useState("webgl");

  return (
    <Container className="justify-content-center">
      <Navbar emitPath={SetPath}/>
      <Row>
        <Col>
          <Canvas script={script} emitLog={SetLog} />
        </Col>
        <Col>
          <Console log={log} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Script path={path} emitScripts={SetScript} />
        </Col>
      </Row>
    </Container>
  );
};
