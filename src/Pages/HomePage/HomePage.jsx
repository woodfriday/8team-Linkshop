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
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [isSearching, setIsSearching] = useState(false); // 검색 중 상태
  const [isSearching, setIsSearching] = useState(false); // 검색 상태 추가

  // 데이터 로드
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
        setHasMore(data.list.length > 0); //더 이상 로드할 데이터가 없을 때 hasMore를 false로 설정
      })
      .catch((error) => {
        (error) => {
        console.error(error);
        setIsLoading(false); // 에러 발생 시 로딩 종료
      }(error);
        setIsSearching(false); // 검색 중 오류 발생 시 검색 상태를 false로 설정
      });
  };

  const fetchMoreData = () => {
    if (!nextCursor) {
      setHasMore(false); // nextCursor가 없으면 더 이상 데이터를 로드하지 않음
      return;
    }

    setIsLoading(true); // 로딩 시작
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
        setIsLoading(false); // 로딩 종료
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // 에러 발생 시 로딩 종료
      });
  };

  const handleSearch = () => {
    setIsSearching(true); // 검색 중 상태로 설정
    if (keyword.trim() === "") {
      fetchInitialData(); // 검색어가 비었을 때 원래 데이터 로드
    } else {
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
          setHasMore(data.list.length > 0);
          setIsSearching(false); // 검색 완료 후 상태 변경
        })
        .catch((error) => {
          console.error(error);
          setIsSearching(false); // 에러 발생 시 검색 상태 변경
        });
    }
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
        setHasMore(data.list.length > 0); // 더이상 로드할 데이터가 없을 때 hasMore를 false로 설정
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

  // 검색어가 변경될 때마다 데이터 로드
  useEffect(() => {
    if (!isSearching) {
      fetchInitialData(); // 검색이 아닌 경우 데이터 로드
    }
  }, [keyword]);

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
              setKeyword(e.target.value); // 타이핑할 때마다 검색어 업데이트
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // 엔터로도 검색 실행
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
