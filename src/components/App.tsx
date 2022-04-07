/**
 * App.tsx
 */

import { useState } from 'react';

// Components
import Canvas from './Canvas';
import Script from './Script';
import Navbar from './Navbar';
import LogOutput from './LogOutput';

// CSS
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';

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

  // 環境変数を読み込むためのconsole.log(後で削除予定)
  console.log(import.meta.env.MODE);
  console.log(import.meta.env.VITE_TEST);
  console.log(import.meta.env.VITE_VERCEL_TEST);

  return (
    <Container fluid className="justify-content-center">
      <Navbar emitPath={SetPath}/>
      <Row>
        <Col>
          <Canvas script={script} emitLog={SetLog} />
        </Col>
        <Col>
          <LogOutput log={log} />
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
