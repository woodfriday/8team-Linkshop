import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./HomePage.css";
import Navigation from "../../component/Nav_bar/Navigation";
import ProductCard from "../../component/Product/ProductCard1";
import { getLinkShopLike, getLinkShopList } from "../../api/api";
import useDevice from "../../hooks/useDevice";

// 무한스크롤
const getPageSize = (mode) => {
  if (mode === "mobile") {
    // Mobile viewport
    return 3;
  } else if (mode === "tablet") {
    // Tablet viewport
    return 3;
  } else {
    // Desktop viewport
    return 6;
  }
};

function HomePage() {
  const { mode } = useDevice();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageSize, setPageSize] = useState(getPageSize(mode));
  const [page, setPage] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrdreBy] = useState("");

  const [nextCursor, setNextCursor] = useState(undefined);
  const [NoResults, setNoResults] = useState(false); //검색결과 유무 상태

  const fetchMoreData = () => {
    if (items.length >= 30) {
      // 최대 30개의 데이터
      setHasMore(false);
      return;
    }

    //TODO: 새로운 데이터를 받아와야함
    getLinkShopList(keyword, orderBy, nextCursor)
      .then((response) => response.json())
      .then((data) => {
        setNextCursor(data.nextCursor);
        setItems(items.concat(data.list));
        setNoResults(data.list.length === 0); //검색결과 유무 설정
      });

    // setTimeout(() => {
    //   setItems(items.concat(Array.from({ length: pageSize })));
    // }, 1500);
  };

  useEffect(() => {
    setPageSize(getPageSize(mode));
  }, [mode]);

  const handleSearsh = () => {
    setNextCursor(undefined); //reset cursor
    getLinkShopList(keyword, orderBy, undefined)
      .then((response) => response.json())
      .then((data) => {
        setNextCursor(data.nextCursor);
        setItems(data.list);
        setHasMore(true);
        setNoResults(data.list.length === 0); //검색결과 유무 설정
      });
  };

  //검색기능 enter시 기능 구현
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearsh();
    }
  };

  useEffect(() => {
    getLinkShopList(undefined)
      .then((response) => response.json())
      .then((data) => {
        setNextCursor(data.nextCursor);
        setItems(data.list);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(mode));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mode]);

  // 좋아요 버튼 이벤트 핸들러 (좋아요 추가/삭제)
  const handleLikeClick = (index) => {
    const newItems = [...items];
    const item = newItems[index];

    getLinkShopLike(item.id, !item.isLiked)
      .then((response) => response.json())
      .then((data) => {
        if (item.isLiked) {
          item.likes -= 1;
        } else {
          item.likes += 1;
        }
        item.isLiked = !item.isLiked;
        setItems(newItems);
      });
  };

  return (
    <div>
      <Navigation
        buttonName="생성하기"
        onClick={() => {
          window.location.href = "/linkpost";
        }}
      />
      <div className="home-container">
        {/* 검색기능 */}
        <div className="input-box">
          <img
            id="input-img"
            src="/images/icons/ic_search.png"
            alt="검색"
            onClick={handleSearsh}
          />
          <input
            id="search"
            type="text"
            placeholder="샵 이름으로 검색해 보세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="filter">
          <p>상세필터</p>
          <img
            id="arrow-img"
            src="/images/icons/ic_arrow.png"
            alt="화살표"
            width={12}
            height={12}
          />
        </div>

        {/* 상품리스트 */}
        {NoResults && (
          <div className="no-results">
            <img src="/images/search_null.png" alt="검색 결과 없음" />
            <p>검색 결과가 없어요</p>
            <br />
            <p>지금 프로필을 만들고 내 상품을 소개해보세요</p>
          </div>
        )}

        {!NoResults && (
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>모든 상품을 다 보셨습니다!</b>
              </p>
            }
          >
            {items.map((item, index) => (
              <div className="product-list" key={index}>
                <ProductCard
                  item={item}
                  likeCount={item.likes}
                  isLiked={item.isLiked}
                  onLikeClick={() =>
                    // TODO: 좋아요 API 호출
                    handleLikeClick(index)
                  }
                />
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default HomePage;
