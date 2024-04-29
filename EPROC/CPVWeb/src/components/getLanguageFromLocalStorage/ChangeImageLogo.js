const getLanguageFromLocalStorage = () => {
    return localStorage.getItem('language') || 'en';
};

export default getLanguageFromLocalStorage;
