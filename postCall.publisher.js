// src/services/serviceBus/postCall.publisher.js
import ServiceBusManager from "../../utils/serviceBusManager.js";
import { config } from "../../config/index.js";

export async function publishPostCallSummary({
  callId,
  payload,
  logger
}) {
  try {
    await ServiceBusManager.send(
      config.topics.POST_CALL,
      payload,
      {
        messageId: `${callId}-POST_CALL_READY`,
        applicationProperties: {
          callId,
          eventType: payload.eventType
        }
      },
      logger
    );

    logger.info("Post-call summary event published");
  } catch (err) {
    logger.error(
      { err: err.message },
      "Failed to publish post-call event"
    );
  }
}
