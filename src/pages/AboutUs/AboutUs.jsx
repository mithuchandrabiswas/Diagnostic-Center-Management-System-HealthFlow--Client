import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white">
      <main className="container mx-auto py-10">
        <section className="text-center mb-10">
          <h2 className="text-4xl font-bold text-blue-600">About us</h2>
        </section>

        <section className="mb-10 text-center">
          <h3 className="text-2xl font-semibold mb-4">Why patients choose our center</h3>
          <p className="max-w-2xl mx-auto text-gray-600">
            Eitam condimentum aliquam odio, ut consectetur enim. Nullam metus purus, pharetra quis tempor id, feugiat 
            at augue. Eitam condimentum aliquam odio, ut consectetur enim.
          </p>
        </section>

        <section className="text-center mb-10">
          <h3 className="text-2xl font-semibold mb-4">Our specialisations</h3>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-blue-600">85%</div>
              <p>Neurosurgery</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-blue-600">68%</div>
              <p>MRI-diagnostic</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-blue-600">79%</div>
              <p>Cardiology</p>
            </div>
          </div>
        </section>

        <section className="text-center mb-10">
          <div className="flex justify-center">
            <img src="path/to/your/team-image.jpg" alt="Our Team" className="rounded-lg shadow-lg" />
          </div>
        </section>

        <section className="bg-gray-100 py-10">
          <h3 className="text-2xl font-semibold mb-4 text-center text-blue-600">What our patients say</h3>
          <div className="flex justify-center space-x-8">
            <div className="max-w-md bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam 
                facilisis at turpis ac faucibus.
              </p>
              <div className="flex items-center">
                <img src="path/to/patient1.jpg" alt="Patricia James" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Patricia James</p>
                  <p className="text-sm text-gray-500">Top Manager</p>
                </div>
              </div>
            </div>

            <div className="max-w-md bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4 text-gray-700">Duis et tellus imperdiet, lacinia risus id, tincidunt ipsum. Integer 
                euismod elit.
              </p>
              <div className="flex items-center">
                <img src="path/to/patient2.jpg" alt="Steven Rashford" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Steven Rashford</p>
                  <p className="text-sm text-gray-500">Truck Driver</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center py-10">
          <h3 className="text-2xl font-semibold mb-4 text-blue-600">Special offer</h3>
          <p className="mb-4">Get a free medical checkup</p>
          <div className="flex justify-center">
            <input type="text" placeholder="Enter your phone number" className="input input-bordered w-full max-w-xs" />
            <button className="btn btn-primary ml-2 bg-blue-600 hover:bg-blue-700 text-white">Send request</button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div>
              <h4 className="font-bold text-blue-600">About us</h4>
              <p>Eitam condimentum aliquam odio, ut consectetur enim. Nullam metus purus, pharetra quis tempus.</p>
            </div>
            <div>
              <h4 className="font-bold text-blue-600">Explore</h4>
              <ul>
                <li><a href="#" className="link link-hover text-blue-300">Home</a></li>
                <li><a href="#" className="link link-hover text-blue-300">About us</a></li>
                <li><a href="#" className="link link-hover text-blue-300">Products</a></li>
                <li><a href="#" className="link link-hover text-blue-300">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-blue-600">Recent news</h4>
              <ul>
                <li><a href="#" className="link link-hover text-blue-300">The best recreation areas for general immunity</a></li>
                <li><a href="#" className="link link-hover text-blue-300">How can women protect themselves from breast cancer</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center">
            <p>&copy; 2023 HolaMed. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
