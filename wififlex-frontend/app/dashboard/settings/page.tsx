"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Wifi, DollarSign, Settings, BarChart3, Menu, Bell, User, Edit, QrCode, Upload, Router, FileText, HelpCircle, LogOut, Save, Key, Smartphone, CreditCard, Shield, Globe } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false)
  const [walletType, setWalletType] = useState("own")
  const [selectedProvider, setSelectedProvider] = useState("mtn")
  const pathname = usePathname()

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { name: "Vouchers", icon: QrCode, href: "/dashboard/vouchers" },
    { name: "Ads", icon: Upload, href: "/dashboard/ads" },
    { name: "Routers", icon: Router, href: "/dashboard/routers" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Support", icon: HelpCircle, href: "/dashboard/support" }
  ]

  const handleLogout = () => {
    console.log("Logging out...")
  }

  const handleSaveSettings = () => {
    console.log("Saving settings...")
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
          <h1 className="text-lg font-semibold">Settings</h1>
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
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Low Bandwidth Mode</span>
                    <Switch 
                      checked={lowBandwidthMode} 
                      onCheckedChange={setLowBandwidthMode} 
                    />
                  </div>
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
              <div className="px-2 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Low Bandwidth</span>
                  <Switch 
                    checked={lowBandwidthMode} 
                    onCheckedChange={setLowBandwidthMode} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-white shadow-sm border-b sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
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

          {/* Settings Content */}
          <main className="flex-1 p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Business Information
                  </CardTitle>
                  <CardDescription>
                    Update your business details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" defaultValue="Coffee Corner Ltd" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" defaultValue="admin@coffeecorner.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input id="phone-number" defaultValue="+256 700 123 456" />
                  </div>
                  <div>
                    <Label htmlFor="business-address">Business Address</Label>
                    <Textarea id="business-address" defaultValue="123 Main Street, Kampala, Uganda" />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your mobile money and payment preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="wallet-type">Wallet Type</Label>
                    <Select defaultValue="own" onValueChange={(value) => setWalletType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="own">Own Wallet</SelectItem>
                        <SelectItem value="super-admin">Super Admin Managed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {walletType === "own" && (
                    <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
                      <h4 className="font-medium text-blue-900">Chipper Cash Integration</h4>
                      <div>
                        <Label htmlFor="chipper-api-key">Chipper Cash API Key</Label>
                        <Input 
                          id="chipper-api-key" 
                          type="password"
                          placeholder="Enter your Chipper Cash API key"
                          defaultValue=""
                        />
                      </div>
                      <div>
                        <Label htmlFor="chipper-secret">Chipper Cash Secret</Label>
                        <Input 
                          id="chipper-secret" 
                          type="password"
                          placeholder="Enter your Chipper Cash secret"
                          defaultValue=""
                        />
                      </div>
                      <div>
                        <Label htmlFor="chipper-merchant-id">Merchant ID</Label>
                        <Input 
                          id="chipper-merchant-id" 
                          placeholder="Enter your Chipper Cash merchant ID"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Mobile Money Provider</Label>
                    <div className="flex space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="mtn-provider"
                          name="provider"
                          value="mtn"
                          checked={selectedProvider === "mtn"}
                          onChange={(e) => setSelectedProvider(e.target.value)}
                          className="w-4 h-4 text-yellow-600"
                        />
                        <Label htmlFor="mtn-provider" className="flex items-center">
                          <Smartphone className="h-4 w-4 mr-1 text-yellow-600" />
                          MTN MoMo
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="airtel-provider"
                          name="provider"
                          value="airtel"
                          checked={selectedProvider === "airtel"}
                          onChange={(e) => setSelectedProvider(e.target.value)}
                          className="w-4 h-4 text-red-600"
                        />
                        <Label htmlFor="airtel-provider" className="flex items-center">
                          <Smartphone className="h-4 w-4 mr-1 text-red-600" />
                          Airtel Money
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mobile-number">
                      {selectedProvider === "mtn" ? "MTN MoMo Number" : "Airtel Money Number"}
                    </Label>
                    <Input 
                      id="mobile-number" 
                      placeholder={`Enter your ${selectedProvider === "mtn" ? "MTN" : "Airtel"} number`}
                      defaultValue="+256 700 123 456" 
                    />
                  </div>

                  <div>
                    <Label htmlFor="withdrawal-threshold">Minimum Withdrawal Threshold</Label>
                    <Input id="withdrawal-threshold" defaultValue="UGX 10,000" />
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and authentication
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="two-factor" />
                    <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                  </div>
                </CardContent>
              </Card>

              {/* System Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    System Preferences
                  </CardTitle>
                  <CardDescription>
                    Customize your dashboard experience and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive email alerts for important events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Get SMS alerts for cash-out requests</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Cash-Out</Label>
                      <p className="text-sm text-gray-600">Automatically withdraw when threshold is reached</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Low Bandwidth Mode</Label>
                      <p className="text-sm text-gray-600">Reduce data usage and disable animations</p>
                    </div>
                    <Switch checked={lowBandwidthMode} onCheckedChange={setLowBandwidthMode} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <Button onClick={handleSaveSettings} className="px-8">
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </main>

          {/* Mobile Sticky Bottom Action Bar */}
          <div className="lg:hidden bg-white border-t border-gray-200 p-4 sticky bottom-0">
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Link href="/dashboard">
                <Button size="sm" variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
