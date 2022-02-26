/**
 * Canvas.tsx
 */

import { useEffect, useRef, useState } from 'react';
import { AssertIsDefined } from '../features/Global';
import "./Canvas.css";
import canvas_html from '../assets/Canvas.html?raw';

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
     * iframeに
     */
    useEffect(() => {
        if (isLoading === false) {
            const iframe_element = document.querySelector('iframe');
            AssertIsDefined(iframe_element);

            const html_lens = canvas_html.split('// Scriptを挿入');

            iframe_element.srcdoc = html_lens[0] + `${props.script}` + html_lens[1];

            iframe_element.onload = function () {
                const iframe_document = iframe_element.contentDocument;
                const iframe_textarea = iframe_document?.querySelector('textarea');
                AssertIsDefined(iframe_textarea);
                props.emitLog(iframe_textarea.value);
            }
        }
    }, [props.script]);

    return (
        <div>
            {/* scrollingとframeBorderは非推奨であるため削除予定*/}
            <iframe scrolling='no' frameBorder="0"></iframe>
        </div>
    );
};