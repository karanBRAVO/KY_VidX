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
          type: mongoose.Types.ObjectId,
          ref: "channel",
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
