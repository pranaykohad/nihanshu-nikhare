import imagemin from "imagemin";
import imageminJpegRecompress from "imagemin-jpeg-recompress";
import imageminWebp from "imagemin-webp";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  try {
    console.log("🖼️  Optimizing JPEG images...");
    const jpegFiles = await imagemin(["src/assets/*.jpg"], {
      destination: "src/assets",
      plugins: [
        imageminJpegRecompress({
          progressive: true,
          max: 80,
          min: 70,
        }),
      ],
    });

    console.log(
      `✅ JPEG compression complete. ${jpegFiles.length} files optimized.`,
    );

    console.log("\n🌐 Converting images to WebP format...");
    const webpFiles = await imagemin(["src/assets/*.jpg"], {
      destination: "src/assets",
      plugins: [imageminWebp({ quality: 80 })],
    });

    console.log(
      `✅ WebP conversion complete. ${webpFiles.length} files converted.`,
    );
    console.log("\n📊 Image optimization finished!");
    console.log(
      "💡 Tip: Reference WebP images instead of JPEGs for faster loading.",
    );
  } catch (error) {
    console.error("❌ Image optimization failed:", error);
    process.exit(1);
  }
})();
