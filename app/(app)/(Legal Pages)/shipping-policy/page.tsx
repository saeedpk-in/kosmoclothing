export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white px-6 py-8 sm:px-10 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold">Shipping Policy</h1>
          <p className="mt-2 text-gray-300">
            We're excited to get your order to you! Here's everything you need to know about how we ship.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Processing Time */}
          <section className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl font-bold text-gray-900 mr-3">1.</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Processing Time</h2>
                <div className="mt-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-gray-700 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-gray-700">
                        All orders are processed within <span className="font-semibold">1-2 business days</span> (excluding weekends and holidays).
                      </p>
                      <p className="text-gray-700 mt-2">
                        You'll receive a confirmation email with tracking info once your order is shipped.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Time */}
          <section className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl font-bold text-gray-900 mr-3">2.</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Shipping Time</h2>
                <div className="mt-4 grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      Domestic Shipping
                    </h3>
                    <p className="text-gray-700">
                      Delivery typically takes <span className="font-semibold">10 business days</span> after processing.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5 opacity-70">
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      International Shipping
                    </h3>
                    <p className="text-gray-700">
                      Currently not available. We ship only within India.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Costs */}
          <section className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl font-bold text-gray-900 mr-3">3.</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Shipping Costs</h2>
                <div className="mt-4 space-y-3 text-gray-700">
                  <p>
                    Shipping costs are calculated at checkout based on your location and selected delivery method.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p>
                        We may offer <span className="font-semibold">free shipping</span> on orders over a certain amount — keep an eye out for special promos!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Delays & Issues */}
          <section className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl font-bold text-gray-900 mr-3">4.</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Delays & Issues</h2>
                <div className="mt-4 space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          We're not responsible for delays caused by the carrier, customs, or incorrect shipping info.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          If your package is delayed, lost, or arrives damaged, please reach out to our support team immediately at <span className="font-medium">info@kosmoclothing.in</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Address Accuracy */}
          <section className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl font-bold text-gray-900 mr-3">5.</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Address Accuracy</h2>
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Please double-check your shipping address. We are <span className="font-medium">not responsible</span> for orders shipped to incorrect addresses provided by the customer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-3">Need Help With Shipping?</h2>
            <p className="text-gray-700 mb-4">
              Contact our customer service team for any shipping-related questions.
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