/**
 * Canvas.tsx
 */

import { useEffect } from 'react';

// Features
import { CheckNullOrUndefined } from '../features/Global';

// Assets
import canvas_html from '../assets/Canvas.html?raw';
import console_logoutput from '../assets/ConsoleLogOutput.js?raw';

// CSS
import "./Canvas.css";
import { Ratio } from 'react-bootstrap';

/**
 * Canvas関数に送られるpropsを定義する型
 * 
 * @param script キャンバスに反映するスクリプト
 * @function emitLog ログを外部のComponentに送る
 */
type CanvasType = {
    script: string;
    emitLog: (log: string) => void;
}

/**
 * キャンバス用のHook
 * 外部のComponentから送られたスクリプトを反映する
 * 
 * @param props 外部のComponentから送られるprops
 * @returns Canvas.tsxを構成するDOM
 */
export default function Canvas(props: CanvasType) {

    // ページにアクセスしているのが2回目以降かを判断する(削除予定?)
    let isLoading = false;

    /**
     * props.scriptに変更があった場合のみ実行
     * iframeに表示したいhtmlを文字列にしてsrcdocに代入
     */
    useEffect(() => {
        if (isLoading === false) {
            const iframe_element = document.querySelector('iframe');
            CheckNullOrUndefined(iframe_element);

            const html_lens = canvas_html.split('// Scriptを挿入');

            iframe_element.srcdoc = html_lens[0] + `${console_logoutput}` + `${props.script}` + html_lens[1];

            iframe_element.onload = function () {
                const iframe_document = iframe_element.contentDocument;
                CheckNullOrUndefined(iframe_document);
                const iframe_textarea = iframe_document.querySelector('textarea');
                CheckNullOrUndefined(iframe_textarea);
                props.emitLog(iframe_textarea.value);
            }
        }
    }, [props.script]);

    return (
        <div>
            <Ratio aspectRatio="16x9">
                <iframe scrolling='no'></iframe>
            </Ratio>
        </div>
    );
};