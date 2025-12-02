import { Button } from "@/components/ui/button";
import { MapPin, Database, Satellite, TrendingUp, Mail, Phone, MapPinIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border bg-muted px-4 py-1.5 text-sm">
              <MapPin className="mr-2 h-4 w-4" />
              <span className="font-medium">AI-Powered FRA Atlas & WebGIS DSS</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Forest Rights Act Implementation Monitoring System
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              An integrated Decision Support System for monitoring and managing Forest Rights Act 
              implementation across Madhya Pradesh, Tripura, Odisha, and Telangana
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/help">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Empowering Tribal Communities Through Technology
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Leveraging AI, satellite imagery, and WebGIS to create a comprehensive 
              monitoring and decision support system
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Data Digitization</h3>
              <p className="text-muted-foreground">
                AI-powered extraction and standardization of legacy FRA documents, claims, 
                and patta records for centralized access
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">FRA Atlas</h3>
              <p className="text-muted-foreground">
                Interactive WebGIS platform visualizing IFR, CR, and CFR areas with 
                real-time tracking of implementation progress
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Satellite className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Asset Mapping</h3>
              <p className="text-muted-foreground">
                Computer vision-based detection of agricultural land, water bodies, 
                forest cover, and infrastructure using satellite imagery
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Decision Support</h3>
              <p className="text-muted-foreground">
                AI-enhanced DSS engine linking FRA holders with CSS schemes like 
                PM-KISAN, Jal Jeevan Mission, and MGNREGA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
              About the Project
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg">
                The <strong className="text-foreground">Forest Rights Act (FRA), 2006</strong> recognizes 
                the rights of forest-dwelling communities over land and forest resources. However, 
                significant challenges persist in implementation and monitoring.
              </p>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-xl font-semibold text-foreground">Key Challenges Addressed</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span>Scattered and non-digitized legacy records of IFR, CR, and CFR claims</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span>Lack of centralized, real-time visual repository of FRA claims and titles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span>Missing integration of satellite-based asset mapping with FRA data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span>Absence of Decision Support System for layering CSS benefits</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-xl font-semibold text-foreground">Project Objectives</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span>Digitize and standardize legacy FRA data including shapefiles of patta holders</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span>Create an FRA Atlas showing potential and granted areas using AI and satellite data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span>Integrate WebGIS portal for spatial and socio-economic data visualization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span>Map capital and social assets using Remote Sensing and AI/ML</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span>Build DSS to recommend CSS schemes based on mapped data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
              Who Benefits
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-4">
                <p className="font-medium">Ministry of Tribal Affairs</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="font-medium">District Tribal Welfare Departments</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="font-medium">Forest & Revenue Departments</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="font-medium">Planning & Development Authorities</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="font-medium">NGOs Working with Tribal Communities</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="font-medium">DAJGUA Line Departments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Contact Us for More Information
              </h2>
              <p className="text-lg text-muted-foreground">
                Have questions or need assistance? Reach out to us through any of the following channels
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Email</h3>
                <a 
                  href="mailto:support@fra-atlas.gov.in" 
                  className="text-primary hover:underline"
                >
                  support@fra-atlas.gov.in
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  For general inquiries and support
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Phone</h3>
                <a 
                  href="tel:+911800123456" 
                  className="text-primary hover:underline"
                >
                  1800-123-456
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  Toll-free helpline (Mon-Fri, 9AM-6PM)
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPinIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Office</h3>
                <p className="text-sm">
                  Ministry of Tribal Affairs
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Shastri Bhawan, New Delhi - 110001
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-lg border bg-muted/50 p-6">
              <h3 className="mb-4 text-lg font-semibold">Regional Offices</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="font-medium">Madhya Pradesh</p>
                  <p className="text-sm text-muted-foreground">+91-755-1234567</p>
                </div>
                <div>
                  <p className="font-medium">Tripura</p>
                  <p className="text-sm text-muted-foreground">+91-381-1234567</p>
                </div>
                <div>
                  <p className="font-medium">Odisha</p>
                  <p className="text-sm text-muted-foreground">+91-674-1234567</p>
                </div>
                <div>
                  <p className="font-medium">Telangana</p>
                  <p className="text-sm text-muted-foreground">+91-40-1234567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Access the FRA Atlas and Decision Support System today
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/login">Login to Dashboard</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
