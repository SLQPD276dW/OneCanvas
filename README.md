# OneCanvas

One CanvasはCanvas1つだけを配置したWebアプリです。
WebGLの勉強などにお使いください。

URL : https://one-canvas.vercel.app/

## 使い方

下のテキストエリアからコードを入力すると、左上のキャンバスにすぐに反映されます。
テキストエリアにconsole.logを打ち込むと、右上のログ表示画面に反映されます。(console.log(“Hello“);と打ち込むと、ログ表示画面には「Hello」と表示されます。)
(console.warnやconsole.infoなどの他のメソッドについてはまだ対応しておりません。今後のアップデートで対応する予定です。ご不便をおかけして申し訳ございません。)
中央右の「Download」ボタンを押すと、テキストエリアに入力されたコードとキャンバスを含んだhtmlファイルをダウンロードできます。ファイル名はボタン左の「ファイル名」入力欄から入力ください。(何も入力しなければ、ファイル名は「canvas.html」となります。)


## 使用したライブラリ・フレームワーク :(バージョン)
- TypeScript :4.4.4
- React :17.0.2
- Bootstrap :5.1.3
- React Bootstrap :2.1.2
- Prism.js :1.27.0
