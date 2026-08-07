type CharacterCounterProps = {
  content: string;
  platform?: string;
};

function CharacterCounter({ content }: CharacterCounterProps) {
  return (
    <p>
      Characters: {content.length}
    </p>
  );
}

export default CharacterCounter;