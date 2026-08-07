import { useState } from "react";
import { validatePost, platformLimits } from "../utils/validationStrategy";
import { saveDraftMock } from "../utils/mockApi";

type Props = {
  addDraft: (draft: any) => void;
};

function PostComposer({ addDraft }: Props) {
  const [content, setContent] = useState("");
  const [platform, setPlatform] =
    useState<keyof typeof platformLimits>("twitter");

  const validation = validatePost(content, platform);

  const handleSave = async () => {
    try {
      const draft = {
        content,
        platform,
      };

      await saveDraftMock(draft);
      addDraft(draft);

      alert("Draft saved successfully!");

      setContent("");
    } catch (error) {
      alert("Failed to save draft.");
    }
  };

  return (
    <div>
      <h2>Post Composer</h2>

      <select
        value={platform}
        onChange={(e) =>
          setPlatform(e.target.value as keyof typeof platformLimits)
        }
      >
        <option value="twitter">Twitter</option>
        <option value="linkedin">LinkedIn</option>
        <option value="instagram">Instagram</option>
      </select>

      <br />
      <br />

      <textarea
        rows={6}
        cols={50}
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <p className="counter">
          {content.length}/{platformLimits[platform]}
      </p>
      {!validation.isValid && (
        <p className="error">{validation.error}</p>
      )}

      <button
        onClick={handleSave}
        disabled={!validation.isValid}
      >
        Save Draft
      </button>
    </div>
  );
}

export default PostComposer;