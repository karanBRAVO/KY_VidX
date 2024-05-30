const { Kafka } = require("kafkajs");

const clientId = "vidx-client-id";
const brokers = ["localhost:9092"];

const kafka = new Kafka({ clientId, brokers });

async function main() {
  let group_id = "group-1";

  const consumer = kafka.consumer({ groupId: group_id });

  await consumer.connect();

  process.on("SIGINT", async () => {
    await consumer.disconnect();
  });
  process.on("SIGTERM", async () => {
    await consumer.disconnect();
  });

  let topic_name = "video-views";

  await consumer.subscribe({
    topic: topic_name,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        value: JSON.parse(message.value.toString()),
      });
    },
  });
}

main();
