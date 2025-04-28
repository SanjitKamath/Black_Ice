import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Shield, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">About BlackIce</h1>
            <p className="mt-2 text-muted-foreground">
              Learn about the purpose and educational goals of this adversarial machine learning project.
            </p>
          </div>

          <div className="prose prose-gray max-w-none dark:prose-invert">
            <p>
              This web application is designed as an educational tool to help understand the concepts of adversarial
              machine learning. It demonstrates how small, carefully crafted perturbations can affect model predictions
              and explores various defense mechanisms.
            </p>

            <h2>What is Adversarial Machine Learning?</h2>
            <p>
              Adversarial machine learning is a field that studies vulnerabilities of machine learning models to
              adversarial examples - inputs that have been slightly modified to cause the model to make a mistake. These
              modifications are often imperceptible to humans but can completely change a model's prediction.
            </p>

            <h2>Educational Goals</h2>
            <p>This project aims to:</p>
            <ul>
              <li>Illustrate how adversarial examples are created</li>
              <li>Show the impact of adversarial perturbations on model predictions</li>
              <li>Demonstrate various defense techniques and their effectiveness</li>
              <li>Provide a hands-on way to understand these complex concepts</li>
            </ul>

            <h2>Research Context</h2>
            <p>
              Adversarial machine learning is an active area of research in the AI security community. Understanding
              these vulnerabilities is crucial for developing more robust AI systems, especially as they become more
              integrated into critical applications.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="backdrop-blur-sm bg-background/60 shadow-md">
              <CardHeader className="flex flex-row items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>Educational</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  This tool is designed for educational purposes to help understand the concepts behind adversarial
                  machine learning.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-background/60 shadow-md">
              <CardHeader className="flex flex-row items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle>Interactive</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Explore adversarial examples through interactive visualizations that demonstrate how these attacks
                  work.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-background/60 shadow-md">
              <CardHeader className="flex flex-row items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Security Research</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Understanding vulnerabilities is the first step toward building more robust and secure AI systems.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-bold">Disclaimer</h2>
            <p className="text-muted-foreground">
              This application is intended for educational and research purposes only. The techniques presented are used
              in adversarial machine learning research. In a real-world scenario, both attacks and defenses would be
              more sophisticated.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
