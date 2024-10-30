import { z } from 'zod';
import { ContactFormConfig, FieldType } from '@/types/types';

export const createValidationSchema = (config: ContactFormConfig) => {
  const schemaFields: { [key: string]: z.ZodType<any> } = {};

  config.fields.forEach((field) => {
    let fieldSchema: z.ZodType<any>;

    switch (field.type) {
      case 'email':
        fieldSchema = z
          .string()
          .email(field.validation?.message || 'Invalid email address');
        break;
      case 'tel':
        fieldSchema = z
          .string()
          .regex(
            new RegExp(field.validation?.pattern || '^[0-9+-]+$'),
            field.validation?.message || 'Invalid phone number'
          );
        break;
      case 'number':
        fieldSchema = z.number({
          required_error: 'This field is required',
          invalid_type_error: 'Must be a number',
        });
        if (field.validation?.min !== undefined) {
          fieldSchema = fieldSchema.min(field.validation.min);
        }
        if (field.validation?.max !== undefined) {
          fieldSchema = fieldSchema.max(field.validation.max);
        }
        break;
      case 'date':
        fieldSchema = z.string().transform((str) => new Date(str));
        break;
      default:
        fieldSchema = z.string();
        if (field.validation?.min !== undefined) {
          fieldSchema = fieldSchema.min(
            field.validation.min,
            field.validation?.message ||
              `Must be at least ${field.validation.min} characters`
          );
        }
        if (field.validation?.max !== undefined) {
          fieldSchema = fieldSchema.max(
            field.validation.max,
            field.validation?.message ||
              `Must be at most ${field.validation.max} characters`
          );
        }
        if (field.validation?.pattern) {
          fieldSchema = fieldSchema.regex(
            new RegExp(field.validation.pattern),
            field.validation?.message || 'Invalid format'
          );
        }
    }

    if (!field.required) {
      fieldSchema = fieldSchema.optional();
    }

    schemaFields[field.name] = fieldSchema;
  });

  return z.object(schemaFields);
};
