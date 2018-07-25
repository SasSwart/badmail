"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail = require("./mail");
const fs = require("fs");
let sender = new mail.Sender('mail.gbg.org.za', 587, 'it@gbg.org.za', 'Hunt!ngSpr!ngbuck123');
function forwardEmail(message, recipient) {
    return __awaiter(this, void 0, void 0, function* () {
        // message should be the valid contents of an eml file
        // recipient should be a valid email address
        sender.queue('it@gbg.org.za', recipient, 'Missing Message', message);
    });
}
// Copied off Stack Overflow
// array.Prototype.includes didn't work for some reason and this was faster than debugging it.
function inArray(needle, haystack) {
    var count = haystack.length;
    for (var i = 0; i < count; i++) {
        if (haystack[i] == needle) {
            return true;
        }
    }
    return false;
}
let input = `${__dirname}/input`;
fs.readdir(input, (err, files) => {
    files.forEach(file => {
        fs.readFile(`${input}/${file}`, (err, data) => {
            let message = data.toString().split('\n');
            let recipients = [];
            message.forEach(line => {
                if (line.match(/(Envelope-to:|for | To: )/)) {
                    let recipient = line.match(/\w*@gbggroup.co.za/);
                    if (recipient && !inArray(recipient, recipients)) {
                        recipients.push(recipient[0]);
                    }
                    ;
                }
            });
            recipients.forEach(recipient => {
                forwardEmail(message.join('\n'), recipient);
            });
        });
    });
});
//# sourceMappingURL=index.js.map