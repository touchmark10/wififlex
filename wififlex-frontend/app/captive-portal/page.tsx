"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wifi, Clock, Users, Smartphone, CreditCard, CheckCircle, AlertCircle, Play, Volume2, X } from 'lucide-react'
import Image from "next/image"

interface WiFiPackage {
  id: string
  name: string
  duration: string
  price: number
  description: string
  popular?: boolean
}

export default function CaptivePortal() {
  const [selectedPackage, setSelectedPackage] = useState<WiFiPackage | null>(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [paymentData, setPaymentData] = useState({
    phoneNumber: '',
    provider: ''
  })
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)

  const wifiPackages: WiFiPackage[] = [
    {
      id: "1hour",
      name: "Quick Browse",
      duration: "1 Hour",
      price: 500,
      description: "Perfect for quick tasks"
    },
    {
      id: "3hours",
      name: "Extended Session",
      duration: "3 Hours", 
      price: 1000,
      description: "Great for work or study",
      popular: true
    },
    {
      id: "6hours",
      name: "Half Day",
      duration: "6 Hours",
      price: 1500,
      description: "Ideal for long meetings"
    },
    {
      id: "1day",
      name: "Full Day",
      duration: "24 Hours",
      price: 2000,
      description: "Complete day access"
    },
    {
      id: "3days",
      name: "Weekend Pass",
      duration: "3 Days",
      price: 5000,
      description: "Perfect for events"
    },
    {
      id: "1week",
      name: "Weekly Access",
      duration: "7 Days",
      price: 10000,
      description: "Best value for extended stay"
    }
  ]

  const ads = [
    {
      id: 1,
      type: 'banner',
      title: 'Tech Hub Cafe - Premium Coffee & Fast WiFi',
      image: '/tech-hub-banner.png',
      url: 'https://techhub.com'
    },
    {
      id: 2,
      type: 'mobile',
      title: 'Special WiFi Deal - 50% Off Today!',
      image: '/wifi-deal-mobile-banner.png',
      url: 'https://wifideals.com'
    },
    {
      id: 3,
      type: 'video',
      title: 'Local Restaurant - Fresh Meals Daily',
      thumbnail: '/restaurant-video-thumbnail.png',
      videoUrl: 'https://example.com/restaurant-video.mp4',
      url: 'https://restaurant.com'
    }
  ]

  // Rotate ads every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [ads.length])

  const handlePackageSelect = (pkg: WiFiPackage) => {
    setSelectedPackage(pkg)
    setIsPaymentDialogOpen(true)
    setPaymentStatus('idle')
    setPaymentData({ phoneNumber: '', provider: '' })
  }

  const handlePaymentSubmit = async () => {
    if (!paymentData.phoneNumber || !paymentData.provider || !selectedPackage) {
      return
    }

    setIsProcessingPayment(true)
    setPaymentStatus('processing')

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate payment success
      setPaymentStatus('success')
      
      // Auto-close dialog after success
      setTimeout(() => {
        setIsPaymentDialogOpen(false)
        setPaymentStatus('idle')
        // Here you would typically redirect to WiFi connection
        console.log('Payment successful, connecting to WiFi...')
      }, 2000)
      
    } catch (error) {
      setPaymentStatus('error')
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const validatePhoneNumber = (phone: string) => {
    const ugandaPhoneRegex = /^(\+256|0)(7[0-9]{8}|3[0-9]{8})$/
    return ugandaPhoneRegex.test(phone)
  }

  const handleAdClick = (ad: any) => {
    console.log('Ad clicked:', ad.title)
    // Track ad click
    window.open(ad.url, '_blank')
  }

  const currentAd = ads[currentAdIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Top Banner Ad - Reduced Size */}
      <div className="w-full h-16 bg-white border-b shadow-sm">
        <div className="h-full flex items-center justify-center px-4">
          <div 
            className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleAdClick(currentAd)}
          >
            <Image
              src={currentAd.image || currentAd.thumbnail || '/placeholder-pj1fr.png'}
              alt={currentAd.title}
              width={60}
              height={40}
              className="rounded object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{currentAd.title}</p>
              <p className="text-xs text-gray-500">Sponsored</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Wifi className="h-12 w-12 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome to WiFiFlex</h1>
              <p className="text-gray-600">Coffee Corner Ltd - Premium WiFi Access</p>
            </div>
          </div>
          <Badge variant="outline" className="text-sm">
            High-Speed Internet • Secure Connection • 24/7 Support
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - WiFi Packages */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Choose Your WiFi Package</CardTitle>
                <CardDescription className="text-center">
                  Select the perfect internet package for your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wifiPackages.map((pkg) => (
                    <Card 
                      key={pkg.id} 
                      className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                        pkg.popular ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:border-blue-300'
                      }`}
                      onClick={() => handlePackageSelect(pkg)}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                        </div>
                      )}
                      <CardHeader className="text-center pb-2">
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        <div className="text-3xl font-bold text-blue-600">
                          UGX {pkg.price.toLocaleString()}
                        </div>
                        <div className="flex items-center justify-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {pkg.duration}
                        </div>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                        <Button className="w-full" size="sm">
                          Select Package
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Connection Instructions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  How to Connect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <h3 className="font-medium mb-2">Choose Package</h3>
                    <p className="text-sm text-gray-600">Select your preferred WiFi package above</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <h3 className="font-medium mb-2">Make Payment</h3>
                    <p className="text-sm text-gray-600">Pay securely with MTN MoMo or Airtel Money</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <h3 className="font-medium mb-2">Get Connected</h3>
                    <p className="text-sm text-gray-600">Enjoy high-speed internet access</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Ads Section - Reduced Size */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Mobile Banner Ad - Reduced Size */}
              <Card className="h-32">
                <CardContent className="p-3 h-full">
                  <div 
                    className="h-full flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleAdClick(ads[1])}
                  >
                    <Image
                      src="/wifi-deal-mobile-banner.png"
                      alt="WiFi Deal"
                      width={80}
                      height={60}
                      className="rounded object-cover mr-3"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900 mb-1">Special WiFi Deal</p>
                      <p className="text-xs text-gray-600">50% Off Today Only!</p>
                      <Badge variant="outline" className="text-xs mt-1">Limited Time</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Ad - Reduced Size */}
              <Card className="h-40">
                <CardContent className="p-3 h-full">
                  <div className="relative h-full">
                    <Image
                      src="/restaurant-video-thumbnail.png"
                      alt="Restaurant Video"
                      fill
                      className="rounded object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => handleAdClick(ads[2])}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Watch
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs text-white font-medium">Fresh Meals Daily</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Network Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Network Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Signal Strength</span>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Excellent</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Connected Users</span>
                    <span className="text-xs font-medium">23/50</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Network Speed</span>
                    <span className="text-xs font-medium">100 Mbps</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              {selectedPackage && (
                <>Pay UGX {selectedPackage.price.toLocaleString()} for {selectedPackage.name} ({selectedPackage.duration})</>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {paymentStatus === 'idle' && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Payment Method</Label>
                <Select value={paymentData.provider} onValueChange={(value) => setPaymentData(prev => ({...prev, provider: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                    <SelectItem value="airtel">Airtel Money</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+256 700 123 456"
                  value={paymentData.phoneNumber}
                  onChange={(e) => setPaymentData(prev => ({...prev, phoneNumber: e.target.value}))}
                />
                <p className="text-xs text-gray-500">
                  Enter your {paymentData.provider === 'mtn' ? 'MTN' : 'Airtel'} number
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handlePaymentSubmit}
                  disabled={!paymentData.phoneNumber || !paymentData.provider || !validatePhoneNumber(paymentData.phoneNumber)}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Now
                </Button>
              </div>
            </div>
          )}

          {paymentStatus === 'processing' && (
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg font-medium">Processing Payment...</p>
              <p className="text-sm text-gray-600">Please check your phone for the payment prompt</p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="py-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <p className="text-lg font-medium text-green-600">Payment Successful!</p>
              <p className="text-sm text-gray-600">Connecting you to WiFi...</p>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="py-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <p className="text-lg font-medium text-red-600">Payment Failed</p>
              <p className="text-sm text-gray-600">Please try again or contact support</p>
              <Button 
                className="mt-4" 
                onClick={() => setPaymentStatus('idle')}
              >
                Try Again
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
