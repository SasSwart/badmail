import * as mail from './mail';
import * as fs from 'fs';

let sender = new mail.Sender('mail.gbg.org.za', 587, 'it@gbg.org.za', 'Hunt!ngSpr!ngbuck123');

async function forwardEmail(message: string, recipient : string) {
    // message should be the valid contents of an eml file
    // recipient should be a valid email address
    sender.queue('it@gbg.org.za', recipient, 'Missing Message', message);
}

// Copied off Stack Overflow
// array.Prototype.includes didn't work for some reason and this was faster than debugging it.
function inArray(needle,haystack)
{
    var count=haystack.length;
    for(var i=0;i<count;i++)
    {
        if(haystack[i]==needle){return true;}
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
                    };
                }
            });
            recipients.forEach(recipient => {
                forwardEmail(message.join('\n'), recipient);
            });
        });
    })
});