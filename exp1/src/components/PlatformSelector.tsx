interface PlatformSelectorProps {
  platform: string;
  onPlatformChange: (platform: string) => void;
}

const platforms = [
  "Twitter",
  "Facebook",
  "Instagram",
  "LinkedIn",
];

function PlatformSelector({
  platform,
  onPlatformChange,
}: PlatformSelectorProps) {
  return (
    <div className="form-group">
      <label>Select Platform</label>

      <select
        value={platform}
        onChange={(e) => onPlatformChange(e.target.value)}
      >
        {platforms.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PlatformSelector;