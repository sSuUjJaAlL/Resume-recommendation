import amqp from "amqplib";
import { getObjectValue } from "../utils/env.utils.js";

async function getRabbitMQConnection() {
  const connection = await amqp.connect(getObjectValue("AMQP_URL"));
  return connection;
}

async function getRabbitMQChannel() {
  const connection = await getRabbitMQConnection();
  const channel = await connection.createChannel();
  return channel;
}

export { getRabbitMQChannel };
