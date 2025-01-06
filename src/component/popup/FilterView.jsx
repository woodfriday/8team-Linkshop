import useDevice from "../../hooks/useDevice";
import "./FilterView.css";

const FilterView = ({ onClose, onFilterChange, selectedFilter }) => {
  const { mode } = useDevice();

  const handleFilterClick = (orderBy) => {
    onFilterChange(orderBy);
    onClose();
  };

  return (
    <div className="filter-view">
      <h3>정렬</h3>
      <img
        id="filter-close"
        src="/images/icons/ic_close.png"
        alt="닫기"
        onClick={onClose}
        style={{ cursor: "pointer" }}
      />
      <p
        className={`filter-option ${
          selectedFilter === "recent" ? "selected" : ""
        }`}
        onClick={() => handleFilterClick("recent")}
      >
        최신순
        {selectedFilter === "recent" && (
          <img src="/images/icons/ic_check.png" alt="체크" />
        )}
      </p>
      <hr />
      <p
        className={`filter-option ${
          selectedFilter === "likes" ? "selected" : ""
        }`}
        onClick={() => handleFilterClick("likes")}
      >
        좋아요순
        {selectedFilter === "likes" && (
          <img src="/images/icons/ic_check.png" alt="체크" />
        )}
      </p>
      <hr />
      <p
        className={`filter-option ${
          selectedFilter === "productsCount" ? "selected" : ""
        }`}
        onClick={() => handleFilterClick("productsCount")}
      >
        등록된 상품순
        {selectedFilter === "productsCount" && (
          <img src="/images/icons/ic_check.png" alt="체크" />
        )}
      </p>
      <hr />
    </div>
  );
};

export default FilterView;
