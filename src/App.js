import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import "./component/global.css";
import Navigation from "./component/Nav_bar/Navigation";
import HomePage from "./Pages/HomePage/HomePage";
import DetailPage from "./Pages/DetailPage/DetailPage";
import AddItemPage from "./Pages/AddItemPage/AddItemPage";
import EditItemPage from "./Pages/EditItemPage/EditItemPage";

function App() {
  return (
    // 메인 페이지
    // 상세 페이지
    // 생성 페이지
    // 수정 페이지
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<HomePage />} />
        <Route path="/link/:linkid" element={<DetailPage />} />
        <Route path="/linkpost" element={<AddItemPage />} />
        <Route path="/linkpost/:linkid/edit" element={<EditItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
