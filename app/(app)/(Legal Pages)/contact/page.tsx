export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1>Contact Us</h1>
      <div className="space-y-6">
        <p>
          Have questions? We believe in straightforward communication. 
          Reach out through any of these channels:
        </p>
        
        <div className="border border-black p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p>Email: contact@yourbrand.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Minimal Street, Simplicity City</p>
        </div>
        
        <h2>Send Us a Message</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input type="text" className="w-full p-2 border border-black" />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input type="email" className="w-full p-2 border border-black" />
          </div>
          <div>
            <label className="block mb-1">Message</label>
            <textarea className="w-full p-2 border border-black h-32"></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}