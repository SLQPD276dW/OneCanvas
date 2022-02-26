/**
 * Script.tsx
 */

import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { AssertIsDefined } from "../features/Global";
import download_html from '../assets/canvas_download.html?raw';

/**
 * Script関数に渡されるpropsを定義する型
 * 
 * @param path 表示するスクリプトが書かれたファイルへのパス
 * @function emitScripts スクリプトを外部のComponentに送る
 */
type ScriptType = {
    path: string;
    emitScripts: (str: string) => void;
};

/**
 * スクリプト用のHook
 * キャンバスに反映するスクリプトを保持・送信する
 * 
 * @param props 外部のComponentから送られるprops
 * @returns Script.tsxを構成するDOM
 */
export default function Script(props: ScriptType) {
    // textareaで変更があった時に設定するtimeout用の変数
    let textarea_timeout: number;
    // textareaで変更があってから外部のComponentへ送信するまでの時間(ミリ秒)
    const emit_interval = 0.75;

    // ダウンロードする際に設定するファイル名
    const [filename, SetFileName] = useState("canvas");

    /**
     * props.pathに変更があった場合のみ実行
     * 受けとったパスのファイルから中身を読み込みtextareaに表示する
     */
    useEffect(() => {
        const textarea = document.querySelector('textarea');
        AssertIsDefined(textarea);
        fetch(`./src/assets/${props.path}_script.js`)
            .then(res => res.text())
            .then(data => {
                textarea.value = data;
                props.emitScripts(data);
            })
    }, [props.path])

    return (
        <Row>
            <Form>
                <Form.Group as={Row} className="mb-1">
                    <Form.Label column sm="3" className="text-end">
                        ファイル名:
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control placeholder={filename} onChange={
                            (element: React.ChangeEvent<HTMLInputElement>) => {
                                SetFileName(element.target.value);
                            }
                        } />
                    </Col>
                    <Col sm="2">
                        <Button variant="primary" onClick={() => download(filename)}>Download</Button>
                    </Col>
                </Form.Group>
            </Form>

            <textarea className="form-control" rows={10}
                onChange={
                    (element: React.ChangeEvent<HTMLTextAreaElement>) => {
                        window.clearTimeout(textarea_timeout);
                        textarea_timeout = window.setTimeout(props.emitScripts, emit_interval * 1000, element.target.value);
                    }
                }>
            </textarea>
        </Row>
    );
};

/**
 * textarea内に書かれたスクリプトをhtmlファイルとしてダウンロードする処理
 * 
 * @param filename 保存する時のファイル名
 */
function download(filename: string): void {
    const textarea = document.querySelector('textarea');
    AssertIsDefined(textarea);

    const download_html_splits = download_html.split('// Scriptを挿入');
    const content = download_html_splits[0] + textarea.value + download_html_splits[1];

    const blob = new Blob([content], { "type": "text/html" });

    // filenameが空ならば'canvas'を代入する
    if (filename === "") {
        filename = 'canvas';
    }

    const link = document.createElement('a');
    link.download = filename + '.html';
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
}