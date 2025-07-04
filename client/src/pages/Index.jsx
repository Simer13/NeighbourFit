/* eslint-disable no-unused-vars */
"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial, Environment } from "@react-three/drei"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  MapPin,
  Users,
  TrendingUp,
  Search,
  Heart,
  MessageCircle,
  ArrowRight,
  Shield,
  DollarSign,
  Car,
} from "lucide-react"

function FloatingHouses() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.08
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <Sphere args={[0.8, 64, 64]} position={[-2, 0, 0]}>
          <MeshDistortMaterial color="#3B82F6" attach="material" distort={0.2} speed={1.5} roughness={0.1} />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.5}>
        <Sphere args={[0.5, 64, 64]} position={[2, 1, -1]}>
          <MeshDistortMaterial color="#10B981" attach="material" distort={0.25} speed={1.2} roughness={0.1} />
        </Sphere>
      </Float>

      <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[0.3, 64, 64]} position={[0, -1, 1]}>
          <MeshDistortMaterial color="#8B5CF6" attach="material" distort={0.15} speed={2} roughness={0.1} />
        </Sphere>
      </Float>
    </group>
  )
}

function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef()
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime = null
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

function InteractiveCard({ children, className = "", delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.03,
        y: -8,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`transform-gpu ${className}`}
    >
      <div className="relative overflow-hidden">
        {children}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-green-400/10 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}


const sampleNeighborhoods = [
  {
    id: 1,
    name: "Green Valley",
    matchScore: 95,
    averageRent: 2500,
    safetyScore: 9,
    commuteTime: 25,
    lifestyle: "Family-friendly",
    amenities: ["Parks", "Schools", "Shopping"],
    likes: 234,
    description: "Perfect blend of suburban comfort and urban convenience",
  },
  {
    id: 2,
    name: "Tech District",
    matchScore: 88,
    averageRent: 3200,
    safetyScore: 8,
    commuteTime: 15,
    lifestyle: "Urban",
    amenities: ["Cafes", "Coworking", "Transit"],
    likes: 189,
    description: "Vibrant tech hub with modern amenities and nightlife",
  },
  {
    id: 3,
    name: "Riverside Commons",
    matchScore: 82,
    averageRent: 2800,
    safetyScore: 9,
    commuteTime: 30,
    lifestyle: "Peaceful",
    amenities: ["River", "Trails", "Gym"],
    likes: 156,
    description: "Serene waterfront living with outdoor recreation",
  },
]

export default function Index() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])

  const getMatchColor = (score) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 80) return "bg-blue-500"
    if (score >= 70) return "bg-yellow-500"
    return "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
     
      <div className="fixed inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.6} />
          <FloatingHouses />
          <Environment preset="city" />
        </Canvas>
      </div>

    
      <div className="fixed inset-0 z-10">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{
              backgroundColor: i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#10B981" : "#8B5CF6",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

    
      <div className="relative z-20">
       
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-xl border-b border-blue-100 sticky top-0 z-50 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">NeighborFit</span>
              </motion.div>
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Sign In
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg"
                    onClick={() => (window.location.href = "/Signup")}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.section style={{ y, opacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight"
            >
              Find Your Perfect
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent block mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Neighborhood Match
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Answer a few questions about your lifestyle, budget, and preferences. Our matching algorithm
              will connect you with neighborhoods where you'll truly thrive.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg shadow-lg group"
                  onClick={() => (window.location.href = "/Signup")}
                >
                  Start Matching Process
                  <motion.div className="ml-2" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg bg-white/80 backdrop-blur-sm"
                  onClick={() => (window.location.href = "/explore")}
                >
                  Explore Sample Results
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter end={50000} />+
                </div>
                <div className="text-gray-600 font-medium">Successful Matches</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter end={1200} />+
                </div>
                <div className="text-gray-600 font-medium">Neighborhoods Analyzed</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter end={98} />%
                </div>
                <div className="text-gray-600 font-medium">User Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">How NeighborFit Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to find your perfect neighborhood match
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "01",
                title: "Tell Us About You",
                desc: "Complete our comprehensive onboarding questionnaire about your lifestyle, budget, work schedule, and preferences.",
                icon: Users,
                color: "blue",
              },
              {
                step: "02",
                title: "AI Matching",
                desc: "Our intelligent algorithm analyzes thousands of data points to find neighborhoods that perfectly match your criteria.",
                icon: Search,
                color: "green",
              },
              {
                step: "03",
                title: "Explore & Decide",
                desc: "Browse your personalized matches, save favorites, and explore detailed insights about each neighborhood.",
                icon: Heart,
                color: "purple",
              },
            ].map((item, index) => (
              <InteractiveCard key={index} delay={index * 0.2}>
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full text-center">
                  <CardHeader className="p-8">
                    <div
                      className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm`}
                    >
                      <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                    </div>
                    <div className={`text-4xl font-bold text-${item.color}-600 mb-4`}>{item.step}</div>
                    <CardTitle className="text-xl text-gray-900 mb-4 font-semibold">{item.title}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </InteractiveCard>
            ))}
          </div>
        </section>

        {/* Sample Results Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">See What You'll Get</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Preview of personalized neighborhood matches with detailed insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleNeighborhoods.map((neighborhood, index) => (
              <InteractiveCard key={neighborhood.id} delay={index * 0.1}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="text-xl mb-1">{neighborhood.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getMatchColor(neighborhood.matchScore)}`} />
                          <span className="text-sm font-medium text-gray-600">{neighborhood.matchScore}% Match</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="p-2 hover:bg-red-50">
                        <Heart className="h-5 w-5 text-gray-400" />
                      </Button>
                    </div>
                    <CardDescription className="text-sm">{neighborhood.description}</CardDescription>
                  </CardHeader>
                  <div className="px-6 pb-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span>₹{neighborhood.averageRent}/mo</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span>{neighborhood.safetyScore}/10 Safety</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-orange-600" />
                        <span>{neighborhood.commuteTime} min commute</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span>{neighborhood.lifestyle}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Nearby Amenities:</p>
                      <div className="flex flex-wrap gap-1">
                        {neighborhood.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-500">{neighborhood.likes} people like this</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </InteractiveCard>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg shadow-lg"
              onClick={() => (window.location.href = "/signup")}
            >
              Get Your Personalized Matches
            </Button>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">Why Choose NeighborFit?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced features that make neighborhood hunting effortless and accurate
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Smart AI Matching",
                desc: "Our advanced algorithm considers 50+ factors including lifestyle, budget, commute, and personal preferences to find your perfect match.",
                color: "blue",
                delay: 0,
              },
              {
                icon: TrendingUp,
                title: "Comprehensive Data",
                desc: "Access detailed insights on safety scores, average rent, commute times, local amenities, and community feedback.",
                color: "green",
                delay: 0.1,
              },
              {
                icon: Users,
                title: "Real Community Insights",
                desc: "Read authentic reviews from current residents and get insider knowledge about neighborhood culture and lifestyle.",
                color: "purple",
                delay: 0.2,
              },
              {
                icon: Heart,
                title: "Save & Compare",
                desc: "Create your favorites list and compare neighborhoods side-by-side with detailed metrics and visual comparisons.",
                color: "red",
                delay: 0.3,
              },
              {
                icon: MapPin,
                title: "Interactive Maps",
                desc: "Explore neighborhoods with integrated maps showing nearby schools, hospitals, shopping centers, and transportation hubs.",
                color: "teal",
                delay: 0.4,
              },
              {
                icon: MessageCircle,
                title: "Personalized Recommendations",
                desc: "Get tailored suggestions based on your evolving preferences and feedback from your neighborhood exploration journey.",
                color: "orange",
                delay: 0.5,
              },
            ].map((feature, index) => (
              <InteractiveCard key={index} delay={feature.delay}>
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
                  <CardHeader className="p-8">
                    <motion.div
                      className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6 shadow-sm`}
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className={`h-7 w-7 text-${feature.color}-600`} />
                    </motion.div>
                    <CardTitle className="text-xl text-gray-900 mb-3 font-semibold">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </InteractiveCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 py-24 mx-4 rounded-3xl shadow-2xl"
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Ready to Find Your Perfect Neighborhood?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of people who have found their ideal home with NeighborFit's intelligent matching platform.
              Start your journey today and discover where you truly belong.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg"
                  onClick={() => (window.location.href = "/signup")}
                >
                  Start Your Journey Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg backdrop-blur-sm bg-transparent"
                  onClick={() => (window.location.href = "/explore")}
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex items-center justify-center space-x-3 mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center shadow-lg">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">NeighborFit</span>
            </motion.div>
            <div className="text-center text-gray-400">
              <p>&copy; 2024 NeighborFit. All rights reserved.</p>
              <p className="mt-2">Find your perfect neighborhood match with AI-powered intelligence.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
