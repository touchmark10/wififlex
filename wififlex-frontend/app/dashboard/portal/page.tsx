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
import { Users, Wifi, DollarSign, Settings, BarChart3, Menu, Bell, User, Edit, QrCode, Upload, Router, FileText, HelpCircle, LogOut, Save, Globe, Palette, Image, Monitor, Smartphone, Eye, Code } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function CaptivePortalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false)
  const [portalEnabled, setPortalEnabled] = useState(true)
  const [selectedTheme, setSelectedTheme] = useState("blue")
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

  const themes = [
    { id: "blue", name: "Ocean Blue", primary: "#3B82F6", secondary: "#EFF6FF" },
    { id: "green", name: "Forest Green", primary: "#10B981", secondary: "#ECFDF5" },
    { id: "purple", name: "Royal Purple", primary: "#8B5CF6", secondary: "#F3E8FF" },
    { id: "orange", name: "Sunset Orange", primary: "#F59E0B", secondary: "#FFFBEB" }
  ]

  const handleLogout = () => {
    console.log("Logging out...")
  }

  const handleSavePortal = () => {
    console.log("Saving portal settings...")
  }

  const handlePreview = () => {
    window.open("/captive-portal", "_blank")
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
          <h1 className="text-lg font-semibold">Portal</h1>
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
                <h1 className="text-2xl font-bold text-gray-900">Captive Portal Management</h1>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" onClick={handlePreview}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Portal
                  </Button>
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

          {/* Portal Management Content */}
          <main className="flex-1 p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portal Status & Basic Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Portal Status
                  </CardTitle>
                  <CardDescription>
                    Control your captive portal availability and basic settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Portal Status</Label>
                      <p className="text-sm text-gray-600">Enable or disable your captive portal</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={portalEnabled} 
                        onCheckedChange={setPortalEnabled} 
                      />
                      <Badge variant={portalEnabled ? "default" : "secondary"}>
                        {portalEnabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="portal-title">Portal Title</Label>
                    <Input id="portal-title" defaultValue="WiFiFlex Hotspot" />
                  </div>
                  <div>
                    <Label htmlFor="business-name">Business Display Name</Label>
                    <Input id="business-name" defaultValue="Coffee Corner Ltd" />
                  </div>
                  <div>
                    <Label htmlFor="welcome-message">Welcome Message</Label>
                    <Textarea 
                      id="welcome-message" 
                      defaultValue="Welcome to our free WiFi! Choose a package to get started."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Theme & Branding */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Theme & Branding
                  </CardTitle>
                  <CardDescription>
                    Customize the look and feel of your captive portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Color Theme</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedTheme === theme.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedTheme(theme.id)}
                        >
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: theme.primary }}
                            />
                            <span className="text-sm font-medium">{theme.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="logo-upload">Business Logo</Label>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-gray-400" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Recommended: 200x200px, PNG or JPG</p>
                  </div>
                </CardContent>
              </Card>

              {/* Package Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Package Configuration
                  </CardTitle>
                  <CardDescription>
                    Set up your WiFi packages and pricing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">1 Hour Package</div>
                        <div className="text-sm text-gray-600">UGX 500</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">3 Hours Package</div>
                        <div className="text-sm text-gray-600">UGX 1,000</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">1 Day Package</div>
                        <div className="text-sm text-gray-600">UGX 2,000</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Weekend Package</div>
                        <div className="text-sm text-gray-600">UGX 5,000</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Add New Package
                  </Button>
                </CardContent>
              </Card>

              {/* Advanced Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Advanced Settings
                  </CardTitle>
                  <CardDescription>
                    Configure advanced portal features and integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Multi-language Support</Label>
                      <p className="text-sm text-gray-600">Enable English and Luganda</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>QR Code Scanner</Label>
                      <p className="text-sm text-gray-600">Allow voucher scanning</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Timer</Label>
                      <p className="text-sm text-gray-600">Show remaining time</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Usage Display</Label>
                      <p className="text-sm text-gray-600">Show data consumption</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="redirect-url">Success Redirect URL</Label>
                    <Input 
                      id="redirect-url" 
                      placeholder="https://example.com/welcome"
                      defaultValue=""
                    />
                  </div>
                  <div>
                    <Label htmlFor="support-contact">Support Contact</Label>
                    <Input 
                      id="support-contact" 
                      placeholder="+256 700 123 456"
                      defaultValue="+256 700 123 456"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex space-x-4">
                <Button onClick={handlePreview} variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Portal
                </Button>
                <Button variant="outline">
                  <Code className="h-4 w-4 mr-2" />
                  View Code
                </Button>
              </div>
              <Button onClick={handleSavePortal} className="px-8">
                <Save className="h-4 w-4 mr-2" />
                Save Portal Settings
              </Button>
            </div>
          </main>

          {/* Mobile Sticky Bottom Action Bar */}
          <div className="lg:hidden bg-white border-t border-gray-200 p-4 sticky bottom-0">
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" onClick={handleSavePortal}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
