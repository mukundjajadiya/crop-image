import { Metadata } from "next";
import Header from "@/components/server/Header";
import SEOContent from "@/components/server/SEOContent";
import Footer from "@/components/server/Footer";
import ImageCropper from "@/components/client/ImageCropper";

export const metadata: Metadata = {
  title: "Instagram Cropper - Resize Images for Posts & Stories",
  description:
    "Free Instagram image resizer. Resize photos for posts (1080x1080), stories (9:16), profile pictures. Add padding without cropping.",
  keywords: [
    "Instagram cropper",
    "Instagram image resizer",
    "Instagram photo resizer",
    "resize image for Instagram",
    "Instagram aspect ratio tool",
    "Instagram padding tool",
    "social media image resizer",
    "Instagram post size",
    "Instagram story size",
    "free online image resizer",
    "1080x1080",
    "9:16 aspect ratio",
    "4:5 ratio",
    "Instagram profile picture resizer",
    "crop image for Instagram",
    "fit image Instagram",
    "Instagram image dimensions",
    "square image Instagram",
    "portrait Instagram post",
    "landscape Instagram post",
    "Instagram reels size",
    "IGTV size",
    "without cropping",
  ],
  authors: [{ name: "Reduce Image Size" }],
  robots: "index, follow",
  canonical: "https://crop.reduceimgsize.com/",
  openGraph: {
    title: "Instagram Cropper - Resize Images for Posts & Stories",
    description:
      "Free Instagram image resizer. Resize photos for posts (1080x1080), stories (9:16), profile pictures. Add padding without cropping.",
    url: "https://crop.reduceimgsize.com/",
    siteName: "Instagram Cropper Tool",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Instagram Cropper Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Cropper - Resize Images for Posts & Stories",
    description:
      "Free Instagram image resizer. Resize photos for posts (1080x1080), stories (9:16), profile pictures. Add padding without cropping.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://crop.reduceimgsize.com/",
  },
  other: {
    language: "en",
    "revisit-after": "1 days",
    distribution: "global",
    rating: "general",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Background Pattern - Server Side */}
      <div className="fixed inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header - Server Side Rendered */}
          <Header />

          {/* Main Content Grid - Client Components Only Where Needed */}
          <ImageCropper />
        </div>
      </div>

      {/* SEO Content - Server Side Rendered */}
      <SEOContent />

      {/* Footer - Server Side Rendered */}
      <Footer />
    </div>
  );
}
