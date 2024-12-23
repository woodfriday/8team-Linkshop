import "./DetailPage.css";
import Banner from "../../component/Detail/Banner";
import { Link } from "react-router-dom";
import LikeButton from "../../component/LikeButton";

function DetailPage() {
  return (
    <div>
      <Banner />
      <div className="detail-container">
        <div>
          <Link className="back-btn" to="/list">
            {" "}
            {"<"} 돌아가기
          </Link>
        </div>
        <div className="shop-info">
          <div className="detail-btn">
            <div className="detail-btn-left">
              {/* 좋아요 버튼 (카운터 추가 해야함 css는 만들어놓음)*/}
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
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
