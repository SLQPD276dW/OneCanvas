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

        this.warn = function (...data) {
            this.output(...data);
        }

        this.error = function (...data) {
            this.output(...data);
        }

        this.info = function (...data) {
            this.output(...data);
        }

        this.clear = function () {
            this.textarea.textContent = "";
        }

    }
}

console = new console_logoutput;