export const create = async (
  password,
  userId,
  url,
  name,
  shopImageUrl,
  productDetails
) => {
  const response = await fetch(
    "https://linkshop-api.vercel.app/12-8/linkshops",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shop: {
          imageUrl: shopImageUrl,
          urlName: name,
          shopUrl: url,
        },
        products: productDetails,
        password,
        userId,
        name,
      }),
    }
  );

  const data = await response.json();
  return data;
};
