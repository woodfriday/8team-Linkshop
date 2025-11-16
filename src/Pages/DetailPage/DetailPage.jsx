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

        // localStorage에서 좋아요 상태 확인
        const savedIsLiked =
          localStorage.getItem(`shop.like.${linkid}`) === "true";
        const savedLikeCount = localStorage.getItem(`shop.likeCount.${linkid}`);

        const updatedDetail = {
          ...jsonDetail,
          // localStorage에 저장된 상태가 있으면 그것을 사용, 없으면 서버 데이터 사용
          isLiked:
            localStorage.getItem(`shop.like.${linkid}`) !== null
              ? savedIsLiked
              : jsonDetail.isLiked,
          // localStorage에 저장된 개수가 있으면 사용, 없으면 서버 값 사용
          likes:
            savedLikeCount !== null
              ? parseInt(savedLikeCount, 10)
              : jsonDetail.likes,
        };

        setAdditionalDetails(updatedDetail);
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
