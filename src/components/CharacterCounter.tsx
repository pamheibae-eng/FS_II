type CharacterCounterProps = {
  content: string;
  platform: string;
};

function CharacterCounter({ content, platform }: CharacterCounterProps) {
  const limits: Record<string, number> = {
    Twitter: 280,
    Instagram: 2200,
    Facebook: 63206,
  };

  return (
    <p>
      Characters: {content.length} / {limits[platform]}
    </p>
  );
}

export default CharacterCounter;