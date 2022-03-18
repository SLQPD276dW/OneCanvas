/**
 * Download.ts
 */

// Assets
import download_html from '../assets/canvas_download.html?raw';

/**
 * 渡されたスクリプトをhtmlファイルとしてダウンロードする処理
 * 
 * @param filename 保存する時のファイル名
 * @param file_text 保存するファイルのスクリプト
 */
export function download_htmlfile(filename: string, file_text: string): void {

    const download_html_splits = download_html.split('// Scriptを挿入');
    const content = download_html_splits[0] + file_text + download_html_splits[1];

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