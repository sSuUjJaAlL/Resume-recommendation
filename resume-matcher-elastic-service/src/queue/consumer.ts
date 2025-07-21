import elasticConsumer from "./consumer/elastic.consumer";
import getBroker from "./mainQueue";
import amqp from "amqplib";

async function startElasticConsumer() {
  const broker = getBroker();
  const brokerChannel = await broker.getChannel();
  await elasticConsumer(brokerChannel as amqp.Channel);
}

export default startElasticConsumer;
