import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./HomePage.css";
import Navigation from "../../component/Nav_bar/Navigation";
import ProductCard from "../../component/Product/ProductCard1";
import {
  getLinkShopLike,
  getLinkShopList,
  getLinkShopDetail,
} from "../../api/api";
import useDevice from "../../hooks/useDevice";
import FilterView from "../../component/popup/FilterView";
import CommonModal from "../../component/popup/CommonModal";
import CommonModalMobile from "../../component/popup/CommonModalMobile";

function HomePage() {
  const { mode } = useDevice();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [nextCursor, setNextCursor] = useState(undefined);
  const [noResults, setNoResults] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const fetchInitialData = useCallback(() => {
    setIsLoading(true);
    getLinkShopList(keyword, orderBy)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.list);
        setNextCursor(data.nextCursor);
        setNoResults(data.list.length === 0);
        setHasMore(data.list.length > 0);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [keyword, orderBy]);

  const fetchMoreData = () => {
    if (!nextCursor) {
      setHasMore(false);
      return;
    }

    setIsLoading(true);
    getLinkShopList(keyword, orderBy, nextCursor)
      .then((response) => response.json())
      .then((data) => {
        if (!data.list.length) {
          setHasMore(false);
          setNoResults(items.length === 0);
        } else {
          setItems((prevItems) => [...prevItems, ...data.list]);
          setNextCursor(data.nextCursor);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    setIsSearching(true);
    if (keyword.trim() === "") {
      fetchInitialData();
    } else {
      getLinkShopList(keyword, orderBy)
        .then((response) => response.json())
        .then((data) => {
          setItems(data.list);
          setNextCursor(data.nextCursor);
          setNoResults(data.list.length === 0);
          setHasMore(data.list.length > 0);
          setIsSearching(false);
        })
        .catch((error) => {
          console.error(error);
          setIsSearching(false);
        });
    }
  };

  const handleFilterChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
    setNextCursor(undefined);
    getLinkShopList(keyword, newOrderBy)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.list);
        setNextCursor(data.nextCursor);
        setNoResults(data.list.length === 0);
        setHasMore(data.list.length > 0);
      })
      .catch(console.error);
  };

  const handleLikeClick = (index) => {
    const newItems = [...items];
    const item = newItems[index];
    const newIsLiked = !item.isLiked;
    const originalIsLiked = item.isLiked;
    const originalLikes = item.likes;

    item.isLiked = newIsLiked;
    item.likes += newIsLiked ? 1 : -1;
    localStorage.setItem(`shop.like.${item.id}`, newIsLiked);
    localStorage.setItem(`shop.likeCount.${item.id}`, item.likes.toString());
    setItems([...newItems]);

    getLinkShopLike(item.id, newIsLiked)
      .then(() => {
        return getLinkShopDetail(item.id);
      })
      .then((response) => response.json())
      .then((data) => {
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === item.id
              ? { ...i, isLiked: data.isLiked, likes: data.likes }
              : i
          )
        );
        localStorage.setItem(`shop.like.${item.id}`, data.isLiked);
        localStorage.setItem(
          `shop.likeCount.${item.id}`,
          data.likes.toString()
        );
      })
      .catch((error) => {
        console.error("좋아요 상태 동기화 실패:", error);
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === item.id
              ? { ...i, isLiked: originalIsLiked, likes: originalLikes }
              : i
          )
        );
        localStorage.setItem(`shop.like.${item.id}`, originalIsLiked);
      });
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  useEffect(() => {
    if (!isSearching) {
      fetchInitialData();
    }
  }, [keyword, isSearching, fetchInitialData]);

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
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
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
            loader={
              isLoading && !isSearching ? (
                <h4 className="loading-message">Loading...</h4>
              ) : null
            }
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
      </div>
    </div>
  );
}

export default HomePage;
