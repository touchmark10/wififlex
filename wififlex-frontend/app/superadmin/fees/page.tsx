"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Building2, Users, DollarSign, Settings, BarChart3, Menu, Bell, User, Plus, Edit, Upload, Router, FileText, HelpCircle, LogOut, Save, Calculator, TrendingUp } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function FeesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [feesData, setFeesData] = useState<any>(null)
  const pathname = usePathname()

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, href: "/superadmin/dashboard" },
    { name: "Admins", icon: Users, href: "/superadmin/admins" },
    { name: "Fees", icon: DollarSign, href: "/superadmin/fees" },
    { name: "Ads", icon: Upload, href: "/superadmin/ads" },
    { name: "Routers", icon: Router, href: "/superadmin/routers" },
    { name: "Policies", icon: FileText, href: "/superadmin/policies" },
    { name: "Settings", icon: Settings, href: "/superadmin/settings" }
  ]

  useEffect(() => {
    const fetchFeesData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setFeesData({
        feeTemplates: {
          registrationFee: 50000,
          maintenanceFee: 10000,
          maintenanceFrequency: "monthly",
          platformCommission: 10,
          vatRate: 18,
          adSlotPricing: {
            "3days": 15000,
            "1week": 30000,
            "2weeks": 50000,
            "1month": 80000
          },
          sendingCharges: {
            mtn: 1.5,
            airtel: 2.0
          }
        },
        revenueBreakdown: {
          totalRevenue: 2450000,
          registrationFees: 500000,
          maintenanceFees: 800000,
          platformCommissions: 245000,
          adSlotRevenue: 450000,
          vatCollected: 441000
        }
      })
    }
    fetchFeesData()
  }, [])

  const handleLogout = () => {
    console.log("Super Admin logging out...")
  }

  const handleSaveTemplates = () => {
    console.log("Saving fee templates...")
  }

  if (!feesData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fees...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-red-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-red-600" />
            <Badge variant="destructive" className="text-xs">Super Admin</Badge>
          </div>
          <h1 className="text-lg font-semibold">Fee Management</h1>
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
                        variant={pathname === item.href ? "destructive" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t">
                  <Button variant="outline" className="w-full mt-4" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r border-red-200 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Shield className="h-8 w-8 text-red-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">WiFiFlex</span>
              <Badge variant="destructive" className="ml-2 text-xs">Super</Badge>
            </div>
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigationItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={pathname === item.href ? "destructive" : "ghost"}
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
          <div className="hidden lg:block bg-white shadow-sm border-b border-red-200 sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-red-700">Fee Template Management</h1>
                <div className="flex items-center space-x-4">
                  <Button onClick={handleSaveTemplates}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Fees Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Revenue Overview */}
            <Card className="mb-8 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-xl font-bold text-red-700">UGX {feesData.revenueBreakdown.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Registration</p>
                    <p className="text-xl font-bold text-blue-600">UGX {feesData.revenueBreakdown.registrationFees.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Maintenance</p>
                    <p className="text-xl font-bold text-green-600">UGX {feesData.revenueBreakdown.maintenanceFees.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Commission</p>
                    <p className="text-xl font-bold text-purple-600">UGX {feesData.revenueBreakdown.platformCommissions.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Ad Slots</p>
                    <p className="text-xl font-bold text-orange-600">UGX {feesData.revenueBreakdown.adSlotRevenue.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">VAT Collected</p>
                    <p className="text-xl font-bold text-red-600">UGX {feesData.revenueBreakdown.vatCollected.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fee Templates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Basic Fee Templates */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Basic Fee Templates
                  </CardTitle>
                  <CardDescription>
                    Set registration, maintenance, and commission rates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="registration-fee">Registration Fee</Label>
                    <Input 
                      id="registration-fee" 
                      defaultValue={feesData.feeTemplates.registrationFee}
                      type="number"
                    />
                    <p className="text-xs text-gray-500 mt-1">One-time fee for new business registration</p>
                  </div>
                  <div>
                    <Label htmlFor="maintenance-fee">Maintenance Fee</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="maintenance-fee" 
                        defaultValue={feesData.feeTemplates.maintenanceFee}
                        type="number"
                        className="flex-1"
                      />
                      <Select defaultValue={feesData.feeTemplates.maintenanceFrequency}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Recurring maintenance fee</p>
                  </div>
                  <div>
                    <Label htmlFor="platform-commission">Platform Commission (%)</Label>
                    <Input 
                      id="platform-commission" 
                      defaultValue={feesData.feeTemplates.platformCommission}
                      type="number"
                      min="0"
                      max="100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Percentage of business revenue</p>
                  </div>
                  <div>
                    <Label htmlFor="vat-rate">VAT Rate (%)</Label>
                    <Input 
                      id="vat-rate" 
                      defaultValue={feesData.feeTemplates.vatRate}
                      type="number"
                      min="0"
                      max="100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Value Added Tax rate</p>
                  </div>
                </CardContent>
              </Card>

              {/* Ad Slot Pricing */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Upload className="h-5 w-5 mr-2" />
                    Ad Slot Pricing
                  </CardTitle>
                  <CardDescription>
                    Configure pricing for different ad slot durations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ad-3days">3 Days Slot</Label>
                    <Input 
                      id="ad-3days" 
                      defaultValue={feesData.feeTemplates.adSlotPricing["3days"]}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ad-1week">1 Week Slot</Label>
                    <Input 
                      id="ad-1week" 
                      defaultValue={feesData.feeTemplates.adSlotPricing["1week"]}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ad-2weeks">2 Weeks Slot</Label>
                    <Input 
                      id="ad-2weeks" 
                      defaultValue={feesData.feeTemplates.adSlotPricing["2weeks"]}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ad-1month">1 Month Slot</Label>
                    <Input 
                      id="ad-1month" 
                      defaultValue={feesData.feeTemplates.adSlotPricing["1month"]}
                      type="number"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sending Charges & Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Calculator className="h-5 w-5 mr-2" />
                    Sending Charges
                  </CardTitle>
                  <CardDescription>
                    Mobile money transaction fees
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="mtn-charges">MTN MoMo Rate (%)</Label>
                    <Input 
                      id="mtn-charges" 
                      defaultValue={feesData.feeTemplates.sendingCharges.mtn}
                      type="number"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="airtel-charges">Airtel Money Rate (%)</Label>
                    <Input 
                      id="airtel-charges" 
                      defaultValue={feesData.feeTemplates.sendingCharges.airtel}
                      type="number"
                      step="0.1"
                    />
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Example Calculations</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>UGX 50,000 via MTN:</span>
                        <span>UGX {(50000 * feesData.feeTemplates.sendingCharges.mtn / 100).toLocaleString()} fee</span>
                      </div>
                      <div className="flex justify-between">
                        <span>UGX 50,000 via Airtel:</span>
                        <span>UGX {(50000 * feesData.feeTemplates.sendingCharges.airtel / 100).toLocaleString()} fee</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Router className="h-5 w-5 mr-2" />
                    Router Registration Management
                  </CardTitle>
                  <CardDescription>
                    Register routers with MAC addresses for business admins
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="business-name">Business Name</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business admin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coffee-corner">Coffee Corner Ltd</SelectItem>
                        <SelectItem value="tech-hub">Tech Hub Cafe</SelectItem>
                        <SelectItem value="downtown">Downtown WiFi</SelectItem>
                        <SelectItem value="mall-connect">Mall Connect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="router-mac">Router MAC Address</Label>
                    <Input 
                      id="router-mac" 
                      placeholder="00:11:22:33:44:55"
                      pattern="^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$"
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: XX:XX:XX:XX:XX:XX</p>
                  </div>
                  <div>
                    <Label htmlFor="router-location">Router Location</Label>
                    <Input 
                      id="router-location" 
                      placeholder="e.g., Main Hall, Ground Floor"
                    />
                  </div>
                  <div>
                    <Label htmlFor="router-model">Router Model</Label>
                    <Input 
                      id="router-model" 
                      placeholder="e.g., TP-Link AC1750"
                    />
                  </div>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Register Router
                  </Button>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Recently Registered</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">Coffee Corner Ltd</p>
                          <p className="text-gray-600">MAC: 00:1A:2B:3C:4D:5E</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">Tech Hub Cafe</p>
                          <p className="text-gray-600">MAC: 00:2B:3C:4D:5E:6F</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">Active</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <Button onClick={handleSaveTemplates} size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save All Fee Templates
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
