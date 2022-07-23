export async function getThumbnail(id: string | undefined) {
  return id
    ? (
        await fetch(
          `https://asia-northeast3-get-youtube-thumbnail.cloudfunctions.net/thumbnail?id=${id}`
        )
      ).text()
    : "";
}
