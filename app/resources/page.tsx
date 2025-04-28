import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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
                  <h3 className="font-medium">Intriguing properties of neural networks</h3>
                  <p className="text-sm text-muted-foreground">
                    Szegedy et al. (2014) - One of the first papers to identify the existence of adversarial examples
                  </p>
                  <Link
                    href="https://arxiv.org/abs/1312.6199"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Read Paper <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-medium">Explaining and Harnessing Adversarial Examples</h3>
                  <p className="text-sm text-muted-foreground">
                    Goodfellow et al. (2015) - Introduces the Fast Gradient Sign Method (FGSM)
                  </p>
                  <Link
                    href="https://arxiv.org/abs/1412.6572"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Read Paper <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-medium">Towards Deep Learning Models Resistant to Adversarial Attacks</h3>
                  <p className="text-sm text-muted-foreground">
                    Madry et al. (2018) - Introduces the PGD attack and adversarial training
                  </p>
                  <Link
                    href="https://arxiv.org/abs/1706.06083"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Read Paper <ExternalLink className="h-3 w-3" />
                  </Link>
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

          <Card className="backdrop-blur-sm bg-background/60 shadow-md">
            <CardHeader>
              <CardTitle>Open Source Tools</CardTitle>
              <CardDescription>
                Libraries and frameworks for experimenting with adversarial machine learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-medium">Adversarial Robustness Toolbox (ART)</h3>
                  <p className="text-sm text-muted-foreground">
                    A Python library for machine learning security developed by IBM
                  </p>
                  <Link
                    href="https://github.com/Trusted-AI/adversarial-robustness-toolbox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    GitHub Repository <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-medium">Foolbox</h3>
                  <p className="text-sm text-muted-foreground">
                    A Python toolbox to create adversarial examples that fool neural networks
                  </p>
                  <Link
                    href="https://github.com/bethgelab/foolbox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    GitHub Repository <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-medium">RobustBench</h3>
                  <p className="text-sm text-muted-foreground">A standardized benchmark for adversarial robustness</p>
                  <Link
                    href="https://github.com/RobustBench/robustbench"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    GitHub Repository <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                These tools are provided for educational and research purposes. Always use them responsibly and
                ethically.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
