import { useState } from "react";
import "./FileInput.css";

function FileInput({ onUpload }) {
  const [preview, setPreview] = useState(undefined);

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
      {preview && <img className="preview-img" src={preview} alt="미리보기" />}
      <label className="input-file-btn" for="input-file">
        파일 첨부
      </label>
    </div>
  );
}

export default FileInput;
