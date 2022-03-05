/**
 * AboutModal.tsx
 */

import { Modal, Button } from 'react-bootstrap';

/**
 * AboutModal関数に渡されるpropsを定義する型
 * 
 * @param is_open AboutModalが開いているか
 * @function closeModal AboutModalを閉じる
 */
type AboutModalType = {
    is_open: boolean;
    closeModal: () => void;
}

/**
 * 「About」をクリックしたら表示されるモーダル用のHook
 * 
 * @param props 外部のComponentから送られるprops
 * @returns AboutModal.tsxを構成するDOM
 */
export default function AboutModal(props: AboutModalType) {
    return (
        <Modal show={props.is_open} onHide={props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>One Canvasについて</Modal.Title>
            </Modal.Header>
            <Modal.Body>One CanvasはCanvas1つだけを配置したWebアプリです。
                WebGLの勉強などにお使いください。
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>
                    閉じる
                </Button>
            </Modal.Footer>
        </Modal>
    )
}