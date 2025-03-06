
import React from 'react';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Smart financial solutions for your future
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized investment strategies designed to help you achieve your financial goals with confidence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-finance-muted p-8 rounded-lg transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-medium mb-3">Investment Planning</h3>
            <p className="text-gray-600">
              Customized investment strategies aligned with your goals and risk tolerance.
            </p>
          </div>
          
          <div className="bg-finance-muted p-8 rounded-lg transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-medium mb-3">Retirement Solutions</h3>
            <p className="text-gray-600">
              Secure your future with our comprehensive retirement planning services.
            </p>
          </div>
          
          <div className="bg-finance-muted p-8 rounded-lg transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-medium mb-3">Tax Optimization</h3>
            <p className="text-gray-600">
              Minimize your tax burden through strategic financial planning.
            </p>
          </div>
        </div>
      </section>
      
      {/* Floating Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;
