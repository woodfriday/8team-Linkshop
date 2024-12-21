import { useState } from "react";
import { uploadImage } from "../../api/uploadFiles";
import "./SignatureItem.css";

function Signature({ index, product, onProductChange }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleNameChange = (event) => {
    const updatedProduct = { ...product, name: event.target.value };
    onProductChange(index, updatedProduct);
  };

  const handlePriceChange = (event) => {
    const updatedProduct = {
      ...product,
      price: parseInt(event.target.value) || 0,
    };
    onProductChange(index, updatedProduct);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await uploadImage(file);
      const updatedProduct = { ...product, imageUrl: response.url };
      onProductChange(index, updatedProduct);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="signature-container">
      <div className="signature-img">
        <div className="signature-text-box">
          <p className="signature-label">상품 대표 이미지</p>
          <p className="signature-placeholder">상품 이미지를 첨부해주세요.</p>
          {product.imageUrl ? (
            <img
              className="signature-preview"
              src={product.imageUrl}
              alt="미리보기"
            />
          ) : (
            <input
              id="input-file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          )}
        </div>
        <div>
          <label className="input-file-btn" for="input-file">
            파일 첨부
          </label>
        </div>
      </div>
      <div className="signature-name">
        <p className="signature-text">상품 이름</p>
        <input
          className="signature-input"
          type="text"
          placeholder="상품 이름을 입력해주세요."
          value={product.name || ""}
          onChange={handleNameChange}
        />
      </div>
      <div className="signature-price">
        <p className="signature-text">상품 가격</p>
        <input
          className="signature-input"
          type="text"
          placeholder="상품 가격을 입력해주세요."
          value={product.price || ""}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
}

export default Signature;
