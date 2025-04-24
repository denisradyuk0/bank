import Image from "../domain/image";
import { ImageData } from "./strapi/media";

export default class ImageMapper {
  public static strapiToImage(data: ImageData): Image {
    if (data?.formats) {
      return new Image(data.formats);
    }
    return new Image({ thumbnail: { ...data } });
  }
}
