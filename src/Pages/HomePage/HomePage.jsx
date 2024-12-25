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

const getPageSize = (mode) => {
  return mode === "mobile" || mode === "tablet" ? 3 : 6;
};

function HomePage() {
  const { mode } = useDevice();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false); // 초기에는 false로 설정
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [nextCursor, setNextCursor] = useState(undefined);
  const [noResults, setNoResults] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // 검색 상태 추가

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = () => {
    setIsSearching(true); // 검색 시작 시 검색 상태를 true로 설정
    setHasMore(false); // 초기 로딩 상태로 설정하여 검색 중에는 무한 스크롤 로딩을 방지
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
        setIsSearching(false); // 검색 완료 시 검색 상태를 false로 설정
        setHasMore(data.list.length > 0); // 검색 완료 후에만 무한 스크롤 가능하도록 설정
      })
      .catch((error) => {
        console.error(error);
        setIsSearching(false); // 검색 중 오류 발생 시 검색 상태를 false로 설정
      });
  };

  const fetchMoreData = () => {
    if (!nextCursor) {
      setHasMore(false); // nextCursor가 없으면 더 이상 데이터를 로드하지 않음
      return;
    }

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
          setHasMore(data.nextCursor !== null); // 다음 페이지가 있으면 무한 스크롤 가능하도록 설정
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
    fetchInitialData();
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
          <>
            {isSearching ? (
              <div>검색 중입니다...</div>
            ) : (
              <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 className="loading-message">Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>더 이상 상품이 없어요.</b>
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
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
