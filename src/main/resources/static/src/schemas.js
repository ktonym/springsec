import { schema } from "normalizr";

export const clientSchema = new schema.Entity(
    "clients", {}, { idAttribute: "clientId"}
);