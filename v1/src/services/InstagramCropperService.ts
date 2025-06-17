export interface CropperConfig {
  aspectRatio: number;
  fitMode: "fit" | "fill";
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface TargetDimensions extends ImageDimensions {
  targetWidth: number;
  targetHeight: number;
  offsetX: number;
  offsetY: number;
}

export class InstagramCropperService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeCanvas();
    }
  }

  private initializeCanvas(): void {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  /**
   * Calculate target dimensions based on aspect ratio and fit mode
   */
  public calculateTargetDimensions(
    image: HTMLImageElement,
    config: CropperConfig
  ): TargetDimensions {
    const originalWidth = image.naturalWidth;
    const originalHeight = image.naturalHeight;
    const currentRatio = originalWidth / originalHeight;
    const { aspectRatio, fitMode } = config;

    let targetWidth: number;
    let targetHeight: number;
    let offsetX = 0;
    let offsetY = 0;

    if (fitMode === "fit") {
      // Fit mode: add padding to maintain aspect ratio
      targetWidth = originalWidth;
      targetHeight = originalHeight;

      if (currentRatio > aspectRatio) {
        targetHeight = Math.round(originalWidth / aspectRatio);
        offsetY = Math.round((targetHeight - originalHeight) / 2);
      } else if (currentRatio < aspectRatio) {
        targetWidth = Math.round(originalHeight * aspectRatio);
        offsetX = Math.round((targetWidth - originalWidth) / 2);
      }
    } else {
      // Fill mode: crop to maintain aspect ratio
      if (currentRatio > aspectRatio) {
        targetWidth = Math.round(originalHeight * aspectRatio);
        targetHeight = originalHeight;
        offsetX = Math.round((originalWidth - targetWidth) / 2);
      } else {
        targetWidth = originalWidth;
        targetHeight = Math.round(originalWidth / aspectRatio);
        offsetY = Math.round((originalHeight - targetHeight) / 2);
      }
    }

    return {
      width: originalWidth,
      height: originalHeight,
      targetWidth,
      targetHeight,
      offsetX,
      offsetY,
    };
  }

  /**
   * Process image with given configuration
   */
  public async processImage(
    image: HTMLImageElement,
    config: CropperConfig
  ): Promise<string> {
    if (!this.canvas || !this.ctx) {
      throw new Error("Canvas not initialized");
    }

    const dimensions = this.calculateTargetDimensions(image, config);
    const { targetWidth, targetHeight, offsetX, offsetY } = dimensions;

    // Set canvas size
    this.canvas.width = targetWidth;
    this.canvas.height = targetHeight;

    // Clear canvas
    this.ctx.clearRect(0, 0, targetWidth, targetHeight);

    if (config.fitMode === "fit") {
      // Fit mode: fill background with white and center image
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.fillRect(0, 0, targetWidth, targetHeight);

      this.ctx.drawImage(
        image,
        offsetX,
        offsetY,
        image.naturalWidth,
        image.naturalHeight
      );
    } else {
      // Fill mode: crop the image
      this.ctx.drawImage(
        image,
        offsetX,
        offsetY,
        targetWidth,
        targetHeight,
        0,
        0,
        targetWidth,
        targetHeight
      );
    }

    return this.canvas.toDataURL("image/png", 1.0);
  }

  /**
   * Download processed image
   */
  public downloadImage(
    dataURL: string,
    filename = "instagram-cropped-image.png"
  ): void {
    if (typeof window === "undefined") return;

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Get Instagram format presets
   */
  public static getInstagramFormats() {
    return [
      {
        label: "📱 Instagram Square Post 1080x1080 (1:1)",
        value: 1,
        dimensions: "1080x1080",
      },
      {
        label: "📷 Instagram Portrait Post 1080x1350 (4:5)",
        value: 0.8,
        dimensions: "1080x1350",
      },
      {
        label: "🖼️ Instagram Landscape Post 1080x566 (1.91:1)",
        value: 1.91,
        dimensions: "1080x566",
      },
      {
        label: "📱 Instagram Story/Reel 1080x1920 (9:16)",
        value: 0.5625,
        dimensions: "1080x1920",
      },
    ];
  }

  /**
   * Validate image file
   */
  public static validateImageFile(file: File): boolean {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    return validTypes.includes(file.type) && file.size <= maxSize;
  }

  /**
   * Load image from file
   */
  public static loadImageFromFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (!this.validateImageFile(file)) {
        reject(new Error("Invalid file type or size"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }
}
