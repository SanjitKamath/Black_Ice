"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function DefendPage() {
  const [selectedDefense, setSelectedDefense] = useState("adversarial")
  const [isDefenseActive, setIsDefenseActive] = useState(false)

  const toggleDefense = () => {
    setIsDefenseActive(!isDefenseActive)
  }

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

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Defense Techniques</h1>
            <p className="mt-2 text-muted-foreground">
              Explore different methods to defend machine learning models against adversarial attacks.
            </p>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Educational Demonstration</AlertTitle>
            <AlertDescription>
              This page demonstrates common defense strategies used to make machine learning models more robust against
              adversarial attacks.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="adversarial" onValueChange={setSelectedDefense}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="adversarial">Adversarial Training</TabsTrigger>
              <TabsTrigger value="randomization">Input Randomization</TabsTrigger>
              <TabsTrigger value="detection">Attack Detection</TabsTrigger>
            </TabsList>

            <TabsContent value="adversarial" className="mt-4">
              <Card className="backdrop-blur-sm bg-background/60 shadow-md">
                <CardHeader>
                  <CardTitle>Adversarial Training</CardTitle>
                  <CardDescription>Training models on adversarial examples to make them more robust</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="text-center font-medium">Adversarial Example</div>
                      <div className="relative h-[250px] w-full">
                        <Image
                          src="/placeholder.svg?height=250&width=250&text=Adversarial+Example"
                          alt="Adversarial example"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="text-center text-sm">
                        Standard model prediction:{" "}
                        <span className="font-medium text-red-500">Dog (67% confidence)</span>
                      </div>
                      <div className="text-center text-sm">
                        Robust model prediction:{" "}
                        <span className="font-medium text-green-500">Cat (89% confidence)</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="mb-2 font-medium">How It Works</h3>
                        <p className="text-sm text-muted-foreground">
                          Adversarial training incorporates adversarial examples into the training process. By exposing
                          the model to these examples during training, it learns to be robust against similar attacks.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Standard Model Robustness</span>
                            <span className="text-sm">25%</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>

                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Adversarially Trained Model</span>
                            <span className="text-sm">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                      </div>

                      <Button onClick={toggleDefense}>
                        {isDefenseActive ? "Deactivate Defense" : "Activate Defense"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 text-sm">
                  <p>
                    <strong>Advantages:</strong> Directly improves model robustness against known attack types.
                  </p>
                  <p>
                    <strong>Limitations:</strong> May reduce accuracy on clean examples, and doesn't protect against all
                    attack types.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="randomization" className="mt-4">
              <Card className="backdrop-blur-sm bg-background/60 shadow-md">
                <CardHeader>
                  <CardTitle>Input Randomization</CardTitle>
                  <CardDescription>
                    Adding random noise or transformations to inputs to disrupt adversarial perturbations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-12 text-muted-foreground">
                    Select this defense to see a demonstration of input randomization techniques
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="detection" className="mt-4">
              <Card className="backdrop-blur-sm bg-background/60 shadow-md">
                <CardHeader>
                  <CardTitle>Attack Detection</CardTitle>
                  <CardDescription>
                    Using auxiliary models to detect when an input has been adversarially modified
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-12 text-muted-foreground">
                    Select this defense to see a demonstration of adversarial example detection
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
