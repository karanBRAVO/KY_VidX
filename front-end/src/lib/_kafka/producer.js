const { Kafka, Partitioners } = require("kafkajs");

// client id
const clientId = "vidx-client-id";

// brokers avialable
const brokers = ["localhost:9092"];

// methods
let producer;
export const get_producer = async () => {
  if (!producer) {
    const kafka = new Kafka({ clientId, brokers });
    producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });
    await producer.connect();
  }
  return producer;
};
