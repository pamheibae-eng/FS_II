import { useState } from "react";

import PlatformSelector from "./PlatformSelector";
import CharacterCounter from "./CharacterCounter";
import ValidationMessage from "./ValidationMessage";

import usePostValidation from "../hooks/usePostValidation";

function PostComposer() {
  const [platform, setPlatform] = useState("Twitter");
  const [content, setContent] = useState("");

  const validation = usePostValidation(
    platform,
    content
  );

  return (
    <div className="composer">

      <PlatformSelector
        platform={platform}
        onPlatformChange={setPlatform}
      />

      <div className="form-group">
        <label>Write Your Post</label>

        <textarea
          rows={8}
          placeholder="Write something..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
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

      <button
        disabled={validation.type === "error"}
      >
        Publish Post
      </button>

    </div>
  );
}

export default PostComposer;