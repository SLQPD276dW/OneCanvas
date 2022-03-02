class console_logoutput {
    constructor() {
        this.textarea = document.querySelector('textarea');
        this.output = function (...data) {
            for (const element of data) {
                this.textarea.textContent += element + '\n';
            }
        }
        this.log = function (...data) {
            this.output(...data);
        }
    }
}

console = new console_logoutput;