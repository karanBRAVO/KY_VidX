import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    subscriptions: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "channel",
          unique: true,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const SubscriptionModel =
  mongoose.models["subscription"] ||
  new mongoose.model("subscription", subscriptionSchema);
