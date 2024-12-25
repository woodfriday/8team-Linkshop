import React, { useState } from "react";
import "./PwPopup.css";

function PwPopup({ onClose, data, mode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleEditClick = () => {
    fetch(`https://linkshop-api.vercel.app/12-8/linkshops/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: password,
        shop: {
          imageUrl: data.shop.imageUrl,
          urlName: data.shop.urlName,
          shopUrl: data.shop.shopUrl,
        },
        products: data.products?.map((p) => ({
          price: p.price,
          imageUrl: p.imageUrl,
          name: p.name,
        })),
        userId: data.userId,
        name: data.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Validation Failed") {
          setErrorMessage("비밀번호가 잘못되었습니다.");
          return;
        }

        if (data.id) {
          onClose();
          window.location.href = `/linkpost/${data.id}/edit/`;
        } else {
          setErrorMessage("ID를 찾을 수 없습니다.");
        }
      })
      .catch((error) => {
        setErrorMessage("API 요청 중 오류가 발생했습니다.");
      });
  };

  const handleDeleteClick = () => {
    fetch(`https://linkshop-api.vercel.app/12-8/linkshops/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: password,
      }),
    })
      .then(async (res) => {
        console.log("응답 상태 코드:", res.status); // 상태 코드 출력

        if (res.status === 204 || res.status === 200) {
          onClose();
          window.location.href = "/"; // 삭제 완료 후 HomePage로 리디렉션
        } else {
          let data;
          try {
            data = await res.json();
            console.log("응답 데이터:", data); // 응답 데이터 출력

            if (res.status === 400 && data.message === "Validation Failed") {
              setErrorMessage("비밀번호가 잘못되었습니다.");
            } else {
              setErrorMessage(
                "삭제 실패: " + (data.message || "알 수 없는 오류")
              );
            }
          } catch (e) {
            console.error("JSON 파싱 에러", e);
            setErrorMessage("API 요청 중 오류가 발생했습니다.");
          }
        }
      })
      .catch((error) => {
        console.error("삭제 API 에러", error);
        setErrorMessage("API 요청 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="pw-popup-overlay">
      <div className="pw-popup">
        <img
          id="popup-close"
          src="/images/icons/ic_close.png"
          alt="닫기"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />
        <h2 className="password-title">
          {mode === "edit" ? "비밀번호 입력" : "삭제 확인"}
        </h2>
        <p className="password-description">
          {mode === "edit"
            ? "편집하기 위해 설정한 비밀번호를 입력하세요"
            : "삭제하기 위해 설정한 비밀번호를 입력하세요"}
        </p>
        <div className="pw-container">
          <p className="pw-input-text">비밀번호</p>
          <div className="pw-input-wrapper">
            <input
              className="pw-input"
              type={isVisible ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              className="pw-input-img"
              src={
                isVisible
                  ? "/images/icons/visibility-on.png"
                  : "/images/icons/visibility-off.png"
              }
              alt="비밀번호 보기"
              onClick={toggleVisibility}
              style={{ cursor: "pointer" }}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <button
          className="edit-btn"
          onClick={mode === "edit" ? handleEditClick : handleDeleteClick}
        >
          {mode === "edit" ? "편집 시작하기" : "삭제하기"}
        </button>
      </div>
    </div>
  );
}

export default PwPopup;
