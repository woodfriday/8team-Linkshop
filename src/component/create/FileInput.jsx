import { useState, useEffect } from "react";
import "./FileInput.css";

function FileInput({ value, onUpload }) {
  const [preview, setPreview] = useState(value || undefined);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      "https://linkshop-api.vercel.app/images/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const imageUrl = data.url;

    if (onUpload) {
      onUpload(imageUrl);
    }
  };

  return (
    <div>
      <input
        id="input-file"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label className="input-file-btn" htmlFor="input-file">
        파일 첨부
      </label>
    </div>
  );
}

export default FileInput;
