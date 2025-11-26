import { useState } from "react";
import "./AddItemPage.css";
import "../../component/global.css";
import { create } from "../../api/createLinkshop";
import Signature from "./SignatureItem";
import FileInput from "../../component/create/FileInput";
import Navigation from "../../component/Nav_bar/Navigation";
import ToastPopup from "../../component/popup/ToastPopup";

function AddItemPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [shopImageUrl, setShopImageUrl] = useState("");
  const [signature, setSignature] = useState([
    { name: "", price: 0, imageUrl: "" },
  ]);

  const [toastMessage, setToastMessage] = useState("");
  const [onToastConfirm, setOnToastConfirm] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  // 토스트 메시지 표시 함수
  const showToast = (message) => {
    setToastMessage(message);
  };

  // 상품 추가 버튼 클릭 시 호출되는 함수
  const addButton = () => {
    if (signature.length < 3) {
      setSignature([...signature, {}]);
    }
  };

  // 상품 정보 변경 시 호출되는 함수
  const handleProductChange = (index, updatedProduct) => {
    setSignature((prevDetails) =>
      prevDetails.map((product, i) => (i === index ? updatedProduct : product))
    );
  };

  // 제출 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    // 폼 유효성 재검증
    if (!isFormValid()) {
      showToast("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    if (passwordError || urlError || userIdError) {
      showToast("입력 정보를 확인해주세요.");
      return;
    }

    try {
      const response = await create(
        password,
        userId,
        url,
        name,
        shopImageUrl,
        signature
      );

      console.log("Response:", response);

      if (!response || !response.id) {
        throw new Error("Response 또는 ID가 유효하지 않습니다.");
      }

      showToast("등록이 완료되었습니다.");

      setOnToastConfirm(() => () => {
        window.location.href = `/link/${response.id}`;
      });
    } catch (error) {
      console.error("에러 발생:", error);
      const errorMessage =
        error.message || "등록 중 오류가 발생했습니다. 다시 시도해주세요.";
      showToast(errorMessage);
      setOnToastConfirm(null);
    }
  };

  // 비밀번호 변경 시 호출되는 함수
  const handlePasswordChange = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);

    if (!inputPassword) {
      setPasswordError(false);
    } else {
      const passwordCheck = /^[A-Za-z0-9]{6,}$/;
      setPasswordError(!passwordCheck.test(inputPassword));
    }
  };

  // URL 변경 시 호출되는 함수
  const handleUrlChange = (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);

    if (!inputUrl) {
      setUrlError(false);
    } else {
      const urlPattern = /^(https:\/\/)[\w-]+(\.[\w-]+)+([/?#].*)?$/;
      setUrlError(!urlPattern.test(inputUrl));
    }
  };

  // 유저 ID 변경 시 호출되는 함수
  const handleUserIdChange = (e) => {
    const inputUserId = e.target.value;
    setUserId(inputUserId);

    if (!inputUserId) {
      setUserIdError(false);
    } else {
      const userIdPattern = /^[A-Za-z0-9]+$/;
      setUserIdError(!userIdPattern.test(inputUserId));
    }
  };

  // 비밀번호 가리기/보이기 함수
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // '생성하기' 버튼 활성화 여부 확인 함수
  const isFormValid = () => {
    const isSignatureValid = signature.every(
      (product) => product.name && product.price && product.imageUrl
    );
    return (
      name &&
      url &&
      userId &&
      password &&
      !passwordError &&
      !urlError &&
      !userIdError &&
      isSignatureValid &&
      shopImageUrl
    );
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
            <div className="test">
              <p className="myshop-text">상품 대표 이미지</p>
              <p className="myshop-img-text">쇼핑몰 이미지를 첨부해주세요.</p>
              {shopImageUrl && (
                <div className="shopIMG-preview-container">
                  <img
                    src={shopImageUrl}
                    alt="Shop preview"
                    className="shop-image-preview"
                  />
                  <button
                    className="remove-shopIMG-btn"
                    onClick={() => setShopImageUrl("")} // 이미지 URL 초기화
                  >
                    <img src="/images/icons/ic_delete.png" alt="삭제" />
                  </button>
                </div>
              )}
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
            onChange={handleUrlChange}
          />
          {urlError && (
            <p className="error-message">
              https://example.com/...와 같은 형식으로 적어주세요.
            </p>
          )}
          <p className="myshop-text">유저 ID</p>
          <input
            className="myshop-input"
            type="text"
            placeholder="유저 ID는 중복, 띄어쓰기, 특수기호 사용 불가입니다."
            value={userId}
            onChange={handleUserIdChange}
          />
          {userIdError && (
            <p className="error-message">
              유저 ID는 중복, 띄어쓰기, 특수기호 사용 불가입니다.
            </p>
          )}
          <p className="myshop-text">비밀번호</p>
          <div className="pwd-container">
            <input
              className="myshop-input"
              type={passwordVisible ? "text" : "password"}
              placeholder="영문+숫자 6자 이상을 입력해주세요."
              value={password}
              onChange={handlePasswordChange}
            />
            <img
              src={
                passwordVisible
                  ? "/images/icons/visibility-on.png"
                  : "/images/icons/visibility-off.png"
              }
              alt="eye"
              onClick={togglePasswordVisibility}
            />
          </div>
          {passwordError && (
            <p className="error-message">
              비밀번호는 영문+숫자 6자 이상이어야 합니다.
            </p>
          )}
        </div>
        <button
          className={`add-btn ${isFormValid() ? "active" : ""}`}
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          생성하기
        </button>
      </div>
      {toastMessage && (
        <ToastPopup message={toastMessage} onConfirm={onToastConfirm} />
      )}
    </div>
  );
}

export default AddItemPage;
