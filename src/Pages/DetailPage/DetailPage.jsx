import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./DetailPage.css";
import Banner from "../../component/Detail/Banner";
import DetailProductCard from "../../component/Product/DetailProductCard";
import DetailProfileCard from "../../component/Product/DetailProfileCard";
import { getProducts } from "../../api/getProducts";
import { getLinkShopDetail } from "../../api/api";

function DetailPage() {
  const { linkid } = useParams();
  const [shopDetails, setShopDetails] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts(linkid); // 기존 명칭 유지
        console.log("Products data:", data);
        setShopDetails(data);

        const detailResponse = await getLinkShopDetail(linkid); // 새로운 API 호출
        const jsonDetail = await detailResponse.json();

        setAdditionalDetails(jsonDetail);
      } catch (error) {
        console.error("Failed to load shop details:", error);
      }
    };

    if (linkid) {
      fetchData();
    }
  }, [linkid]);

  if (!shopDetails || !additionalDetails)
    return <div className="loading-text">Loading...</div>;

  return (
    <div>
      <Banner />
      <div className="detail-container">
        <div>
          <Link className="back-btn" to="/list">
            {"<"} 돌아가기
          </Link>
        </div>
        <div className="detail-page">
          <DetailProfileCard item={additionalDetails} />
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
