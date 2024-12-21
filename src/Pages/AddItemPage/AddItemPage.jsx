import { useState } from "react";
import "./AddItemPage.css";
import "../../component/global.css";
import { create } from "../../api/createLinkshop";
import Signature from "./SignatureItem";
import FileInput from "../../component/create/FileInput";
import Navigation from "../../component/Nav_bar/Navigation";

function AddItemPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [shopImageUrl, setShopImageUrl] = useState("");
  const [signature, setSignature] = useState([
    { name: "", price: 0, imageUrl: "" },
  ]);

  const addButton = () => {
    if (signature.length < 3) {
      setSignature([...signature, {}]);
    }
  };

  const handleProductChange = (index, updatedProduct) => {
    setSignature((prevDetails) =>
      prevDetails.map((product, i) => (i === index ? updatedProduct : product))
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await create(
        password,
        userId,
        url,
        name,
        shopImageUrl,
        signature
      );

      // window.location.href = `/link/${response.linkId}`;
    } catch (error) {
      console.error("에러 발생:", error);
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
        {signature.map((product, index) => (
          <Signature
            key={index}
            index={index}
            product={product}
            onProductChange={handleProductChange}
          />
        ))}

        <div>
          <h2 className="signature-item-text">내 쇼핑몰</h2>
        </div>
        <div className="myshop-container">
          <div className="myshop-img">
            <div>
              <p className="myshop-text">상품 대표 이미지</p>
              <p className="myshop-img-text">쇼핑몰 이미지를 첨부해주세요.</p>
            </div>
            <FileInput onUpload={(url) => setShopImageUrl(url)} />
          </div>
          <p className="myshop-text">이름</p>
          <input
            className="myshop-input"
            type="text"
            placeholder="쇼핑몰 이름을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="myshop-text">Url</p>
          <input
            className="myshop-input"
            type="url"
            placeholder="쇼핑몰 URL을 입력해주세요."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <p className="myshop-text">유저 ID</p>
          <input
            className="myshop-input"
            type="text"
            placeholder="유저 ID를 입력해주세요."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <p className="myshop-text">비밀번호</p>
          <input
            className="myshop-input"
            type="password"
            placeholder="영문+숫자 6자 이상을 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={handleSubmit}>
          생성하기
        </button>
      </div>
    </div>
  );
}

export default AddItemPage;
