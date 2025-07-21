import amqp from "amqplib";
import { getEnvValue } from "../utils/env.utils";

class MainQueue {
  public connection: amqp.ChannelModel | null = null;
  public channel: amqp.Channel | null = null;

  public async initalizeConnection() {
    if (!this.connection) {
      this.connection = await amqp.connect(getEnvValue("AMQP_URL") as string);
      this.channel = await this.connection.createChannel();
    }
  }

  public async getChannel() {
    if (!this.channel) {
      await this.initalizeConnection();
    }
    return this.channel;
  }

  public async closeChannel() {
    if (this.channel) {
      this.channel.close();
    }
  }
}

const getBroker = (): MainQueue => {
  return new MainQueue();
};

export default getBroker;
