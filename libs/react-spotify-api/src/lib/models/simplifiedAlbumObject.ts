import { SimplifiedArtistObject } from './simplifiedArtistObject';
import { ExternalUrlObject } from './externalUrlObject';
import { ImageObject } from './imageObject';
import { AlbumRestrictionObject } from './albumRestrictionObject';

export interface SimplifiedAlbumObject {
  /**
   * The field is present when getting an artist’s albums.
   * Compare to album_type this field represents relationship between the artist and the album.
   */
  album_group?: string;
  /** The type of the album. */
  album_type: string;
  /**
   * The artists of the album.
   * Each artist object includes a link in href to more detailed information about the artist.
   */
  artists: SimplifiedArtistObject[];
  /**
   * The markets in which the album is available: ISO 3166-1 alpha-2 country codes.
   * Note that an album is considered available in a market when at least 1 of its tracks is available in that market.
   */
  available_markets: string[];
  /** Known external URLs for this album. */
  external_urls: ExternalUrlObject;
  /** A link to the Web API endpoint providing full details of the album. */
  href: string;
  /** The Spotify ID for the album. */
  id: string;
  /** The cover art for the album in various sizes, widest first. */
  images: ImageObject[];
  /** The name of the album. In case of an album takedown, the value may be an empty string. */
  name: string;
  /** The date the album was first released. */
  release_date: string;
  /** The precision with which release_date value is known. */
  release_date_precision: string;
  /** Included in the response when a content restriction is applied. */
  restrictions: AlbumRestrictionObject[];
  /** The number of tracks in the album. */
  total_tracks: number;
  /** The object type. */
  type: string;
  /** The Spotify URI for the album. */
  uri: string;
}
