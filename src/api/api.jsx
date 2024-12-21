// apis/api.js
export const getLinkShopList = (keyword, orderby, cursor) => {
  const url = new URL("https://linkshop-api.vercel.app/12-8/linkshops");

  if (keyword) {
    url.searchParams.append("keyword", keyword);
  }
  if (orderby) {
    url.searchParams.append("orderBy", orderby);
  }
  if (cursor) {
    url.searchParams.append("cursor", cursor);
  }

  return fetch(url.href);
};

export const getLinkShopLike = (linkShopId, isLiked) => {
  const method = isLiked ? "POST" : "DELETE";

  return fetch(
    `https://linkshop-api.vercel.app/12-8/linkshops/${linkShopId}/like`,
    {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLiked: isLiked }),
    }
  );
};
