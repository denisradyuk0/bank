import getConfig from "../config";
import { ImageMediaFormats } from "../infrastructure/strapi/media";

export default class Image {
  private _largeUrl?: string;

  private _smallUrl?: string;

  private _mediumUrl?: string;

  private _thumbnailUrl?: string;

  constructor(formats: ImageMediaFormats) {
    if (formats.large) {
      this._largeUrl = `${getConfig().strapi.baseUrl}${formats.large.url}`;
    }
    if (formats.small) {
      this._smallUrl = `${getConfig().strapi.baseUrl}${formats.small.url}`;
    }
    if (formats.medium) {
      this._mediumUrl = `${getConfig().strapi.baseUrl}${formats.medium.url}`;
    }
    if (formats.thumbnail) {
      this._thumbnailUrl = `${getConfig().strapi.baseUrl}${formats.thumbnail.url}`;
    }
  }

  getLargeUrl(): string | undefined {
    return this._largeUrl;
  }

  getMediumUrl(): string | undefined {
    return this._mediumUrl;
  }

  getSmallUrl(): string | undefined {
    return this._smallUrl;
  }

  getThumbnailUrl(): string | undefined {
    return this._thumbnailUrl;
  }

  getBiggest(): string | undefined {
    return (
      this.getLargeUrl() ??
      this.getMediumUrl() ??
      this.getSmallUrl() ??
      this.getThumbnailUrl()
    );
  }

  getSmallest(): string | undefined {
    return (
      this.getThumbnailUrl() ??
      this.getSmallUrl() ??
      this.getMediumUrl() ??
      this.getLargeUrl()
    );
  }
}
