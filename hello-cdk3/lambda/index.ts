const {DynamoDB} = require('aws-sdk');

exports.handler = async function(event: any){
    console.log(JSON.stringify(event, undefined, 2));
    const client = new DynamoDB.DocumentClient();

    for(const record of event.Records){
        console.log("process.env.TableName=", process.env.TableName)
        console.log("record.body=", record.body)
        //const body = record.body ? JSON.parse(record.body) : {}
        //console.log("body=", body)
        await client.put({
            TableName : process.env.TableName,
            Item: {
                id : record.messageId,
                text: record.body
            }
        }).promise();

    }

};