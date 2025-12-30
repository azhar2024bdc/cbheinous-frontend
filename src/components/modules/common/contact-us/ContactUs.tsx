"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Mail, Phone } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+?[\d\s-()]+$/, "Invalid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    alert("Message sent successfully!");
    reset();
  };

  return (
    <div className="min-h-screen  md:py-12 py-5 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl  overflow-hidden">
          <div className="flex  flex-col items-center justify-center">
            <h2 className="text-2xl text-text-secondary font-bold mb-2">Get In Touch</h2>
            <p className="text-text-secondary text-center ">
              Contact us for support, inquiries, or guidance we’re here to help
              anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-5 md:gap-y-0 gap-y-10 mt-10">
            {/* Left Sidebar - Contact Information */}
            <div className="md:col-span-2  md:px-8 md:border-r border-gray-200">
              <h2 className="text-[18px] font-semibold text-text-secondary mb-2">Contact Information</h2>
        

              <div className="md:space-y-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-text-secondary  p-3 rounded-full flex-shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-text-secondary">Find Us Here:</h3>
                    <p className=" text-sm">
                      Dhaka Office
                      <br />
                      160 Mohakhali DOHS
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-text-secondary p-3 rounded-full flex-shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-text-secondary">Email us:</h3>
                    <p className="text-sm">info@bing.net.bd</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-text-secondary p-3 rounded-full flex-shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-text-secondary">Consulting Us:</h3>
                    <p className=" text-sm">+1 254 2568 2356</p>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="md:mt-12 mt-6">
                <div className="flex gap-3">
                  <button className="bg-white/20 border hover:bg-white/30 p-2.5 rounded-full transition-colors">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </button>
                  <button className="bg-white/20 border hover:bg-white/30 p-2.5 rounded-full transition-colors">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="bg-white/20 border hover:bg-white/30 p-2.5 rounded-full transition-colors">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="md:col-span-3 md:px-8">
              <div className="space-y-5">
                <h2 className="text-[18px] font-semibold text-text-secondary mb-2">Send us a Message now</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address 
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                  />
                  {errors.email && (
                    <p className="mt-1 mb-3 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                    {/* Email address &amp; */}
                  </label>
                  <input
                    {...register("phoneNumber")}
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Write your message...."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-2.5 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
