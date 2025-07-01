import { assets, testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 py-12">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customers Testimonials
      </h1>
      <p className="text-gray-500 mb-12">What Our Users are Saying. </p>

      <div className="flex flex-wrap justify-center gap-6">
        {testimonialsData.map((Testimonial, index) => (
          <div
            key={index}
            className="bg-white/20 p-6 rounded-lg shadow-md w-[300px] cursor-pointer hover:scale-[1.02] transition-all"
          >
            <div className="flex flex-col items-center">
              <img
                src={Testimonial.image}
                alt=""
                className="rounded-full w-16 h-16 object-cover"
              />
              <h2 className="text-xl font-semibold mt-3">{Testimonial.name}</h2>
              <p className="text-gray-500">{Testimonial.role}</p>
              <div className="flex mb-4 mt-2">
                {Array(Testimonial.stars)
                  .fill()
                  .map((_, index) => (
                    <img
                      key={index}
                      src={assets.rating_star}
                      alt="star"
                      className="w-4 h-4"
                    />
                  ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                {Testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
