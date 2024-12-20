import "./SignatureItem.css";
import { uploadImage } from "../../api/uploadFiles";

function Signature({ productImageUrl, onImageChange }) {
  return (
    <div className="signature-container">
      <div className="signauture-img">
        <div>
          <p className="signature-text">상품 대표 이미지</p>
          <p className="signature-img-text">상품 이미지를 첨부해주세요.</p>
        </div>
        {productImageUrl ? (
          <img src={productImageUrl} alt="미리보기" />
        ) : (
          <input
            id="input-file"
            type="file"
            onChange={async (event) => {
              console.log(event);
              const file = event.target.files[0];
              if (!file) {
                return;
              }
              const response = await uploadImage(file);
              console.log("response", response);
              onImageChange(response.url);
            }}
            style={{ display: "none" }}
          />
        )}
        <label className="input-file-btn" for="input-file">
          파일 첨부
        </label>
      </div>
      <div className="signature-name">
        <p className="signature-text">상품 이름</p>
        <input
          className="signature-input"
          type="text"
          placeholder="상품 이름을 입력해 주세요."
        />
      </div>
      <div className="signature-price">
        <p className="signature-text">상품 가격</p>
        <input
          className="signature-input"
          type="text"
          placeholder="원화로 표기해 주세요."
        />
      </div>
    </div>
  );
}

export default Signature;
