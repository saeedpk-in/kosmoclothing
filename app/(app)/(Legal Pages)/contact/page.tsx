"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Spinner from "@/components/intractive/Spinner";
import { sendContactMessage } from "@/actions/user";

export default function ContactPage() {
  const [pending, startTransition] = useTransition();
  const [messageData, setMessageData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  function onSubmit() {
    if (
      !messageData.name ||
      !messageData.email ||
      !messageData.subject ||
      !messageData.message
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(messageData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    startTransition(async () => {
      try {
        const res = await sendContactMessage(messageData)
        if(res.success){
          toast.success("Message Sended Successfully")
        } else {
          toast.error(res.message)
        }
      } catch (error) {
        toast.error(error as string || "An error")
      }
    });
    console.log(messageData);
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We value your questions and feedback. Our team typically responds
            within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">Email</h3>
                    <Link
                      href={"mailto:info@kosmoclothing.in"}
                      className="text-gray-900"
                    >
                      info@kosmoclothing.in
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">Phone</h3>
                    <p className="text-gray-900">+91 8848121215</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Mon-Fri, 9am-5pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-600">Address</h3>
                    <p className="text-gray-900">Ponnani,Malappuram,kerala,</p>
                    <p className="text-gray-900">India-679577</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Business Hours
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-gray-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-900">Closed</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Input
                  value={messageData.name}
                  onChange={(e) =>
                    setMessageData({
                      ...messageData,
                      name: e.target.value,
                    })
                  }
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="focus-visible:ring-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Input
                  value={messageData.email}
                  onChange={(e) =>
                    setMessageData({
                      ...messageData,
                      email: e.target.value,
                    })
                  }
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="focus-visible:ring-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <Input
                  value={messageData.subject}
                  onChange={(e) =>
                    setMessageData({
                      ...messageData,
                      subject: e.target.value,
                    })
                  }
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  className="focus-visible:ring-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <Textarea
                  value={messageData.message}
                  onChange={(e) =>
                    setMessageData({
                      ...messageData,
                      message: e.target.value,
                    })
                  }
                  id="message"
                  placeholder="Your message here..."
                  rows={5}
                  className="focus-visible:ring-gray-400"
                />
              </div>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
                className="w-full bg-gray-900 hover:bg-gray-800"
              >
                {pending ? (
                  <Spinner color="white" size="sm"/>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Simple card component (replace with your actual Card component if different)
function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`bg-white rounded-xl ${className}`}>{children}</div>;
}
