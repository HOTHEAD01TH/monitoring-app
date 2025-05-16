
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-emerald-500 rounded-md"></div>
            <span className="text-lg font-semibold">Observify</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/docs" className="text-sm font-medium hover:underline">
              Documentation
            </Link>
            <a href="#features" className="text-sm font-medium hover:underline">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium hover:underline">
              Pricing
            </a>
            <a href="#about" className="text-sm font-medium hover:underline">
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
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tighter">
              Complete Observability for Modern Applications
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Monitor, troubleshoot, and optimize your entire stack with a single platform
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/signup">
              <Button size="lg">Start for free</Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" size="lg">
                Documentation
              </Button>
            </Link>
          </div>
          <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border bg-background shadow-xl max-w-4xl">
            <img 
              src="https://lovable.dev/opengraph-image-p98pqg.png" 
              alt="Observify Dashboard Preview" 
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="border-t border-b py-12 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground mb-6">TRUSTED BY LEADING COMPANIES</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['Amazon', 'Microsoft', 'Google', 'Netflix', 'Airbnb', 'Slack'].map((company) => (
              <div key={company} className="text-2xl font-semibold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Complete Observability Platform</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Everything you need to monitor and optimize your applications
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-primary"></div>
              </div>
              <h3 className="text-xl font-bold">Application Performance</h3>
              <p className="mt-2 text-muted-foreground">
                Monitor response times, throughput, and error rates across your services.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-primary"></div>
              </div>
              <h3 className="text-xl font-bold">Real-User Monitoring</h3>
              <p className="mt-2 text-muted-foreground">
                Track page load times, interactions, and errors from real user sessions.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-primary"></div>
              </div>
              <h3 className="text-xl font-bold">Synthetic Monitoring</h3>
              <p className="mt-2 text-muted-foreground">
                Proactively test your applications with scheduled checks from global locations.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-primary"></div>
              </div>
              <h3 className="text-xl font-bold">Centralized Logging</h3>
              <p className="mt-2 text-muted-foreground">
                Aggregate logs from all your services for easy searching and analysis.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-primary"></div>
              </div>
              <h3 className="text-xl font-bold">AI-Powered Alerts</h3>
              <p className="mt-2 text-muted-foreground">
                Get intelligent notifications with automatic anomaly detection.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-primary"></div>
              </div>
              <h3 className="text-xl font-bold">Custom Dashboards</h3>
              <p className="mt-2 text-muted-foreground">
                Build personalized views for tracking metrics that matter to your team.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/docs">
              <Button variant="outline">Learn more about our features</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Plans that scale with your monitoring needs
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-4">
            {/* Basic Plan */}
            <div className="rounded-lg border bg-card p-8 shadow-sm">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Basic</h3>
                <p className="text-muted-foreground mt-1">For small applications and services</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  5 websites/applications
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  3 team members
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  24 hour data retention
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Basic alerts
                </li>
              </ul>
              <Link to="/signup">
                <Button className="w-full" variant="outline">Start for free</Button>
              </Link>
            </div>
            
            {/* Professional Plan */}
            <div className="rounded-lg border bg-card p-8 shadow-sm relative">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-primary py-1 text-center text-xs font-bold uppercase text-primary-foreground">
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
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  20 websites/applications
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  10 team members
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  7 day data retention
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Advanced alerts with AI detection
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Custom dashboards
                </li>
              </ul>
              <Link to="/signup">
                <Button className="w-full">Get started</Button>
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="rounded-lg border bg-card p-8 shadow-sm">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <p className="text-muted-foreground mt-1">For large-scale operations</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Unlimited websites/applications
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Unlimited team members
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  30 day data retention
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  24/7 premium support
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Custom integrations
                </li>
              </ul>
              <Link to="/signup">
                <Button className="w-full" variant="outline">Contact sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-emerald-500 rounded-md"></div>
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
