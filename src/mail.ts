var nodemailer = require('nodemailer');

class Message {
    constructor(from : string, to: string, subject : string, body : string) {
        this.envelope = {
            from: from,
            to: to
        };
        this.subject = subject;
        this.raw = body;
    }

    envelope : {
        from: string,
        to: string
    };
    subject: string;
    raw: string;
    attachments: {raw:string}[];
}

export class Sender {
    constructor(server : string, port : number, user : string, pass : string) {
        this.transporter = nodemailer.createTransport({
            pool: true,
            host: server,
            port: port,
            secure: false,
            tls: {rejectUnauthorized: false},
              auth: {
                user: user,
                pass: pass
              }
        });
    }

    queue (from, to, subject, body, attachments: {raw: string}[] = null) : Promise<any> {
        return new Promise((resolve, reject) => {
            let message = new Message(from, to, subject, body);
    
            this.transporter.sendMail(message, function(error, info){
              if (error) {
                console.log(`Email could not be sent for ${ subject } to ${ to }: ` + error);
                reject(error);
              } else {
                console.log(`Email sent for ${ subject } to ${ to }: ` + info.response);
                resolve(to);
              }
            }); 
        });
    };

    transporter = null;
    queueLength = 0;
}

//agrifeed (R73) 084 200 2202