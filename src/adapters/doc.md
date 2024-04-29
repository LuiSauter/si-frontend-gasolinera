```ts
import { ApiUser, User } from '@/models';

// este seria un modelo de ADAPTER
export const RickAndMortyAdapter = (user: ApiUser): User => {
  return {
    id: user._id,
    name: user.full_name, // en el backend pueden llegar a tener cambios muy radicales: name, full_name, nombre, first_name...
    status: user.status,
    species: user.species
  };
};
// Uso
// /services/fetchMorty.ts
export const rickAndMortyUrl = 'https://rickandmortyapi.com/api/character/2';

export const fetchMorty = async (url: string) => {
  return fetch(url)
    .then(res => res.json())
    .then(res => RickAndMortyAdapter(res)); // aquí se usaría el ADAPTER
};
```
