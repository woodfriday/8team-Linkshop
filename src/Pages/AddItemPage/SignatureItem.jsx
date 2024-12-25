import { useState, useRef } from "react";
import { uploadImage } from "../../api/uploadFiles";
import "./SignatureItem.css";

function Signature({ index, product, onProductChange }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null); // 파일 입력 요소 참조

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
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // 파일 입력 필드 초기화
      }
    }
  };

  const handleImageRemove = () => {
    const updatedProduct = { ...product, imageUrl: "" }; // 이미지 URL 초기화
    onProductChange(index, updatedProduct);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 파일 입력 필드 초기화
    }
  };

  return (
    <div className="signature-container">
      <div className="signature-img">
        <div className="signature-text-box">
          <p className="signature-label">상품 대표 이미지</p>
          <p className="signature-placeholder">상품 이미지를 첨부해주세요.</p>
          {product.imageUrl ? (
            <div className="signatureIMG-preview-container">
              <img
                className="signature-preview"
                src={product.imageUrl}
                alt="미리보기"
              />
              <button
                className="remove-signatureIMG-btn"
                onClick={handleImageRemove}
              >
                <img src="/images/icons/ic_delete.png" alt="삭제" />
              </button>
            </div>
          ) : (
            <input
              id={`input-file-${index}`}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          )}
        </div>
        <div>
          <label className="input-file-btn" htmlFor={`input-file-${index}`}>
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
