import { Schema, model } from "mongoose";

const serviceSchema = new Schema(
  {
    details: { type: String, required: true },
    complete: { type: Boolean, default: false },
    dateFin: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    collab: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["Disponivel", "Descontinuado", "Em Aprovação", "Suspenso"],
      default: "Disponivel",
    },
  },
  { timestamps: true },
);

const ServiceModel = model("Service", serviceSchema);

export default ServiceModel;
