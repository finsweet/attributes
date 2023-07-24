/**
 * Function to save the href value to local storage
 * @param link
 */
export const saveToLocalStorage = (link) => {
  const favorites = JSON.parse(String(localStorage.getItem('favorites'))) || [];
  if (!favorites.includes(link)) {
    favorites.push(link);
    //localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log(link)
  }
};
