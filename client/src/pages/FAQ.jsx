import React, { useState } from "react";
import "../pages/FAQ.css";

const faqs = [
  {
    question: "What services does Ujuzi Hub offer?",
    answer: "We connect you with verified fundis like plumbers, electricians, and painters in your area.",
  },
  {
    question: "How do I book a fundi?",
    answer: "Simply click 'Book Now' on the fundi profile. You’ll be directed to the booking page.",
  },
  {
    question: "Are your service providers verified?",
    answer: "Yes, all our fundis go through a vetting process to ensure professionalism and safety.",
  },
  {
    question: "Can I leave a review after service?",
    answer: "Absolutely! After the job is completed, you’ll have the option to rate and review the fundi.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
