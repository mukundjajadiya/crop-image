export default function Header() {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-float">
        <span className="text-gradient">Free Instagram</span>
        <span className="text-white"> Cropper Tool</span>
      </h1>

      <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
        Resize images for Instagram posts, stories & profile pictures. Add
        professional padding without cropping - Perfect aspect ratios for all
        Instagram formats (1080x1080, 9:16, 4:5, 1.91:1)
      </p>
    </div>
  );
}
