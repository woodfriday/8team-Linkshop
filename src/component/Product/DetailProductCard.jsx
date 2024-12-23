import "./DetailProductCard.css";

const DetailProductCard = () => {
  return (
    <div className="productcard-container">
      <img className="productcard-img" src="/images/shoes.png" alt="미리보기" />
      <div className="productcard-text">
        <p className="productcard-name">상품 이름</p>
        <p className="productcard-price">￦10000</p>
      </div>
    </div>
  );
};

export default DetailProductCard;
