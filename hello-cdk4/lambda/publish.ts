const aws = require('aws-sdk')
const sqs = new aws.SQS()

exports.handler=async(event:any)=>{
    var errorResponse = {
        statusCode:400,
        body: 'Message not pushed to queue'
    };

    var successfulResponse = {
        statusCode:200,
        body: 'Message  pushed to queue'
    };
    console.log(event);
    if(event.body){
            let body = JSON.parse(event.body);
            console.log("body.body=" + body.body);
            const queueMessage = {
                QueueUrl: process.env.QUEUE_URL,
                MessageBody: body.body
            }
            await sqs.sendMessage(queueMessage).promise();
            return successfulResponse
    }
    
    return errorResponse;

}