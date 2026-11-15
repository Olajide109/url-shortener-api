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
const testData = {
  originalUrl: 12345,
};

//console.log(validateRequiredFields(testData));
//console.log(validateUrlType(testData));

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

console.log(
  "Test 1:",
  validateResource({
    originalUrl: "https://www.google.com",
  }),
);

console.log(
  "Test 2:",
  validateResource({
    originalUrl: "",
  }),
);

console.log(
  "Test 3:",
  validateResource({
    originalUrl: 12345,
  }),
);

console.log(
  "Test 4:",
  validateResource({
    originalUrl: "hello world",
  }),
);

console.log("Test 5:", validateResource(null));

console.log("Test 6:", validateResource());

console.log("Test 7:", validateResource([]));
