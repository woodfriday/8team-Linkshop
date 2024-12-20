import Signature from "./SignatureItem";
import "./AddItemPage.css";
import "../../component/global.css";
import Navigation from "../../component/Nav_bar/Navigation";
import { useState } from "react";
import FileInput from "../../component/create/FileInput";

function AddItemPage() {
  const [signature, setSignature] = useState([{}]);

  const addButton = () => {
    if (signature.length < 3) {
      setSignature([...signature, {}]);
    }
  };

  return (
    <div>
      <Navigation
        buttonName="돌아가기"
        onClick={() => {
          window.location.href = "/list";
        }}
      />
      <div className="additem-container">
        <div className="signature-item-container">
          <h2 className="signature-item-text">대표 상품</h2>
          <button className="signature-btn" onClick={addButton}>
            추가
          </button>
        </div>
        {signature.map((item, index) => {
          return (
            <Signature
              key={index}
              productImageUrl={item.shopImageUrl}
              onImageChange={(url) => {
                setSignature((prev) => {
                  return prev.map((item, i) => {
                    if (i === index) {
                      return {
                        ...item,
                        shopImageUrl: url,
                      };
                    }
                    return item;
                  });
                });
              }}
            />
          );
        })}

        <div>
          <h2 className="signature-item-text">내 쇼핑몰</h2>
        </div>
        <div className="myshop-container">
          <div className="myshop-img">
            <div>
              <p className="myshop-text">상품 대표 이미지</p>
              <p className="myshop-img-text">상품 이미지를 첨부해주세요.</p>
            </div>
            <FileInput />
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
              placeholder="영문+숫자 6자 이상을 입력해주세요."
            />
          </div>
        </div>
        <button className="add-btn">생성하기</button>
      </div>
    </div>
  );
}

export default AddItemPage;
