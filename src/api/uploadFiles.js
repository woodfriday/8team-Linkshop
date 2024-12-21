export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      "https://linkshop-api.vercel.app/images/upload",
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
