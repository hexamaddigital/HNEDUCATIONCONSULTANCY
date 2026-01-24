import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CheckCircle, FileCheck, TrendingUp, Calculator } from 'lucide-react';

const steps = [
  {
    icon: FileCheck,
    title: 'Eligibility Check',
    description: 'Assess your eligibility for various loan options based on your profile and requirements.',
  },
  {
    icon: CheckCircle,
    title: 'Documentation Support',
    description: 'Complete assistance in preparing and organizing all required documents for loan application.',
  },
  {
    icon: TrendingUp,
    title: 'Loan Approval',
    description: 'Work with partner banks and NBFCs to secure the best loan terms and ensure approval.',
  },
  {
    icon: DollarSign,
    title: 'Disbursement',
    description: 'Timely coordination with institutions for smooth disbursement of funds directly to university.',
  },
];

export const LoanAssistance = () => {
  const [loanAmount, setLoanAmount] = useState<number>(2000000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [tenure, setTenure] = useState<number>(7);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = tenure * 12;

    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalAmount = emi * time;
    const totalInterest = totalAmount - principal;

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
    };
  };

  const result = calculateEMI();

  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Education Loan Assistance</h1>
            <p className="text-xl text-body-text">
              Expert guidance for securing education loans with the best terms from trusted financial partners
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Loan Process</h2>
              <p className="text-lg text-body-text">
                Simple and transparent steps to secure your education loan
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-ghost-green to-white rounded-xl p-6 border-2 border-turquoise/20 hover:border-turquoise/50 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-turquoise rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-body-text">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-white to-ghost-green rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <Calculator className="w-12 h-12 text-turquoise mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-2">EMI Calculator</h2>
                <p className="text-body-text">
                  Calculate your monthly installments and plan your finances
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-heading mb-3">
                      Loan Amount: ₹{loanAmount.toLocaleString('en-IN')}
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="10000000"
                      step="100000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-turquoise/20 rounded-lg appearance-none cursor-pointer accent-turquoise"
                    />
                    <div className="flex justify-between text-xs text-body-text mt-1">
                      <span>₹1L</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-heading mb-3">
                      Interest Rate: {interestRate}% per annum
                    </label>
                    <input
                      type="range"
                      min="7"
                      max="15"
                      step="0.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-turquoise/20 rounded-lg appearance-none cursor-pointer accent-turquoise"
                    />
                    <div className="flex justify-between text-xs text-body-text mt-1">
                      <span>7%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-heading mb-3">
                      Loan Tenure: {tenure} years
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="1"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full h-2 bg-turquoise/20 rounded-lg appearance-none cursor-pointer accent-turquoise"
                    />
                    <div className="flex justify-between text-xs text-body-text mt-1">
                      <span>1 year</span>
                      <span>15 years</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <p className="text-sm text-body-text mb-1">Monthly EMI</p>
                    <p className="text-3xl font-bold text-turquoise">
                      ₹{result.emi.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <p className="text-sm text-body-text mb-1">Total Interest Payable</p>
                    <p className="text-2xl font-bold text-heading">
                      ₹{result.totalInterest.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <p className="text-sm text-body-text mb-1">Total Amount Payable</p>
                    <p className="text-2xl font-bold text-heading">
                      ₹{result.totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a
                  href="/contact"
                  className="inline-block px-8 py-4 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-all hover:scale-105"
                >
                  Apply for Education Loan
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mt-16 grid md:grid-cols-2 gap-8"
          >
            
          </motion.div>
        </div>
      </section>
    </>
  );
};
