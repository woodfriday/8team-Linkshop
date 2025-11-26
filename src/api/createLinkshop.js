export const create = async (
  password,
  userId,
  url,
  name,
  shopImageUrl,
  productDetails
) => {
  const requestBody = {
    shop: {
      imageUrl: shopImageUrl,
      urlName: name,
      shopUrl: url,
    },
    products: productDetails
      .filter((product) => product.name && product.price && product.imageUrl)
      .map((product) => ({
        price: Number(product.price) || 0,
        imageUrl: product.imageUrl,
        name: product.name,
      })),
    password,
    userId,
    name,
  };

  console.log("API Request Body:", JSON.stringify(requestBody, null, 2));

  const response = await fetch(
    "https://linkshop-api.vercel.app/12-8/linkshops",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `서버 오류: ${response.status}`);
  }

  return data;
};
