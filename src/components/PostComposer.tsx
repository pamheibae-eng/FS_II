import { useState } from "react";

import PlatformSelector from "./PlatformSelector";
import CharacterCounter from "./CharacterCounter";
import ValidationMessage from "./ValidationMessage";

import usePostValidation from "../hooks/usePostValidation";

type Draft = {
  id: number;
  platform: string;
  content: string;
};

function PostComposer() {
  const [platform, setPlatform] = useState("Twitter");
  const [content, setContent] = useState("");
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const validation = usePostValidation(platform, content);

  function saveDraft() {
  if (validation.type === "error") return;

  const newDraft = {
    id: Date.now(),
    platform,
    content,
  };

  setDrafts([...drafts, newDraft]);

  setContent("");
}

  function deleteDraft(id: number) {
    setDrafts(drafts.filter((draft) => draft.id !== id));
  }

  return (
    <div>
      <h2>Create Post</h2>

      <PlatformSelector
        platform={platform}
        setPlatform={setPlatform}
      />

      <textarea
        rows={8}
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <CharacterCounter
        content={content}
        platform={platform}
      />

      <ValidationMessage validation={validation} />

      

      <button
  disabled={validation.type === "error"}
  onClick={saveDraft}
>
  Save Draft
</button>


      <h3>Saved Drafts</h3>

      {drafts.map((draft) => (
        <div key={draft.id}>
          <p>
            <b>{draft.platform}</b>: {draft.content}
          </p>

          <button onClick={() => deleteDraft(draft.id)}>
            Delete Draft
          </button>
        </div>
      ))}
    </div>
  );
}

export default PostComposer;