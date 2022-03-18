/**
 * Script.tsx
 */

import React, { useEffect, useState, useRef } from "react";

// Features
import { CheckNullOrUndefined } from "../features/Global";
import { download_htmlfile } from "../features/Download";

// Assets
import download_html from '../assets/canvas_download.html?raw';
import blank_script from '../assets/blank_script.js?raw';
import webgl_script from '../assets/webgl_script.js?raw';
import three_script from '../assets/three_script.js?raw';

// CSS
import { Button, Row, Col, Form } from "react-bootstrap";

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

// assetsフォルダに置いてあるスクリプトに名前を紐づける配列 {[スクリプト名]: スクリプト}
const scripts_dict: { [name: string]: string } = {
    "blank": blank_script,
    "webgl": webgl_script,
    "three": three_script
}

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

    // textareaの参照
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // inputの参照
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * props.pathに変更があった場合のみ実行
     * 受けとったパスのファイルから中身を読み込みtextareaに表示する
     */
    useEffect(() => {
        const textarea = document.querySelector('textarea');
        CheckNullOrUndefined(textarea);
        const script = scripts_dict[props.path];
        textarea.value = script;
        props.emitScripts(script);
    }, [props.path])

    return (
        <Row>
            <Form>
                <Form.Group as={Row} className="mb-1">
                    <Form.Label column sm="3" className="text-end">
                        ファイル名:
                    </Form.Label>
                    <Col sm="5">
                        <Form.Control placeholder="canvas" ref={inputRef} />
                    </Col>
                    <Col sm="2">
                        <Button variant="primary"
                            onClick={() =>
                                download_htmlfile(inputRef.current!.value, textareaRef.current!.value)
                            }>
                            Download]
                        </Button>
                    </Col>
                </Form.Group>
            </Form>

            <Col>
                <textarea className="form-control" rows={10} spellCheck="false" ref={textareaRef}
                    onChange={
                        (element: React.ChangeEvent<HTMLTextAreaElement>) => {
                            window.clearTimeout(textarea_timeout);
                            textarea_timeout = window.setTimeout(props.emitScripts, emit_interval * 1000, element.target.value);
                        }
                    }>
                </textarea>
            </Col>
        </Row>
    );
};