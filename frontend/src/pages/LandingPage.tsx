
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-emerald-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <span className="text-lg font-semibold">Observify</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/docs" className="text-sm font-medium hover:underline underline-offset-4 transition-all">
              Documentation
            </Link>
            <a href="#features" className="text-sm font-medium hover:underline underline-offset-4 transition-all">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium hover:underline underline-offset-4 transition-all">
              Pricing
            </a>
            <a href="#about" className="text-sm font-medium hover:underline underline-offset-4 transition-all">
              About
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to="/signup" className="hidden sm:block">
              <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16 md:py-28 lg:py-36 bg-background">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 mb-4 text-sm">
            <span className="bg-emerald-500 rounded-full w-2 h-2 mr-2"></span>
            <span className="text-sm font-medium">New Feature: Website Uptime Monitoring</span>
          </div>
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
              Complete Observability for Modern Applications
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Monitor, troubleshoot, and optimize your entire stack with a single platform. 
              Get real-time insights across all your applications and services.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg transition-all">
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" size="lg">
                Documentation
              </Button>
            </Link>
          </div>
          <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border shadow-xl max-w-4xl mt-12 bg-gradient-to-b from-emerald-500/5 to-transparent p-1">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl"></div>
            <img 
              src="https://lovable.dev/opengraph-image-p98pqg.png" 
              alt="Observify Dashboard Preview" 
              className="w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="border-t border-b py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider font-medium">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Amazon', 'Microsoft', 'Google', 'Netflix', 'Airbnb', 'Slack'].map((company) => (
              <div key={company} className="text-2xl font-semibold text-muted-foreground hover:text-foreground transition-colors">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Observability Platform</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to monitor and optimize your applications, all in one place.
              Get actionable insights and improve performance across your entire stack.
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature cards with improved design */}
            <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-emerald-500"></div>
              </div>
              <h3 className="text-xl font-bold">Application Performance</h3>
              <p className="mt-2 text-muted-foreground">
                Monitor response times, throughput, and error rates across your services.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Distributed tracing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Service dependencies</span>
                </li>
              </ul>
            </div>
            
            <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-emerald-500"></div>
              </div>
              <h3 className="text-xl font-bold">Real-User Monitoring</h3>
              <p className="mt-2 text-muted-foreground">
                Track page load times, interactions, and errors from real user sessions.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Page load performance</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">User journey analysis</span>
                </li>
              </ul>
            </div>
            
            <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-emerald-500"></div>
              </div>
              <h3 className="text-xl font-bold">Synthetic Monitoring</h3>
              <p className="mt-2 text-muted-foreground">
                Proactively test your applications with scheduled checks from global locations.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">API reliability testing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Global performance checks</span>
                </li>
              </ul>
            </div>
            
            <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-emerald-500"></div>
              </div>
              <h3 className="text-xl font-bold">Centralized Logging</h3>
              <p className="mt-2 text-muted-foreground">
                Aggregate logs from all your services for easy searching and analysis.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Advanced log searching</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Pattern detection</span>
                </li>
              </ul>
            </div>
            
            <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-emerald-500"></div>
              </div>
              <h3 className="text-xl font-bold">AI-Powered Alerts</h3>
              <p className="mt-2 text-muted-foreground">
                Get intelligent notifications with automatic anomaly detection.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Smart alert thresholds</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Anomaly detection</span>
                </li>
              </ul>
            </div>
            
            <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-emerald-500"></div>
              </div>
              <h3 className="text-xl font-bold">Custom Dashboards</h3>
              <p className="mt-2 text-muted-foreground">
                Build personalized views for tracking metrics that matter to your team.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Drag-and-drop editor</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Shareable dashboards</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/docs">
              <Button variant="outline" size="lg" className="group">
                Learn more about our features 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Plans that scale with your monitoring needs. No hidden fees, no surprises.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="rounded-xl border bg-card p-8 shadow-sm hover:shadow-md transition-all">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Basic</h3>
                <p className="text-muted-foreground mt-1">For small applications and services</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mb-6 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>5 websites/applications</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>3 team members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>24 hour data retention</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>Basic alerts</span>
                </li>
              </ul>
              <Link to="/signup">
                <Button className="w-full" variant="outline">Start for free</Button>
              </Link>
            </div>
            
            {/* Professional Plan */}
            <div className="rounded-xl border bg-card p-8 shadow-lg relative">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-emerald-500 py-1 text-center text-xs font-bold uppercase text-primary-foreground">
                Most Popular
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold">Professional</h3>
                <p className="text-muted-foreground mt-1">For growing businesses</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mb-6 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>20 websites/applications</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>10 team members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>7 day data retention</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>Advanced alerts with AI detection</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>Custom dashboards</span>
                </li>
              </ul>
              <Link to="/signup">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Get started</Button>
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="rounded-xl border bg-card p-8 shadow-sm hover:shadow-md transition-all">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <p className="text-muted-foreground mt-1">For large-scale operations</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="mb-6 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>Unlimited websites/applications</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>30 day data retention</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>24/7 premium support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Link to="/signup">
                <Button className="w-full" variant="outline">Contact sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">
              Trusted by developers and teams around the world
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <p className="italic text-muted-foreground mb-4">
                "Observify has completely transformed how we monitor our services. We can now identify and resolve issues before they impact our users."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="font-semibold text-emerald-700">JD</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">CTO at TechCorp</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <p className="italic text-muted-foreground mb-4">
                "The website monitoring feature saved us countless hours of debugging. We now know exactly when our site is experiencing issues."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="font-semibold text-emerald-700">AS</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Alice Smith</p>
                  <p className="text-sm text-muted-foreground">Developer at WebFlow</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <p className="italic text-muted-foreground mb-4">
                "Observify's intuitive dashboards make it easy for our team to monitor performance metrics and respond quickly to incidents."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="font-semibold text-emerald-700">RJ</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Robert Johnson</p>
                  <p className="text-sm text-muted-foreground">DevOps Lead at CloudSys</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-500">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers and teams who trust Observify for their monitoring needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary">
                Start for free
              </Button>
            </Link>
            <Link to="/docs">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Learn more
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-emerald-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xs">O</span>
                </div>
                <span className="font-semibold">Observify</span>
              </div>
              <p className="mt-4 text-muted-foreground">
                Making application monitoring accessible and actionable for teams of all sizes.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
                </li>
                <li>
                  <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
                </li>
                <li>
                  <Link to="/docs" className="text-muted-foreground hover:text-foreground">Documentation</Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-foreground">About</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Blog</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Careers</a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Observify. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">GitHub</span>
                GitHub
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">LinkedIn</span>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
