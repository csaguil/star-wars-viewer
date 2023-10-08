const BASE_URL = 'https://swapi.dev/api/';

const api = {
    planets: async (planetNumber?: number) => {
        let url = `${BASE_URL}planets/`;
        if (planetNumber) {
            url += planetNumber + '/';
        }
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }
};

export default api;
