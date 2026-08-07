import { useState } from "react";

import PlatformSelector from "./PlatformSelector";
import CharacterCounter from "./CharacterCounter";
import ValidationMessage from "./ValidationMessage";

import usePostValidation from "../hooks/usePostValidation";

function PostComposer() {
  const [platform, setPlatform] = useState("Twitter");
  const [content, setContent] = useState("");
  const [draft, setDraft] = useState("");

  const validation = usePostValidation(platform, content);

  const saveDraft = () => {
    setDraft(content);
  };

  const deleteDraft = () => {
    setDraft("");
    setContent("");
  };

  return (
    <div className="composer">
      <PlatformSelector
        platform={platform}
        setPlatform={setPlatform}
      />

      <div className="form-group">
        <label>Write Your Post</label>

        <textarea
          rows={8}
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <CharacterCounter
        used={validation.charactersUsed}
        limit={validation.limit}
      />

      <ValidationMessage
        type={validation.type}
        message={validation.message}
      />

      <div>
        <button
          onClick={saveDraft}
          disabled={validation.type === "error"}
        >
          Save Draft
        </button>

        <button onClick={deleteDraft}>
          Delete Draft
        </button>
      </div>

      {draft && (
        <div className="success">
          Draft saved: {draft}
        </div>
      )}
    </div>
  );
}

export default PostComposer;