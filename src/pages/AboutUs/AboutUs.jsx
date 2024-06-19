import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="bg-background-white">
      <Helmet>
        <title>
          HealthFlow | About Us
        </title>
      </Helmet>
      <main className="container mx-auto px-4 md:px-8 lg:px-16 py-10">
        {/* Section 1: About us */}
        <section className="text-center mt-10">
          <h2 className="text-3xl md:text-4xl font-bold text-subheading">About us</h2>
        </section>

        {/* Section 2: Why patients choose our center */}
        <section className="my-10 text-center">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-heading">Why patients choose our center</h3>
          <p className="max-w-2xl mx-auto text-paragraph">
            Eitam condimentum aliquam odio, ut consectetur enim. Nullam metus purus, pharetra quis tempor id, feugiat
            at augue. Eitam condimentum aliquam odio, ut consectetur enim.
          </p>
        </section>

        {/* Section 3: Our specialisations */}
        <section className="text-center my-10">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-heading">Our specialisations</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-subheading">85%</div>
              <p className="text-paragraph">Neurosurgery</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-subheading">68%</div>
              <p className="text-paragraph">MRI-diagnostic</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-subheading">79%</div>
              <p className="text-paragraph">Cardiology</p>
            </div>
          </div>
        </section>

        {/* Section 4: Our team image */}
        <section className="text-center mb-10">
          <div className="flex justify-center">
            <img src="https://i.ibb.co/dkMWyz6/team-group.jpg" alt="Our Team" className="rounded-lg shadow-custom w-full max-w-lg" />
          </div>
        </section>

        {/* Section 5: What our patients say */}
        <section className="bg-gray-100 py-10">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-subheading">What our patients say</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="max-w-md bg-white p-6 rounded-lg shadow-custom">
              <p className="mb-4 text-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                facilisis at turpis ac faucibus.
              </p>
              <div className="flex items-center">
                <img src="https://i.ibb.co/X728kTs/w3-70x70.jpg" alt="Patricia James" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-heading">Patricia James</p>
                  <p className="text-sm text-gray-500">Top Manager</p>
                </div>
              </div>
            </div>

            <div className="max-w-md bg-white p-6 rounded-lg shadow-custom">
              <p className="mb-4 text-paragraph">Duis et tellus imperdiet, lacinia risus id, tincidunt ipsum. Integer
                euismod elit.
              </p>
              <div className="flex items-center">
                <img src="https://i.ibb.co/FgJ2MBw/w6-70x70.jpg" alt="Steven Rashford" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-heading">Steven Rashford</p>
                  <p className="text-sm text-gray-500">Truck Driver</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Special offer */}
        <section className="text-center py-10">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-subheading">Special offer</h3>
          <p className="mb-4 text-heading">Get a free medical checkup</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <input type="text" placeholder="Enter your phone number" className="input input-bordered w-full max-w-xs" />
            <button className="btn btn-primary bg-buttonBg hover:bg-blue-700 text-buttonText">Send request</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex flex-wrap justify-between gap-8">
            {/* About us */}
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-bold text-subheading">About us</h4>
              <p className="text-paragraph">Eitam condimentum aliquam odio, ut consectetur enim. Nullam metus purus, pharetra quis tempus.</p>
            </div>

            {/* Explore */}
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-bold text-subheading">Explore</h4>
              <ul>
                <li><a href="#" className="link link-hover text-blue-300">Home</a></li>
                <li><a href="#" className="link link-hover text-blue-300">About us</a></li>
                <li><a href="#" className="link link-hover text-blue-300">Products</a></li>
                <li><a href="#" className="link link-hover text-blue-300">Blog</a></li>
              </ul>
            </div>

            {/* Recent news */}
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-bold text-subheading">Recent news</h4>
              <ul>
                <li><a href="#" className="link link-hover text-blue-300">The best recreation areas for general immunity</a></li>
                <li><a href="#" className="link link-hover text-blue-300">How can women protect themselves from breast cancer</a></li>
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="mt-10 text-center">
            <p>&copy; 2024 HealthFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
