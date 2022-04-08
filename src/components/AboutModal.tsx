/**
 * AboutModal.tsx
 */

// CSS
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
        <Modal size="lg" show={props.is_open} onHide={props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>One Canvasについて</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>One CanvasはCanvas1つだけを配置したWebアプリです。<br />
                    WebGLの勉強などにお使いください。</p>
                
                <h3>使い方</h3>

                <p>下のテキストエリアからコードを入力すると、左上のキャンバスにすぐに反映されます。<br />
                テキストエリアにconsole.logを打ち込むと、右上のログ表示画面に反映されます。<br />
                (console.log(“Hello“);と打ち込むと、ログ表示画面には「Hello」と表示されます。)</p>
                    (以下のメソッドが対応しております。)
                    <ul>
                        <li>console.log</li>
                        <li>console.warn</li>
                        <li>console.error</li>
                        <li>console.info</li>
                        <li>console.clear</li>
                    </ul>
                中央右の「Download」ボタンを押すと、テキストエリアに入力されたコードとキャンバスを含んだhtmlファイルをダウンロードできます。
                ファイル名はボタン左の「ファイル名」入力欄から入力ください。<br />
                (何も入力しなければ、ファイル名は「canvas.html」となります。)
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>
                    閉じる
                </Button>
            </Modal.Footer>
        </Modal>
    )
}