"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Users, Wifi, DollarSign, Settings, BarChart3, Menu, Bell, User, Edit, QrCode, Upload, Router, FileText, HelpCircle, LogOut, Globe, Activity, AlertTriangle, CheckCircle, WifiOff, Signal, Eye, Play, Image, Video, Smartphone, CreditCard } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [paymentDialog, setPaymentDialog] = useState(false)
  const [uploadDialog, setUploadDialog] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [paymentProvider, setPaymentProvider] = useState('')
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [adTitle, setAdTitle] = useState('')
  const [adDescription, setAdDescription] = useState('')
  const pathname = usePathname()

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { name: "Vouchers", icon: QrCode, href: "/dashboard/vouchers" },
    { name: "Ads", icon: Upload, href: "/dashboard/ads" },
    { name: "Routers", icon: Router, href: "/dashboard/routers" },
    { name: "Portal", icon: Globe, href: "/dashboard/portal" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Support", icon: HelpCircle, href: "/dashboard/support" }
  ]

  const adSlots = [
    {
      id: 1,
      name: "Top Banner",
      size: "728x90",
      location: "Above WiFi packages",
      price: 5000,
      duration: "24 hours",
      status: "available",
      type: "image"
    },
    {
      id: 2,
      name: "Sidebar Right",
      size: "300x250",
      location: "Right side panel",
      price: 3000,
      duration: "24 hours",
      status: "purchased",
      type: "image",
      uploadStatus: "pending"
    },
    {
      id: 3,
      name: "Mobile Banner",
      size: "320x50",
      location: "Mobile top banner",
      price: 2000,
      duration: "24 hours",
      status: "active",
      type: "image",
      views: 1250,
      clicks: 45
    },
    {
      id: 4,
      name: "Video Spot",
      size: "400x300",
      location: "Video section",
      price: 8000,
      duration: "24 hours",
      status: "available",
      type: "video"
    }
  ]

  const handleLogout = () => {
    console.log("Logging out...")
  }

  const handleSlotPurchase = (slot: any) => {
    setSelectedSlot(slot)
    setPaymentDialog(true)
  }

  const handlePayment = async () => {
    if (!phoneNumber || !paymentProvider) return
    
    setPaymentProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setPaymentProcessing(false)
    setPaymentDialog(false)
    setUploadDialog(true)
    
    // Reset form
    setPhoneNumber('')
    setPaymentProvider('')
  }

  const handleUpload = () => {
    if (!uploadFile || !adTitle) return
    
    console.log('Uploading ad:', {
      slot: selectedSlot,
      file: uploadFile,
      title: adTitle,
      description: adDescription
    })
    
    setUploadDialog(false)
    setSelectedSlot(null)
    setUploadFile(null)
    setAdTitle('')
    setAdDescription('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'purchased': return 'bg-yellow-100 text-yellow-800'
      case 'active': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Wifi className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900">Business</span>
          </div>
          <h1 className="text-lg font-semibold">Ad Management</h1>
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="py-4">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant={pathname === item.href ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Wifi className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">WiFiFlex</span>
            </div>
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigationItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={pathname === item.href ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-white shadow-sm border-b sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-900">Ad Management</h1>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Ad Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Ad Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Ads</p>
                      <p className="text-2xl font-bold text-blue-600">1</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-green-600">1,250</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                      <p className="text-2xl font-bold text-purple-600">45</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ad Spend</p>
                      <p className="text-2xl font-bold text-orange-600">UGX 5,000</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available Ad Slots */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Available Ad Slots
                </CardTitle>
                <CardDescription>
                  Purchase ad slots and upload your content to reach WiFi users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {adSlots.map((slot) => (
                    <div key={slot.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {slot.type === 'video' ? (
                            <Video className="h-8 w-8 text-purple-600" />
                          ) : (
                            <Image className="h-8 w-8 text-blue-600" />
                          )}
                          <div>
                            <h4 className="font-semibold">{slot.name}</h4>
                            <p className="text-sm text-gray-600">{slot.location}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(slot.status)}>
                          {slot.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium">{slot.size}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{slot.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-bold text-green-600">UGX {slot.price.toLocaleString()}</span>
                        </div>
                      </div>

                      {slot.status === 'available' && (
                        <Button 
                          className="w-full"
                          onClick={() => handleSlotPurchase(slot)}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Purchase Slot
                        </Button>
                      )}

                      {slot.status === 'purchased' && slot.uploadStatus === 'pending' && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            setSelectedSlot(slot)
                            setUploadDialog(true)
                          }}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Content
                        </Button>
                      )}

                      {slot.status === 'active' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Views:</span>
                            <span className="font-medium">{slot.views?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Clicks:</span>
                            <span className="font-medium">{slot.clicks}</span>
                          </div>
                          <Button variant="outline" className="w-full" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Analytics
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={paymentDialog} onOpenChange={setPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase Ad Slot</DialogTitle>
            <DialogDescription>
              {selectedSlot && `Pay UGX ${selectedSlot.price.toLocaleString()} for ${selectedSlot.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="256700123456"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="provider">Payment Provider</Label>
              <Select value={paymentProvider} onValueChange={setPaymentProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtn">MTN MoMo</SelectItem>
                  <SelectItem value="airtel">Airtel Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setPaymentDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={handlePayment}
                disabled={!phoneNumber || !paymentProvider || paymentProcessing}
              >
                {paymentProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Smartphone className="h-4 w-4 mr-2" />
                    Pay Now
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Ad Content</DialogTitle>
            <DialogDescription>
              Upload your image or video content for the ad slot
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file">Ad Content</Label>
              <Input
                id="file"
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              />
            </div>
            <div>
              <Label htmlFor="title">Ad Title</Label>
              <Input
                id="title"
                placeholder="Enter ad title"
                value={adTitle}
                onChange={(e) => setAdTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your ad"
                value={adDescription}
                onChange={(e) => setAdDescription(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setUploadDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={handleUpload}
                disabled={!uploadFile || !adTitle}
              >
                <Upload className="h-4 w-4 mr-2" />
                Submit for Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
