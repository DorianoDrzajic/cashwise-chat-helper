
export interface ChatResponse {
  question: string;
  answer: string;
}

export const suggestedQuestions: string[] = [
  "What investment options do you offer?",
  "How do I start investing?",
  "What are your management fees?",
  "How do I create an account?",
  "What is your minimum investment amount?"
];

export const chatResponses: ChatResponse[] = [
  {
    question: "What investment options do you offer?",
    answer: "We offer a range of investment options including stocks, bonds, ETFs, mutual funds, and personalized portfolio management. Our advisors can help you choose the right mix based on your financial goals and risk tolerance."
  },
  {
    question: "How do I start investing?",
    answer: "Starting is simple! Create an account, complete your profile, deposit funds, and choose your investments. If you're new to investing, our guided setup can recommend a portfolio based on your goals and preferences."
  },
  {
    question: "What are your management fees?",
    answer: "Our management fees range from 0.25% to 0.75% annually, depending on your investment strategy and account size. We believe in transparent pricing with no hidden fees. For accounts over $100,000, we offer discounted rates."
  },
  {
    question: "How do I create an account?",
    answer: "You can create an account by clicking the 'Sign Up' button at the top of our homepage. You'll need to provide some basic information, verify your identity, and link a bank account for transfers. The process typically takes less than 10 minutes."
  },
  {
    question: "What is your minimum investment amount?",
    answer: "Our standard minimum investment amount is $500, but we also offer a starter plan that lets you begin with as little as $50. This makes it accessible for those just beginning their investment journey."
  },
  {
    question: "Is my money safe?",
    answer: "Yes, your money is protected by industry-standard security measures. We use bank-level encryption and all accounts are SIPC-insured up to $500,000. Additionally, we employ strict risk management protocols for all investments."
  },
  {
    question: "Can I withdraw my money anytime?",
    answer: "Yes, you can withdraw your money at any time without penalty. Standard transfers to your linked bank account take 2-3 business days to process. We also offer a premium service with same-day transfers for eligible customers."
  },
  {
    question: "Do you offer tax optimization?",
    answer: "Yes, we offer tax optimization strategies for all investment accounts. This includes tax-loss harvesting, efficient distribution planning, and strategic asset location across different account types to minimize your tax burden."
  },
  {
    question: "How can I speak to a human advisor?",
    answer: "You can schedule a call with one of our financial advisors directly through your account dashboard. Premium members have unlimited advisor access, while standard accounts include quarterly consultations."
  },
  {
    question: "What is your investment philosophy?",
    answer: "Our investment philosophy centers on long-term growth through diversification, risk management, and cost-efficient investing. We believe in evidence-based strategies rather than market timing or speculative approaches."
  }
];

export const fallbackResponses: string[] = [
  "I don't have information on that specific topic. Would you like to speak with one of our financial advisors?",
  "I'm not able to answer that question at the moment. Would you like me to connect you with our customer support team?",
  "That's a great question that might require a more personalized response. Would you like to schedule a call with an advisor?",
  "I don't have that information in my database. Our support team would be happy to help you with this question.",
  "I'm sorry, I don't have enough information to provide a complete answer on that topic. Is there something else I can help with?"
];

export function getResponse(query: string): string {
  const matchingResponse = chatResponses.find(
    response => response.question.toLowerCase().includes(query.toLowerCase()) || 
               query.toLowerCase().includes(response.question.toLowerCase())
  );
  
  if (matchingResponse) {
    return matchingResponse.answer;
  }
  
  // Return a random fallback response if no match is found
  const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
  return fallbackResponses[randomIndex];
}
