# react-spotify-api

- Authenticate to Spotify using [Authorization code flow with PKCE](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow-with-proof-key-for-code-exchange-pkce)
- Provide hooks to fetch data from the [Spotify API](https://developer.spotify.com/documentation/web-api/reference/)

## Basic usage

This library relies on the [Context API](https://reactjs.org/docs/context.html):

```tsx
export const App = () => {
  return (
    <SpotifyAuthProvider clientId={'my-client-id'} scopes={['user-read-email', 'user-read-private']}>
      <SpotifyApiProvider>{/* ... */}</SpotifyApiProvider>
    </SpotifyAuthProvider>
  );
};
```

See `SpotifyApiProviderProps` and `SpotifyAuthProviderProps` for configuration.

Once Spotify API context is made available, you can use any of the API hooks to fetch data. Example:

```tsx
export const UserTopTracks = () => {
  const { data } = useUserTopTracks({ time_range: 'short_term' });

  return (
    <>
      <h2>My top tracks</h2>

      <ul className={'tracks'}>
        {data.items.map((item, idx) => (
          <li key={idx}>
            {item.album.name} - {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};
```

The hooks use [SWR](https://github.com/vercel/swr) internally, with the axios instance provided by `SpotifyApiProvider` as fetcher.

## Running unit tests

Run `nx test react-spotify-api` to execute the unit tests via [Jest](https://jestjs.io).
