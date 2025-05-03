export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white px-6 py-8 sm:px-10 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold">Return Policy</h1>
          <p className="mt-2 text-gray-300">
            We want you to love your purchase, but if you're not completely satisfied, here's how returns work
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Eligibility Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Return Eligibility</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  What We Accept
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Items returned within 5 days of delivery
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Products unused, unwashed with original packaging
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Tags must be intact
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Only if item is damaged upon delivery
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  What We Don't Accept
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Change of mind returns
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Sizing issues
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Final sale items
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Custom orders & gift cards
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Return Card Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Return Card Requirement</h2>
            <div className="bg-gray-50 border-l-4 border-black p-5">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-black mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Important Notice</h3>
                  <p className="text-gray-700">
                    All returns must include the original Return Card provided with your order. Returns without this card will not be accepted, even for damaged items.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Return Card Required</h3>
                <p className="text-sm text-gray-600">
                  All returns must be accompanied by the original Return Card provided with your order.
                </p>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold mb-2">No Card, No Return</h3>
                <p className="text-sm text-gray-600">
                  Returns without the Return Card will not be accepted under any circumstances.
                </p>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Included With Order</h3>
                <p className="text-sm text-gray-600">
                  The Return Card is included with your package. Please keep it safe if you plan to return your item.
                </p>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Refund Process</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Once your return is approved and received, refunds are processed within 10-12 business days back to your original payment method.
              </p>
              <p>
                Customers are responsible for return shipping costs unless the item was defective or incorrect.
              </p>
            </div>
          </section>

          {/* How to Return */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">How to Return</h2>
            <ol className="list-decimal pl-5 space-y-3 text-gray-700">
              <li>Ensure your item meets our return eligibility criteria</li>
              <li>Include the original Return Card with your return</li>
              <li>Pack the item securely in its original packaging</li>
              <li>Ship to our returns center (address provided with Return Card)</li>
              <li>Wait for confirmation email once we process your return</li>
            </ol>
          </section>

          {/* Contact */}
          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-3">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              For any questions about returns, please contact our customer service team.
            </p>
            <a 
              href="mailto:info@kosmoclothing.in" 
              className="inline-flex items-center text-black font-medium hover:underline"
            >
              info@kosmoclothing.in
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}