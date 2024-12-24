export const getProducts = async (id) => {
  try {
    const response = await fetch(
      `https://linkshop-api.vercel.app/12-8/linkshops/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch the shop details");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
