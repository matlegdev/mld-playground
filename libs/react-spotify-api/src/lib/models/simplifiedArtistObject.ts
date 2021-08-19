import { ExternalUrlObject } from './externalUrlObject';

export interface SimplifiedArtistObject {
  /** Known external URLs for this artist. */
  external_urls: ExternalUrlObject[];
  /** A link to the Web API endpoint providing full details of the artist. */
  href: string;
  /** The Spotify ID for the artist. */
  id: string;
  /** The name of the artist. */
  name: string;
  /** The object type. */
  type: string;
  /** The Spotify URI for the artist. */
  uri: string;
}
