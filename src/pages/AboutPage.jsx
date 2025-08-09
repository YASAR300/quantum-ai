import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Award, Clock, Shield, Users, Zap } from 'lucide-react';

export function AboutPage() {
  const stats = [
    { label: "Accuracy Rate", value: "95.2%", icon: Target },
    { label: "Diagnoses Completed", value: "10,000+", icon: Award },
    { label: "Response Time", value: "<2 sec", icon: Clock },
    { label: "Users Worldwide", value: "5,000+", icon: Users }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      description: "15+ years in diagnostic medicine and AI healthcare applications",
      color: "from-blue-400 to-indigo-500"
    },
    {
      name: "Alex Rodriguez",
      role: "Lead AI Engineer",
      description: "Expert in machine learning and medical data analysis systems",
      color: "from-green-400 to-teal-500"
    },
    {
      name: "Dr. Michael Thompson",
      role: "Clinical Advisor",
      description: "Specialized in emergency medicine and diagnostic accuracy",
      color: "from-purple-400 to-pink-500"
    }
  ];

  const technologies = [
    {
      icon: Brain,
      title: "Deep Learning Models",
      description: "Advanced neural networks trained on millions of medical cases for pattern recognition and accurate diagnosis prediction.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Secure Processing",
      description: "HIPAA-compliant infrastructure with end-to-end encryption ensuring your medical data remains private and secure.",
      color: "green"
    },
    {
      icon: Target,
      title: "Continuous Learning",
      description: "Our models continuously improve through feedback loops and new medical research integration for better accuracy.",
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="bg-white/20 p-4 rounded-2xl inline-block mb-6"
            >
              <Brain className="w-16 h-16 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Our Platform
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Revolutionizing healthcare through artificial intelligence and cutting-edge 
              machine learning technology for accurate medical diagnosis.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              We're dedicated to democratizing access to accurate medical diagnosis through 
              the power of artificial intelligence. Our platform combines decades of medical 
              expertise with state-of-the-art machine learning algorithms.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              By providing healthcare professionals and patients with instant, reliable 
              diagnostic insights, we aim to improve healthcare outcomes and reduce 
              diagnostic errors worldwide.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI-Powered Insights
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Leveraging advanced neural networks for precise diagnosis
                </p>
              </div>
            </motion.div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                  >
                    <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Technology Section */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Technology
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built on a foundation of advanced machine learning algorithms, extensive medical 
              databases, and continuous learning from real-world diagnostic cases.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`bg-${tech.color}-100 dark:bg-${tech.color}-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all`}
                >
                  <tech.icon className={`w-8 h-8 text-${tech.color}-600 dark:text-${tech.color}-400`} />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {tech.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A diverse group of medical professionals, AI researchers, and engineers working together to transform healthcare.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center group hover:shadow-xl transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg`}
              >
                <span className="text-white text-xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {member.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our mission to revolutionize healthcare through artificial intelligence
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg cursor-pointer"
            >
              <Zap className="w-5 h-5" />
              Get Started Today
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}