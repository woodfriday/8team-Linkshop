import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../component/global.css";
import "../AddItemPage/AddItemPage.css";
import { get, update } from "../../api/editLinkshop";
import Signature from "../AddItemPage/SignatureItem";
import FileInput from "../../component/Create/FileInput";
import Navigation from "../../component/Nav_bar/Navigation";
import ToastPopup from "../../component/Create/ToastPopup";

function EditItemPage() {
  const { linkid: id } = useParams();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [shopImageUrl, setShopImageUrl] = useState("");
  const [signature, setSignature] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [onToastConfirm, setOnToastConfirm] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const addButton = () => {
    if (signature.length < 3) {
      setSignature([...signature, {}]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get(id);
        setName(data.shop.urlName || "");
        setPassword(data.password || "");
        setUrl(data.shop.shopUrl || "");
        setUserId(data.userId || "");
        setShopImageUrl(data.shop.imageUrl || "");
        setSignature(data.products || []);
      } catch (error) {
        console.error("실패", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const isSignatureValid = signature.every(
      (product) => product.name && product.price && product.imageUrl
    );
    const isShopValid =
      name &&
      url &&
      userId &&
      password &&
      !passwordError &&
      !urlError &&
      !userIdError;

    setIsFormValid(isSignatureValid && isShopValid);
  }, [
    signature,
    name,
    url,
    userId,
    password,
    passwordError,
    urlError,
    userIdError,
  ]);

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

  const handleProductChange = (index, updatedProduct) => {
    setSignature((prevDetails) =>
      prevDetails.map((product, i) => (i === index ? updatedProduct : product))
    );
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async () => {
    if (passwordError || urlError || userIdError) return;

    try {
      const response = await update(id, {
        password,
        userId,
        url,
        name,
        shopImageUrl,
        productDetails: signature,
      });

      if (!response || !response.id) {
        return;
      }

      setToastMessage("수정이 완료되었습니다.");
      setOnToastConfirm(() => () => {
        window.location.href = `/link/${response.id}`;
      });
    } catch (error) {
      console.error("Failed to update the shop details:", error);
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
              {shopImageUrl && (
                <img
                  src={shopImageUrl}
                  alt="Shop preview"
                  className="shop-image-preview"
                />
              )}
            </div>
            <FileInput
              value={shopImageUrl}
              onUpload={(url) => setShopImageUrl(url)}
            />
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
          className={`add-btn ${isFormValid ? "active" : ""}`}
          onClick={handleSubmit}
        >
          수정하기
        </button>
      </div>
      {toastMessage && (
        <ToastPopup message={toastMessage} onConfirm={onToastConfirm} />
      )}
    </div>
  );
}

export default EditItemPage;
