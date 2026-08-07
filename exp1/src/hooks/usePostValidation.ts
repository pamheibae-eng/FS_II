import { useMemo } from "react";

const platformLimits: Record<string, number> = {
  Twitter: 280,
  Facebook: 5000,
  Instagram: 2200,
  LinkedIn: 3000,
};

export function usePostValidation(
  platform: string,
  content: string
) {
  return useMemo(() => {
    const limit = platformLimits[platform];
    const charactersUsed = content.length;
    const charactersRemaining = limit - charactersUsed;

    let message = "";
    let type: "success" | "warning" | "error" = "success";

    if (charactersRemaining < 0) {
      type = "error";
      message = `Character limit exceeded by ${Math.abs(
        charactersRemaining
      )} characters.`;
    } else if (charactersRemaining <= 20) {
      type = "warning";
      message = `${charactersRemaining} characters remaining.`;
    } else {
      type = "success";
      message = `${charactersRemaining} characters remaining.`;
    }

    return {
      limit,
      charactersUsed,
      charactersRemaining,
      type,
      message,
    };
  }, [platform, content]);
}

export default usePostValidation;