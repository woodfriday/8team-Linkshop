import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./HomePage.css";
import Navigation from "../../component/Nav_bar/Navigation";
import ProductCard from "../../component/Product/ProductCard1";
import { getLinkShopLike, getLinkShopList } from "../../api/api";
import useDevice from "../../hooks/useDevice";
import FilterView from "../../component/popup/FilterView";
import CommonModal from "../../component/popup/CommonModal";
import CommonModalMobile from "../../component/popup/CommonModalMobile";

// 무한스크롤
const getPageSize = (mode) => {
  return mode === "mobile" || mode === "tablet" ? 3 : 6;
};

function HomePage() {
  const { mode } = useDevice();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [nextCursor, setNextCursor] = useState(undefined);
  const [noResults, setNoResults] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = () => {
    getLinkShopList(keyword, orderBy)
      .then((response) => response.json())
      .then((data) => {
        const updatedItems = data.list.map((item) => ({
          ...item,
          isLiked: localStorage.getItem(`shop.like.${item.id}`) === "true",
        }));
        setItems(updatedItems);
        setNextCursor(data.nextCursor);
        setNoResults(updatedItems.length === 0);
      })
      .catch(console.error);
  };

  const fetchMoreData = () => {
    getLinkShopList(keyword, orderBy, nextCursor)
      .then((response) => response.json())
      .then((data) => {
        if (!data.list.length) {
          setHasMore(false);
          setNoResults(items.length === 0);
        } else {
          const updatedItems = data.list.map((item) => ({
            ...item,
            isLiked: localStorage.getItem(`shop.like.${item.id}`) === "true",
          }));
          setItems((prevItems) => [...prevItems, ...updatedItems]);
          setNextCursor(data.nextCursor);
        }
      })
      .catch(console.error);
  };

  const handleSearch = () => {
    setNextCursor(undefined);
    fetchInitialData();
  };

  const handleFilterChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
    setNextCursor(undefined);
    getLinkShopList(keyword, newOrderBy) // 필터 기준에 따라 데이터를 즉시 다시 로드
      .then((response) => response.json())
      .then((data) => {
        const updatedItems = data.list.map((item) => ({
          ...item,
          isLiked: localStorage.getItem(`shop.like.${item.id}`) === "true",
        }));
        setItems(updatedItems);
        setNextCursor(data.nextCursor);
        setNoResults(updatedItems.length === 0);
      })
      .catch(console.error);
  };

  const handleLikeClick = (index) => {
    const newItems = [...items];
    const item = newItems[index];
    getLinkShopLike(item.id, !item.isLiked)
      .then(() => {
        item.isLiked = !item.isLiked;
        item.likes += item.isLiked ? 1 : -1;
        localStorage.setItem(`shop.like.${item.id}`, item.isLiked);
        setItems(newItems);
      })
      .catch(console.error);
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  return (
    <div>
      <Navigation
        buttonName="생성하기"
        onClick={() => (window.location.href = "/linkpost")}
      />
      <div className="home-container">
        <div className="input-box">
          <img
            id="input-img"
            src="/images/icons/ic_search.png"
            alt="검색"
            onClick={handleSearch}
          />
          <input
            id="search"
            type="text"
            placeholder="샵 이름으로 검색해 보세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
            onClick={toggleFilter}
          />
        </div>
        {isFilterOpen &&
          (mode === "mobile" ? (
            <CommonModalMobile>
              <FilterView
                onClose={toggleFilter}
                onFilterChange={handleFilterChange}
                selectedFilter={orderBy}
              />
            </CommonModalMobile>
          ) : (
            <CommonModal>
              <FilterView
                onClose={toggleFilter}
                onFilterChange={handleFilterChange}
                selectedFilter={orderBy}
              />
            </CommonModal>
          ))}
        {noResults ? (
          <div className="no-results">
            <img src="/images/search_null.png" alt="검색 결과 없음" />
            <p>검색 결과가 없어요</p>
            <p>지금 프로필을 만들고 내 상품을 소개해보세요.</p>
          </div>
        ) : (
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
            <div className={`product-item-container ${mode}`}>
              {items.map((item, index) => (
                <div key={index} className="product-item">
                  <ProductCard
                    item={item}
                    likeCount={item.likes}
                    isLiked={item.isLiked}
                    onLikeClick={() => handleLikeClick(index)}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default HomePage;
