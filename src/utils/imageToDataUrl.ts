export async function imageToDataUrl(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Could not convert image to data URL."));
      }
    };

    reader.onerror = () => reject(new Error("Image reading failed."));
    reader.readAsDataURL(blob);
  });
}