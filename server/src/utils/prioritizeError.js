export const prioritizeErrors = (errors) => {
  const priorityMap = {
    required: 1,
    minLength: 2,
    invalidFormat: 3,
  };

  return errors?.sort((a, b) => {
    const priorityA = a.message.includes("required")
      ? priorityMap.required
      : a.code === "too_small"
      ? priorityMap.minLength
      : priorityMap.invalidFormat;

    const priorityB = b.message.includes("required")
      ? priorityMap.required
      : b.code === "too_small"
      ? priorityMap.minLength
      : priorityMap.invalidFormat;

    return priorityA - priorityB;
  });
};
