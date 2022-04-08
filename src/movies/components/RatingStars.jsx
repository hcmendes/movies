export default function RatingStars({ rating }) {
  return (
    <>
      {
        [1, 2, 3, 4, 5].map((x, i) => {
          if (x <= rating) return <i key={i} className="bi bi-star-fill"></i>;
          else if (Math.abs(x - rating) < 1) return <i key={i} className="bi bi-star-half"></i>;
          else return <i key={i} className="bi bi-star"></i>
        })
      }
      <span> {rating}</span>
    </>
  )
}