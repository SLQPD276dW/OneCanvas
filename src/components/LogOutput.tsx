/**
 * Console.tsx
 */

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

    return (
        <div>
            <pre>
                <code className="language-js">
                    {props.log}
                </code>
            </pre>
      </div>  
    );
}