/**
 * Navbar.tsx
 */

import { useState } from 'react';

// Components
import AboutModal from './AboutModal';

// Features
import { CheckNullOrUndefined, repository_link } from '../features/Global';

// CSS
import './Navbar.css';
import { Nav, NavDropdown } from 'react-bootstrap';
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

    // AboutModalが開いているかを管理する変数
    const [is_active_about_modal, SetAboutModalActive] = useState(false);

    // AboutModalを開く
    const OpenAboutModal = () => {
        if (!is_active_about_modal) {
            SetAboutModalActive(true);
        }
    };

    // AboutModalを閉じる
    const CloseAboutModal = () => {
        SetAboutModalActive(false);
    };

    return (
        <div>
            <h1 className='text-center display-4 title'>One Canvas</h1>
            <Nav className="justify-content-center">
                <Nav.Item onClick={OpenAboutModal}>
                    <Nav.Link>
                        <p className='fw-bold fs-1'>About</p>

                        <AboutModal is_open={is_active_about_modal} closeModal={CloseAboutModal} />
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
                            <h1 className='fw-bold'>Source <i className='bi bi-github' style={{ fontSize: "2rem" }}></i></h1>
                        </div>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}