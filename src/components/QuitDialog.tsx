import "../Dialog.css";

type QuitDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

function QuitDialog({ onConfirm, onCancel }: QuitDialogProps) {
  return (
    <div className="backdrop">
      <section className="dialog">
        <h2>Close image?</h2>
        <p>Unsaved changes will be lost.</p>
        <button onClick={onConfirm}>Close image</button>
        <button onClick={onCancel}>Cancel</button>
      </section>
    </div>
  );
}

export default QuitDialog;