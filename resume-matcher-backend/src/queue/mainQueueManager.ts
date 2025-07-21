import amqp from "amqplib";
import matcherLogger from "../libs/logger.libs";
import { UnknownAny } from "../types/types";
import { getEnvValue } from "../utils/env.utils";

class QueueManager {
  public connection: amqp.ChannelModel | null = null;
  public channel: amqp.Channel | null = null;

  public async initalizeConnection() {
    let retryCount = 5;
    let retryStatus = true;
    while (retryCount > 0 && retryStatus) {
      try {
        if (!this.connection || !this.channel) {
          this.connection = await amqp.connect(
            getEnvValue("AMQP_URL") as string
          );
          this.channel = await this.connection.createChannel();
          matcherLogger.info(`RabbitMQ Connection SuccessFully`);
          break
        }
      } catch (err: UnknownAny) {
        const isMaximumRabbitMQRetry = retryCount.toString().startsWith("0");
        if (isMaximumRabbitMQRetry) {
          matcherLogger.error(
            `Maximum Retry Mechanism Has been Exceeded to the RabbitMQ Server`
          );
          return;
        }
        retryCount = retryCount - 1;
        matcherLogger.info(`Retrying the RabbitMQ Connection : ${retryCount}`);
        continue;
      }
    }
  }

  public async getChannel() {
    if (!this.channel) {
      await this.initalizeConnection();
    }
    return {
      channel: this.channel,
    };
  }

  public async closeChannel() {
    if (this.channel) {
      await this.channel.close();
    }
  }

  public async closeConnection() {
    if (this.connection && this.channel) {
      this.connection.close();
    }
  }
}

const getBroker = (): QueueManager => {
  return new QueueManager();
};

export default getBroker;
