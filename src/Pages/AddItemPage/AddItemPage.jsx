import Signature from "./SignatureItem";
import "./AddItemPage.css";
import "../../component/global.css";
import { useState } from "react";

function AddItemPage() {
  const [additem, setAdditem] = useState(1);

  const addButton = () => {
    if (additem < 3) {
      setAdditem(additem + 1);
    }
  };

  return (
    <div className="additem-container">
      <div className="signature-item-container">
        <h2 className="signature-item-text">대표 상품</h2>
        <button className="signature-btn" onClick={addButton}>
          추가
        </button>
      </div>
      <Signature />
      <Signature />

      <div>
        <h2 className="signature-item-text">내 쇼핑몰</h2>
      </div>
      <div className="myshop-container">
        <div className="myshop-img">
          <div>
            <p className="myshop-text">상품 대표 이미지</p>
            <input
              type="text"
              className="signature-img-input"
              placeholder="상품 이미지를 첨부해주세요."
            />
          </div>
          <button className="file-btn">파일첨부</button>
        </div>
        <p className="myshop-text">이름</p>
        <input
          className="myshop-input"
          type="text"
          placeholder="표시하고 싶은 이름을 적어 주세요."
        />
        <p className="myshop-text">Url</p>
        <input
          className="myshop-input"
          type="url"
          placeholder="Url을 입력해주세요."
        />
        <p className="myshop-text">유저 ID</p>
        <input
          className="myshop-input"
          type="text"
          placeholder="유저 ID를 입력해주세요."
        />
        <p className="myshop-text">비밀번호</p>
        <div className="myshop-password-box">
          <input
            className="myshop-input"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          {/* <img
            id="visibility-img"
            src="../../../images/icon/visibility-off.png"
            alt="visibility-icon"
          /> */}
        </div>
      </div>
      <button className="add-btn">생성하기</button>
    </div>
  );
}

export default AddItemPage;
