const API_KEY = "24229447-882d2f373c0694f721fc94563";
const BASE_URL = "https://pixabay.com/api/";

const apiGetImages = async (searchQuery, page) => {
  const response = await fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.ok
    ? response.json()
    : Promise.reject(new Error("Невідома помилка"));
};

export default apiGetImages;
