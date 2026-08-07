function usePostValidation(platform: string, content: string) {
  const limits: Record<string, number> = {
    Twitter: 280,
    Instagram: 2200,
    Facebook: 63206,
  };

  const maxLength = limits[platform];

  if (content.length === 0) {
    return {
      type: "error",
      message: "Post cannot be empty",
    };
  }

  if (content.length > maxLength) {
    return {
      type: "error",
      message: `${platform} allows only ${maxLength} characters`,
    };
  }

  return {
    type: "success",
    message: `Good! ${content.length}/${maxLength} characters used`,
  };
}

export default usePostValidation;