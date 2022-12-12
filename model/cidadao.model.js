import { Schema, model } from "mongoose";

const cidadaoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
      lowercase: true,
    },

    numDoc: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,

      lowercase: true,
    },

    dataNasc: { type: String, default: "" },

    acessibilidade: { type: String, default: "nenhuma" },

    genero: { type: String },

    profissao: {},

    profilePic: {
      type: String,
      default:
        "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png",
    },
    noLocal: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["aguardando", "atendimento", "finalizado"],
      default: "aguardando",
    },

    acessos: [{ type: Schema.Types.ObjectId, ref: "Registro" }],
  },

  {
    timestamps: true,
  },
);

const CidadaoModel = model("Cidadao", cidadaoSchema);

export default CidadaoModel;
