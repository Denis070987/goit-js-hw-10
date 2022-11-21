function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error('');
      }
      return resp.json();
    })
    .catch(err =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

export { fetchCountries };