import { SQSClient, ReceiveMessageCommand, ReceiveMessageCommandInput } from "@aws-sdk/client-sqs";
require('dotenv').config()

const REGION = process.env.AWS_REGION;
const SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;
const SQS_WAIT_TIME: number = Number(process.env.SQS_WAIT_TIME);
const SQS_MAX_NUMBER_OF_MESSAGES: number = Number(process.env.SQS_MAX_NUMBER_OF_MESSAGES);

const params: ReceiveMessageCommandInput = {
  MaxNumberOfMessages: SQS_MAX_NUMBER_OF_MESSAGES,
  MessageAttributeNames: ["All"],
  QueueUrl: SQS_QUEUE_URL,
  WaitTimeSeconds: SQS_WAIT_TIME,
};

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const start = async () => {
  const sqsClient = new SQSClient({ region: REGION });
  try {
    while (1) {
      const data = await sqsClient.send(new ReceiveMessageCommand(params));
      const msgQty = data.Messages?.length;

      console.log(`Messages received: ${msgQty === undefined ? 0 : msgQty}. Http status code: ${data.$metadata.httpStatusCode}`);

      if (msgQty! > 0) {
        // Simulates a long-running process
        console.log("Processing messages");
        await delay(1);
        console.log("Messages processed");
      }
    }
  } catch (err) {
    console.error("Error", err);
  }
}

export { start };
