import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 relative">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="container max-w-4xl py-12 relative z-10">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
            <p className="mt-2 text-muted-foreground">
              Explore these resources to learn more about adversarial machine learning.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="backdrop-blur-sm bg-background/60 shadow-md">
              <CardHeader>
                <CardTitle>Research Papers</CardTitle>
                <CardDescription>Foundational academic papers on adversarial machine learning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">
                    Adversarial Attacks on Artificial Intelligence Systems: A Comprehensive Survey of Methods, Impacts,
                    and Defences
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A thorough analysis of adversarial attack methods, their effects on AI in various applications, and
                    the state of defense tactics.
                  </p>
                  <a
                    href="/paper.pdf"
                    download="Adversarial_Attacks_Survey.pdf"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Download Paper <Download className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-background/60 shadow-md">
              <CardHeader>
                <CardTitle>Tutorials & Courses</CardTitle>
                <CardDescription>Educational resources to learn about adversarial machine learning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Adversarial Machine Learning Tutorial</h3>
                  <p className="text-sm text-muted-foreground">
                    A comprehensive tutorial on adversarial attacks and defenses
                  </p>
                  <Link
                    href="https://adversarial-ml-tutorial.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Visit Website <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-medium">CS 329S: Machine Learning Safety</h3>
                  <p className="text-sm text-muted-foreground">
                    Stanford course covering adversarial robustness and ML safety
                  </p>
                  <Link
                    href="https://stanford-cs329s.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Course Materials <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-medium">CleverHans Library</h3>
                  <p className="text-sm text-muted-foreground">
                    A Python library to benchmark machine learning systems' vulnerability to adversarial examples
                  </p>
                  <Link
                    href="https://github.com/cleverhans-lab/cleverhans"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    GitHub Repository <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
