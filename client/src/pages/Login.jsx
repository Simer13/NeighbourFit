/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Mail, Lock } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
     
      console.log("Login attempt:", { email, password })
      navigate("/onboarding")
    } catch (err) {
      console.error("Login error:", err)
    }
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 relative overflow-hidden">
     
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20"
            style={{
              backgroundColor: i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#10B981" : "#8B5CF6",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center space-x-2 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">NeighborFit</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600"
          >
            Sign in to continue your neighborhood search
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </Button>
                </motion.div>
              </form>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    Sign up here
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
