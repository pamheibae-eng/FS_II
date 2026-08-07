interface CharacterCounterProps {
  used: number;
  limit: number;
}

function CharacterCounter({
  used,
  limit,
}: CharacterCounterProps) {
  return (
    <div className="counter">
      Characters: {used} / {limit}
    </div>
  );
}

export default CharacterCounter;