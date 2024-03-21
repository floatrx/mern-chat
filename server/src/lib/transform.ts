import mongoose from 'mongoose';

/**
 * Setup JSON transform
 * @param schema
 * @returns schema modified with toJSON transform:
 *  - Remove duplicate _id
 *  - Remove version key
 *  - Remove password
 *  - Set id as first field
 */
export const setupJSONTransform = (schema: mongoose.Schema) => {
  schema.set('toJSON', {
    transform: (_: unknown, ret: Record<string, any>) => {
      const json = { ...ret };
      delete json._id; // remove duplicate _id
      delete json.__v; // remove version key
      delete json.password; // remove password
      return { id: ret.id, ...json }; // set id as first field
    },
  });
  return schema;
};
