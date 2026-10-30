import type { ImageInfo } from "./Header";
import "../Dialog.css";

type PropertiesDialogProps = {
  info: ImageInfo | null;
  onClose: () => void;
};

function PropertiesDialog({ info, onClose }: PropertiesDialogProps) {
  return (
    <div className="backdrop">
      <section className="dialog">
        {info ? (
          <>
            <h2>Properties</h2>
            <p>
              <span>Name</span>
              <span>{info.name}</span>
            </p>
            <p>
              <span>Width</span>
              <span>{info.width} px</span>
            </p>
            <p>
              <span>Height</span>
              <span>{info.height} px</span>
            </p>
            <p>
              <span>Size</span>
              <span>{(info.size / 1024).toFixed(1)} KB</span>
            </p>
            <p>
              <span>Type</span>
              <span>{info.type} px</span>
            </p>
          </>
        ) : (
          <p>No image opened</p>
        )}
        <button onClick={onClose}>Close</button>
      </section>
    </div>
  );
}

export default PropertiesDialog;
