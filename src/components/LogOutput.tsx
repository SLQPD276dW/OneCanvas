/**
 * Console.tsx
 */

import { useEffect } from "react";
import Prism from 'prismjs';
import { AssertIsDefined } from "../features/Global";
import "./LogOutput.css";

/**
 * Console関数に渡されるpropsを定義する型
 * 
 * @param log Console関数内で表示するログ
 */
type ConsoleType = {
    log: string;
};

/**
 * コンソール用のHook
 * ログを保持する
 * 
 * @param props 外部のComponentから送られるpros
 * @returns Console.tsxを構成するDOM
 */
export default function LogOutput(props: ConsoleType) {

    // props.logが更新されたらハイライトする
    useEffect(() => {
        const code = document.querySelector('code');
        AssertIsDefined(code);
        Prism.highlightElement(code);
    }, [props.log]);

    return (
        <div>
            <pre className="line-numbers show-language">
                <code className="language-log">
                    {props.log}
                </code>
            </pre>
        </div>
    );
}