import { Schema, model } from "mongoose";

const serviceSchema = new Schema(
  {
    details: { type: String, unique: true, required: true, trim: true, lowercase: true},
    discontinued: { type: Boolean, default: false },
    dateFin: { type: Date, default: Date.now },

    user: { type: Schema.Types.ObjectId, ref: "User" },
    collab: [{ type: Schema.Types.ObjectId, ref: "User" }],

    status: {
      type: String,
      enum: ["Disponivel", "Descontinuado", "Em Aprovação", "Suspenso"],
      default: "Disponivel",
    },

    // Incluído para vincular o serviço ao setor
    localSetor: { type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 40,
      lowercase: true,
    },
    unidade: {type: Number},
  },
  { timestamps: true },
);

const ServiceModel = model("Service", serviceSchema);

export default ServiceModel;
