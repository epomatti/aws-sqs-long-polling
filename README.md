# AWS SQS long polling

Create a queue:

```sh
aws sqs create-queue --queue-name "MyQueue" --region $region
```

Create variables file:

```sh
touch .env
```

Add values to your `.env`:

```sh
REGION="us-east-2"
SQS_QUEUE_URL="https://sqs.us-east-2.amazonaws.com/000000000000/MyQueue"
SQS_WAIT_TIME="20"
SQS_MAX_NUMBER_OF_MESSAGES="1"
```

Get the dependencies and start the listener:

```
npm i
npm run dev
```

Send messages to the queue adding the queue URL:

```sh
aws sqs send-message \
  --queue-url $queue \
  --message-body "Hello"
```

Messages will be consumed via long polling.

When done, delete the queue: `aws sqs delete-queue --queue-url $queue`
