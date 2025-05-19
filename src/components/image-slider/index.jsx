import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      if (!url) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${url}?page=${page}&limit=${limit}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setImages(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [url, limit, page]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <div>Loading data... Please wait.</div>;
  if (error) return <div>Error occurred: {error}</div>;
  if (!images.length) return <div>No images to display.</div>;

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {images.map((image, index) => (
        <img
          key={image.id}
          alt={image.download_url}
          src={image.download_url}
          className={
            index === currentSlide
              ? "current-image"
              : "current-image hide-current-image"
          }
        />
      ))}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />
      <span className="circle-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={
              index === currentSlide
                ? "current-indicator"
                : "current-indicator inactive-indicator"
            }
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </span>
    </div>
  );
}
