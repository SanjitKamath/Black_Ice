import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Zap, FileSearch } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <header className="relative z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-primary" />
            <span>BlackIce</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:underline underline-offset-4">
              Resources
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              {/* Animated grid lines */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-[pulse_4s_ease-in-out_infinite]"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-[pulse_4s_ease-in-out_infinite_0.5s]"></div>
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-[pulse_4s_ease-in-out_infinite_1s]"></div>
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-[pulse_4s_ease-in-out_infinite_1.5s]"></div>

              {/* Floating particles */}
              <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary/60 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              <div className="absolute top-3/4 left-1/3 h-1 w-1 rounded-full bg-primary/60 animate-[ping_6s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></div>
              <div className="absolute top-2/4 left-2/3 h-1.5 w-1.5 rounded-full bg-primary/60 animate-[ping_5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
              <div className="absolute top-1/3 left-3/4 h-1 w-1 rounded-full bg-primary/60 animate-[ping_4.5s_cubic-bezier(0,0,0.2,1)_infinite_1.5s]"></div>

              {/* Scanning line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent translate-y-full animate-[moveVertical_8s_ease-in-out_infinite]"></div>
            </div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            {/* Educational Purpose and Research Applications moved to top */}
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 mb-12 md:grid-cols-2">
              <div className="rounded-lg border bg-background/60 backdrop-blur-sm p-6 shadow-sm">
                <h3 className="text-xl font-bold">Educational Purpose</h3>
                <p className="mt-2 text-muted-foreground">
                  This tool is designed to help understand the concepts behind adversarial machine learning. It
                  demonstrates how small, carefully crafted perturbations can affect model predictions.
                </p>
              </div>
              <div className="rounded-lg border bg-background/60 backdrop-blur-sm p-6 shadow-sm">
                <h3 className="text-xl font-bold">Research Applications</h3>
                <p className="mt-2 text-muted-foreground">
                  Understanding adversarial examples is crucial for developing more robust AI systems. This project
                  helps visualize attack vectors and defense mechanisms used in research.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What are Adversarial Attacks?</h2>
              <p className="text-muted-foreground md:text-xl">
                Adversarial attacks are subtle modifications to inputs that cause machine learning models to make
                mistakes. These attacks expose vulnerabilities in AI systems and help researchers build more robust
                models.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  BlackIce - ML based project defending Adversarial Attacks
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Understand, visualize, and learn about adversarial attacks and defenses in machine learning
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <FileSearch className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Classify File</h3>
                <p className="text-center text-muted-foreground">
                  Upload any file to analyze for adversarial perturbations
                </p>
                <Button className="mt-auto" asChild>
                  <Link href="/classify">Try Classification</Link>
                </Button>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Visualize Attacks</h3>
                <p className="text-center text-muted-foreground">
                  See how adversarial examples are created and how they affect model predictions
                </p>
                <Button className="mt-auto" asChild>
                  <Link href="/visualize">Explore Attacks</Link>
                </Button>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Defense Techniques</h3>
                <p className="text-center text-muted-foreground">
                  Learn about and test different defense strategies against adversarial attacks
                </p>
                <Button className="mt-auto" asChild>
                  <Link href="/defend">Explore Defenses</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background/80 backdrop-blur-sm relative z-10">
        <div className="container flex flex-col gap-2 py-6 px-4 md:flex-row md:items-center md:px-6">
          <p className="text-xs text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} BlackIce. Educational purposes only.
          </p>
          <nav className="flex gap-4 md:ml-auto md:gap-6">
            <Link href="/terms" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
