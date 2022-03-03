/**
 * Navbar.tsx
 */

import { Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import { CheckNullOrUndefined, repository_link } from '../features/Global';
import { useState } from 'react';
import './Navbar.css';

import "bootstrap-icons/font/bootstrap-icons.css";

/**
 * Navbar関数に渡されるpropsを定義する型
 * 
 * @function emitPath パスを外部のComponentに送る
 */
type NavbarType = {
    emitPath: (path: string) => void;
};

/**
 * ナビゲーションバー用のHook
 * 
 * @param props 外部のComponentから送られるprops
 * @returns Navbar.tsxを構成するDOM
 */
export default function Navbar(props: NavbarType) {

    // modalが開いているかを管理する変数
    const [modalopen, setmodalopen] = useState(false);

    // modalを開く
    const openModal = () => {
        if (!modalopen) {
            setmodalopen(true);
        }
    };

    // modalを閉じる
    const closeModal = () => {
        setmodalopen(false);
    };

    return (
        <div>
            <h1 className='text-center display-4 title'>One Canvas</h1>
            <Nav className="justify-content-center">
                <Nav.Item onClick={openModal}>
                    <Nav.Link>
                        <p className='fw-bold fs-1'>About</p>

                        <Modal show={modalopen} onHide={closeModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>One Canvasについて</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>One CanvasはCanvas1つだけを配置したWebアプリです。
                                WebGLの勉強などにお使いください。
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={closeModal}>
                                    閉じる
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Nav.Link>
                </Nav.Item>
                <NavDropdown title="Examples" id="nav-dropdown" className="fw-bold fs-1"
                    onSelect={(selectedKey) => {
                        CheckNullOrUndefined(selectedKey);
                        props.emitPath(selectedKey);
                    }}>
                    <NavDropdown.Item eventKey="blank">Blank</NavDropdown.Item>
                    <NavDropdown.Item eventKey="webgl">Square</NavDropdown.Item>
                    <NavDropdown.Item eventKey="three">Three.js</NavDropdown.Item>
                </NavDropdown>
                <Nav.Item>
                    <Nav.Link href={repository_link} target="_blank" rel="noreferrer noopener">
                        <div>
                            <h1 className='fw-bold'>Source <i className='bi bi-github' style={{fontSize:"2rem"}}></i></h1>
                        </div>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}