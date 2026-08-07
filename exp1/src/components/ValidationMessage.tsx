interface ValidationMessageProps {
  type: "success" | "warning" | "error";
  message: string;
}

function ValidationMessage({
  type,
  message,
}: ValidationMessageProps) {
  return (
    <p className={`message ${type}`}>
      {message}
    </p>
  );
}

export default ValidationMessage;