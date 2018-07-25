"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
class Message {
    constructor(from, to, subject, body) {
        this.envelope = {
            from: from,
            to: to
        };
        this.subject = subject;
        this.raw = body;
    }
}
class Sender {
    constructor(server, port, user, pass) {
        this.transporter = null;
        this.queueLength = 0;
        this.transporter = nodemailer.createTransport({
            pool: true,
            host: server,
            port: port,
            secure: false,
            tls: { rejectUnauthorized: false },
            auth: {
                user: user,
                pass: pass
            }
        });
    }
    queue(from, to, subject, body, attachments = null) {
        return new Promise((resolve, reject) => {
            let message = new Message(from, to, subject, body);
            this.transporter.sendMail(message, function (error, info) {
                if (error) {
                    console.log(`Email could not be sent for ${subject} to ${to}: ` + error);
                    reject(error);
                }
                else {
                    console.log(`Email sent for ${subject} to ${to}: ` + info.response);
                    resolve(to);
                }
            });
        });
    }
    ;
}
exports.Sender = Sender;
//agrifeed (R73) 084 200 2202
//# sourceMappingURL=mail.js.map