import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

async function waitForImages(element: HTMLElement) {
  const images = Array.from(element.querySelectorAll("img"));

  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    })
  );
}

export async function generatePdf(
  element: HTMLElement | null,
  fileName: string
) {
  if (!element) {
    alert("PDF preview not found.");
    return;
  }

  try {
    await waitForImages(element);

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      width: element.offsetWidth,
      height: element.offsetHeight,
      windowWidth: element.offsetWidth,
      windowHeight: element.offsetHeight,
    });

    const imageData = canvas.toDataURL("image/jpeg", 0.98);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    pdf.addImage(imageData, "JPEG", 0, 0, 210, 297);
    pdf.save(fileName);
  } catch (error) {
    console.error("PDF generation error:", error);
    alert("PDF download failed. Please check console or try again.");
  }
}