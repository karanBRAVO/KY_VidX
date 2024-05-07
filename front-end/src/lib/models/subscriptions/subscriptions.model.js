import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      ref: "user",
    },
    subscriptions: {
      type: [
        {
          channelId: { type: mongoose.Types.ObjectId, ref: "channel" },
          time: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const SubscriptionModel =
  mongoose.models["subscription"] ||
  mongoose.model("subscription", subscriptionSchema);
