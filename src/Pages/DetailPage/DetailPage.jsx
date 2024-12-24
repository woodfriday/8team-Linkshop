import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailPage.css";
import Banner from "../../component/Detail/Banner";
import LikeButton from "../../component/LikeButton";
import DetailProductCard from "../../component/Product/DetailProductCard";
import { getProducts } from "../../api/getProducts";

function DetailPage() {
  const { linkid } = useParams(); // URL에서 linkid 가져오기
  const [shopDetails, setShopDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts(linkid);
        setShopDetails(data);
      } catch (error) {
        console.error("Failed to load shop details:", error);
      }
    };

    fetchData();
  }, [linkid]);

  if (!shopDetails) return null;

  return (
    <div>
      <Banner />
      <div className="detail-container">
        <div>
          <Link className="back-btn" to="/list">
            {"<"} 돌아가기
          </Link>
        </div>
        <div className="shop-info">
          <div className="detail-btn">
            <div className="detail-btn-left">
              <LikeButton />
            </div>
            <div className="detail-btn-right">
              <img src="/images/icons/ic_share.png" alt="공유" />
              <img src="/images/icons/ic_meatball.png" alt="더보기" />
            </div>
          </div>
        </div>
        <div className="shop-products">
          <p className="shop-products-text">대표 상품</p>
          <div className="shop-products-list">
            {shopDetails.products.map((product) => (
              <DetailProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
