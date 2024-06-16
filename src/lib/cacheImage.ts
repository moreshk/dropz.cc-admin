export const cacheImage = (imageURI: string) => {
  try {
    return `https://img.fotofolio.xyz?url=${encodeURIComponent(
      trimTrailingSlash(imageURI)
    )}`;
  } catch {
    return imageURI;
  }
};

function trimTrailingSlash(str: string): string {
  if (str.endsWith("/")) {
    return str.substring(0, str.length - 1);
  }
  return str;
}
