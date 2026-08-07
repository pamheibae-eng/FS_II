export const platformLimits = {
  twitter: 280,
  linkedin: 3000,
  instagram: 2200,
};

export function validatePost(
  content: string,
  platform: keyof typeof platformLimits
) {
  if (!content.trim()) {
    return {
      isValid: false,
      error: "Post cannot be empty.",
    };
  }

  const limit = platformLimits[platform];

  if (content.length > limit) {
    return {
      isValid: false,
      error: `Exceeds limit of ${limit}.`,
    };
  }

  return {
    isValid: true,
    error: null,
  };
}