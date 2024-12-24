// apis/api.js
export const getLinkShopList = (keyword, orderBy, cursor) => {
  const url = new URL("https://linkshop-api.vercel.app/12-8/linkshops");

  if (keyword) {
    url.searchParams.append("keyword", keyword);
  }
  if (orderBy) {
    url.searchParams.append("orderBy", orderBy);
  }
  if (cursor) {
    url.searchParams.append("cursor", cursor);
  }
  return fetch(url.href);
};

export const getLinkShopLike = (id, isLiked) => {
  const method = isLiked ? "POST" : "DELETE";

  return fetch(`https://linkshop-api.vercel.app/12-8/linkshops/${id}/like`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isLiked: isLiked }),
  });
};
