type PlatformSelectorProps = {
  platform: string;
  setPlatform: (value: string) => void;
};

function PlatformSelector({
  platform,
  setPlatform,
}: PlatformSelectorProps) {
  return (
    <select
      value={platform}
      onChange={(e) => setPlatform(e.target.value)}
    >
      <option value="Twitter">Twitter</option>
      <option value="Instagram">Instagram</option>
      <option value="Facebook">Facebook</option>
    </select>
  );
}

export default PlatformSelector;