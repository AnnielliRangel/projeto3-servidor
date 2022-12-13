import { Schema, model } from "mongoose";

const cidadaoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 40,
      lowercase: true,
    },
    numDoc: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      lowercase: true,
    },
    tipoDoc: {
      type: String,
      default: "",
    },

    dataNasc: { type: String, default: "" },

    acessibilidade: { type: String, default: "nenhuma" },

    // acessibilidade: {
    //   type: String,
    //   enum: ["Atudinal", "Cultural","Arquitetônica", "Comunicacional", "Instrumental", "Metodológica", "Programática", "Digital", "Natural", "Nenhuma"],
    //   default: "Nenhuma",
    // },

    genero: { type: String },

    // genero: {
    //     type: String,
    //     enum: ["MASCULINO","FEMININO","TRANSGENERO", "AGENERO", "LGBTQIA+","NÃO INFORMADO","OUTRO"],
    //   },

    age: {
      type: Number,
      min: 16,
      max: 100,
    },

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
