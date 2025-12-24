import { useState } from 'react';

 const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full py-5 px-6 flex items-center justify-between text-left  transition-colors"
      >
        <span className="text-lg font-medium text-gray-900 pr-8">{question}</span>
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 text-gray-600 text-2xl font-light">
          {isOpen ? '−' : '+'}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;