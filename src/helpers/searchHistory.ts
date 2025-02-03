//-------ფუქცია რომელიც ლოკალურად ინახავს ყველა სერჩად გამოყენებულ სიტყვას------

export const saveSearchToLocalStorage = (searchTerm: string) => {
  const previousSearches = JSON.parse(
    localStorage.getItem("searchHistory") || "[]"
  );

  if (!previousSearches.includes(searchTerm)) {
    previousSearches.push(searchTerm);
  }

  localStorage.setItem("searchHistory", JSON.stringify(previousSearches));
};

//-----ფუნქცია რომელიც გამოგვიანს ყველა დასერჩილ სიტყვას----
export const getSearchHistory = (): string[] => {
  return JSON.parse(localStorage.getItem("searchHistory") || "[]");
};
