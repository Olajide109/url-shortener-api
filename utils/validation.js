export function validateRequiredFields(data) {
  if (!data.originalUrl) {
    return "originalUrl is required";
  }

  return null;
}

export function validateUrlType(data) {
  if (typeof data.originalUrl !== "string") {
    return "originalUrl must be a string";
  }

  return null;
}

export function validateResource(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return "Request body must be a valid object";
  }
  const requiredError = validateRequiredFields(data);

  if (requiredError) {
    return requiredError;
  }

  const typeError = validateUrlType(data);

  if (typeError) {
    return typeError;
  }

  const formatError = validateUrlFormat(data);

  if (formatError) {
    return formatError;
  }

  return null;
}

export function validateUrlFormat(data) {
  try {
    const url = new URL(data.originalUrl);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "URL must use HTTP or HTTPS";
    }

    return null;
  } catch (error) {
    return "Please provide a valid URL";
  }
}

