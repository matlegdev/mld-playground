export abstract class SpotifyAuthConstants {
  /** Authority URL of Spotify OAuth2. */
  static readonly Authority = 'https://accounts.spotify.com';
  /** Authorization endpoint URL of Spotify OAuth2. */
  static readonly AuthorizationEndpoint = 'https://accounts.spotify.com/authorize';
  /** Token endpoint URL of Spotify OAuth2. */
  static readonly TokenEndpoint = 'https://accounts.spotify.com/api/token';

  /** Name of the query string parameter holding the token during the callback. */
  static readonly CallbackCodeParam = 'code';
  /** Name of the query string parameter holding the state during the callback. */
  static readonly CallbackStateParam = 'state';
}
