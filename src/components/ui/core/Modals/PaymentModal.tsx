"use client";

import { useState } from "react";
import { Modal } from "antd";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Loader } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useCreateSubscriptionsMutation } from "@/redux/features/subscriptions/subscriptionsApi";

interface BookingModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
  subscriptionId?: string;
  onUpgrade?: () => void;
}

export function PaymentModal({
  open,
  onCancel,
  onSuccess,

  subscriptionId,
}: BookingModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    securityCode: "",
    expireDate: "",
    cardName: "",
    rememberMe: false,
  });
  const [purchase, { isLoading: isPurchasing }] =
    useCreateSubscriptionsMutation();

  const { isLoading: getMeLoading } = useGetMeQuery(undefined);

  const [, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // here
  if (getMeLoading) {
    // return <Loader />;
  }

  //   {
  //     "paymentMethodId": "pm_1SEWG9BRuTovkuxKOzyWouSv",
  //     "subscriptionId": "68e12620b3c4295a19109938"
  // }
  // const role = data?.data?.role;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // onUpgrade?.();
    e.preventDefault();
    setIsSubmitting(true);

    if (!stripe || !elements) {
      setIsSubmitting(false);
      toast.error("Stripe not properly initialized");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);

    if (!cardNumberElement || !cardCvcElement || !cardExpiryElement) {
      setIsSubmitting(false);
      toast.error("Card information not properly initialized");
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!paymentMethod?.id) {
        throw new Error("Failed to create payment method");
      }

      const newData = {
        paymentMethodId: paymentMethod.id,
        subscriptionId: subscriptionId,
      };

      const res = await purchase(newData).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Thanks for subscribe");
        setIsModalVisible(true);
        onCancel();
        // onUpgrade?.();
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      type ErrorResponse = {
        data?: {
          message?: string;
          success?: boolean;
        };
      };
      const err = error as ErrorResponse;
      const errMessage = err?.data?.message || "An error occurred";

      toast.error(errMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        title=""
        open={open}
        onCancel={onCancel}
        footer={null}
        width={400}
        maskClosable={false}
        centered
      >
        <div className="flex justify-center py-8">
          <form onSubmit={handleSubmit} className="w-full   p-5 rounded-lg">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800 leading-[120%]">
                Payment
              </h2>
              <p className="text-sm text-gray-500">
                All transactions are secure and encrypted.
              </p>
            </div>

            <div className="space-y-6 ">
              <div>
                <div className="flex items-center space-x-4 mt-8">
                  <CardNumberElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#32325d",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                      },
                      iconStyle: "default", 
                      showIcon: true, 
                    }}
                    className="w-full focus:outline-primary px-3 py-[14px] border bg-[#F9FAFB]  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Card Info Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <CardCvcElement className="w-full px-3 py-[14px]  border bg-[#F9FAFB]  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <CardExpiryElement className="w-full px-3 py-[14px]  border bg-[#F9FAFB]  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>

              {/* Name on Card */}
              <div>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="Name of card"
                  value={cardData.cardName}
                  onChange={handleChange}
                  className="bg-[#F9FAFB]  w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <button
                // disabled={isLoading || isSubmitting || paymentLoading}
                type="submit"
                className="w-full text-white py-3 bg-primary rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary mt-6 flex items-center justify-center"
              >
                {isPurchasing ? <Loader className="animate-spin" /> : "Pay Now"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {/* Success Modal */}
      <Modal
        footer={null}
        closable={false}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        centered
      >
        <div className="max-w-md w-full md:p-8 text-center space-y-6">
          <div className="flex justify-center mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_x32_0_Success-2LrJoG4bv6P3bklxNH3pzXPnujCngj.png"
              alt="Success"
              width={64}
              height={64}
              className="w-16 h-16"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Congratulations!</h1>

            <p className="text-muted-foreground">
              Thanks for your payment. We will contact you soon.
            </p>
          </div>

          <div className="flex sm:flex-row flex-col gap-4 justify-center mt-8 ">
            <Link
              href="/"
              className="w-full px-4 py-2 border border-[#1F6306] rounded-[8px] text-[#1F6306]"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
