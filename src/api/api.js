export const getLinkShopList = async () => {
  return fetch(`https://linkshop-api.vercel.app/12-8/linkshops`);
};

export const getLinkshopDetail = async (linkShopId) => {
  return fetch(`https://linkshop-api.vercel.app/12-8/linkshops/${linkShopId}`);
};
