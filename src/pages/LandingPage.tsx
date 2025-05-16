
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ArrowDown } from "lucide-react";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-nr-blue rounded-md"></div>
              <span className="text-xl font-bold">Observify</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/#features" className="text-gray-600 hover:text-nr-blue transition-colors">Features</Link>
              <Link to="/#solutions" className="text-gray-600 hover:text-nr-blue transition-colors">Solutions</Link>
              <Link to="/#pricing" className="text-gray-600 hover:text-nr-blue transition-colors">Pricing</Link>
              <Link to="/#docs" className="text-gray-600 hover:text-nr-blue transition-colors">Documentation</Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard">Start free trial</Link>
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <Link to="/#features" className="block py-2 text-gray-600 hover:text-nr-blue transition-colors">Features</Link>
              <Link to="/#solutions" className="block py-2 text-gray-600 hover:text-nr-blue transition-colors">Solutions</Link>
              <Link to="/#pricing" className="block py-2 text-gray-600 hover:text-nr-blue transition-colors">Pricing</Link>
              <Link to="/#docs" className="block py-2 text-gray-600 hover:text-nr-blue transition-colors">Documentation</Link>
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                <Button variant="outline" asChild className="justify-center">
                  <Link to="/dashboard">Sign in</Link>
                </Button>
                <Button asChild className="justify-center">
                  <Link to="/dashboard">Start free trial</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 space-y-6">
              <h1 className="font-bold animate-fade-in">
                Full-Stack Observability<br />
                <span className="text-gradient">For Modern Applications</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Monitor, troubleshoot, and optimize your entire stack with a single platform. Get actionable insights in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Start for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  View demo
                </Button>
              </div>
              <p className="text-sm text-gray-500 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                No credit card required • Free 14-day trial
              </p>
            </div>
            
            <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-gradient-to-br from-nr-blue/5 to-nr-purple/5 p-4 rounded-xl border border-gray-100 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Dashboard Preview"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 hidden md:block">
          <Button variant="ghost" size="sm">
            <ArrowDown className="h-4 w-4 mr-1" /> Scroll to learn more
          </Button>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm text-gray-500 mb-8">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-32 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Complete Observability</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Monitor every layer of your stack with powerful tools built for modern teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Application Performance",
                description: "Track application metrics, traces, and errors with detailed insights and code-level diagnostics",
                icon: "apm"
              },
              {
                title: "Browser Monitoring",
                description: "Analyze real-user experience with page load timing, JavaScript errors, and user interactions",
                icon: "browser"
              },
              {
                title: "Synthetic Monitoring",
                description: "Proactively detect issues with scripted browsers that simulate user journeys 24/7",
                icon: "synthetic"
              },
              {
                title: "Logs Management",
                description: "Centralize, search, and analyze logs from all your services in a single platform",
                icon: "logs"
              },
              {
                title: "Custom Dashboards",
                description: "Build tailored visualizations that combine metrics, events, logs, and traces",
                icon: "dashboards"
              },
              {
                title: "AI-Powered Alerts",
                description: "Receive intelligent notifications for anomalies and incidents with suggested solutions",
                icon: "alerts"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover">
                <div className="h-12 w-12 rounded-lg bg-nr-blue/10 text-nr-blue flex items-center justify-center mb-4">
                  <div className="h-6 w-6 bg-nr-blue rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">How Observify Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Install our lightweight agent and start monitoring in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Install",
                description: "Add our lightweight agent to your applications with minimal configuration required"
              },
              {
                step: "2",
                title: "Monitor",
                description: "Automatically collect metrics, logs, and traces from your entire stack"
              },
              {
                step: "3",
                title: "Optimize",
                description: "Get actionable insights and recommendations to improve performance"
              }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="h-16 w-16 rounded-full bg-nr-blue text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                description: "For small teams and startups",
                features: ["5 monitored services", "7-day data retention", "Basic alerting", "Email support"]
              },
              {
                name: "Professional",
                price: "$99",
                description: "For growing businesses",
                popular: true,
                features: ["25 monitored services", "14-day data retention", "Advanced alerting", "Priority email support", "Custom dashboards", "Synthetic monitoring"]
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: ["Unlimited services", "30-day data retention", "SLA guarantees", "Dedicated support", "Custom integrations", "On-premise deployment option"]
              }
            ].map((plan, i) => (
              <div key={i} className={`bg-white rounded-xl p-8 shadow-sm border ${plan.popular ? 'border-nr-blue ring-2 ring-nr-blue/20' : 'border-gray-100'} relative`}>
                {plan.popular && (
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-nr-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-500 ml-1">/month</span>}
                  </div>
                  <p className="text-gray-500 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-nr-blue shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  className="w-full" 
                  asChild
                >
                  <Link to="/dashboard">
                    {plan.price === "Custom" ? "Contact sales" : "Start free trial"}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-gray-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-nr-navy text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="mb-4 text-white">Ready to get started?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of teams improving their application performance
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-nr-navy hover:bg-gray-100" asChild>
              <Link to="/dashboard">
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              View demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-nr-blue rounded-md"></div>
                <span className="text-xl font-bold text-white">Observify</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-xs">
                Complete observability for modern applications and infrastructure.
              </p>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 Observify. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <a key={i} href="#" className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <div className="h-4 w-4 bg-gray-400 rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
