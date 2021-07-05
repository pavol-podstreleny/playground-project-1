import Joi from "joi";

export interface ValidKey {
  [state: string]: string | number | undefined;
}

export function validateInput<T extends ValidKey, K extends keyof T>(
  schema: Joi.ObjectSchema<any>,
  key: K,
  value: any,
  errorObject: T
): T {
  const validationResult = schema.validate(
    {
      [key]: value,
    },
    {
      abortEarly: false,
    }
  );

  let containsError = false;
  if (validationResult.error) {
    for (let detail of validationResult.error.details) {
      errorObject[key] = detail.message as T[K];
      containsError = true;
    }
  }
  if (!containsError) {
    delete errorObject[key];
  }

  return errorObject;
}

export function containsKey<T>(object: T, key: string): boolean {
  return key in object;
}
