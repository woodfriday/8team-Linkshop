export const get = async (id) => {
  const response = await fetch(
    `https://linkshop-api.vercel.app/12-8/linkshops/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch the shop details");
  }

  const data = await response.json();
  return data;
};

export const update = async (
  id,
  { password, userId, url, name, shopImageUrl, productDetails }
) => {
  const response = await fetch(
    `https://linkshop-api.vercel.app/12-8/linkshops/${id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: password,
        shop: {
          imageUrl: shopImageUrl,
          urlName: name,
          shopUrl: url,
        },
        products: productDetails.map((product) => ({
          price: product.price,
          imageUrl: product.imageUrl,
          name: product.name,
        })),
        userId,
        name,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update the shop details");
  }

  const data = await response.json();
  return data;
};
