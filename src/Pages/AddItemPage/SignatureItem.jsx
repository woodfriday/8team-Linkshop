import "./SignatureItem.css";

function Signature() {
  return (
    <div className="signature-container">
      <div className="signauture-img">
        <div>
          <p className="signature-text">상품 대표 이미지</p>
          <input
            type="text"
            className="signature-input"
            placeholder="상품 이미지를 첨부해주세요."
          />
        </div>
        <button className="file-btn">파일 첨부</button>
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
