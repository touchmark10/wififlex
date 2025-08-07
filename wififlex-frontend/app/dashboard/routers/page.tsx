"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wifi, Menu, Plus, Settings, Activity, MapPin, Users, TrendingUp, QrCode, Eye, AlertCircle, CheckCircle, XCircle, Router, Signal, Zap } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

interface RouterDevice {
  id: string
  name: string
  location: string
  macAddress: string
  model: string
  status: 'online' | 'offline' | 'maintenance'
  connectedUsers: number
  maxUsers: number
  uptime: string
  lastSeen: string
  signalStrength: number
  dataUsage: {
    upload: number
    download: number
  }
}

export default function RoutersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [routers, setRouters] = useState<RouterDevice[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    macAddress: '',
    model: '',
    maxUsers: '50',
    description: ''
  })
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const pathname = usePathname()

  const navigationItems = [
    { name: "Dashboard", icon: TrendingUp, href: "/dashboard" },
    { name: "Vouchers", icon: QrCode, href: "/dashboard/vouchers" },
    { name: "Ads", icon: Eye, href: "/dashboard/ads" },
    { name: "Routers", icon: Wifi, href: "/dashboard/routers" },
    { name: "Portal", icon: Users, href: "/dashboard/portal" },
    { name: "Settings", icon: Menu, href: "/dashboard/settings" },
    { name: "Support", icon: AlertCircle, href: "/dashboard/support" }
  ]

  // Mock data
  useEffect(() => {
    const mockRouters: RouterDevice[] = [
      {
        id: "1",
        name: "WiFi-Router-01",
        location: "Main Hall",
        macAddress: "AA:BB:CC:DD:EE:FF",
        model: "TP-Link Archer C7",
        status: "online",
        connectedUsers: 23,
        maxUsers: 50,
        uptime: "15 days, 3 hours",
        lastSeen: "Just now",
        signalStrength: 85,
        dataUsage: {
          upload: 2.3,
          download: 15.7
        }
      },
      {
        id: "2",
        name: "WiFi-Router-02",
        location: "Outdoor Patio",
        macAddress: "11:22:33:44:55:66",
        model: "Ubiquiti UniFi AC",
        status: "online",
        connectedUsers: 12,
        maxUsers: 30,
        uptime: "8 days, 12 hours",
        lastSeen: "2 minutes ago",
        signalStrength: 92,
        dataUsage: {
          upload: 1.8,
          download: 8.4
        }
      }
    ]
    setRouters(mockRouters)
  }, [])

  const validateMacAddress = (mac: string) => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    return macRegex.test(mac)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors: {[key: string]: string} = {}

    if (!formData.name.trim()) {
      errors.name = 'Router name is required'
    }

    if (!formData.location.trim()) {
      errors.location = 'Location is required'
    }

    if (!formData.macAddress.trim()) {
      errors.macAddress = 'MAC address is required'
    } else if (!validateMacAddress(formData.macAddress)) {
      errors.macAddress = 'Invalid MAC address format (e.g., AA:BB:CC:DD:EE:FF)'
    }

    if (!formData.model.trim()) {
      errors.model = 'Router model is required'
    }

    const maxUsers = parseInt(formData.maxUsers)
    if (isNaN(maxUsers) || maxUsers < 1 || maxUsers > 200) {
      errors.maxUsers = 'Max users must be between 1 and 200'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddRouter = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    console.log('Adding new router:', formData)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      const newRouter: RouterDevice = {
        id: `${Date.now()}`,
        name: formData.name,
        location: formData.location,
        macAddress: formData.macAddress.toUpperCase(),
        model: formData.model,
        status: 'offline', // New routers start offline until configured
        connectedUsers: 0,
        maxUsers: parseInt(formData.maxUsers),
        uptime: "0 minutes",
        lastSeen: "Never",
        signalStrength: 0,
        dataUsage: {
          upload: 0,
          download: 0
        }
      }

      setRouters(prev => [...prev, newRouter])
      
      // Reset form
      setFormData({
        name: '',
        location: '',
        macAddress: '',
        model: '',
        maxUsers: '50',
        description: ''
      })
      
      setIsAddDialogOpen(false)
      console.log('Router added successfully:', newRouter)
      
    } catch (error) {
      console.error('Error adding router:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800'
      case 'offline':
        return 'bg-red-100 text-red-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSignalIcon = (strength: number) => {
    if (strength >= 80) return <Signal className="h-4 w-4 text-green-600" />
    if (strength >= 60) return <Signal className="h-4 w-4 text-yellow-600" />
    return <Signal className="h-4 w-4 text-red-600" />
  }

  const stats = {
    total: routers.length,
    online: routers.filter(r => r.status === 'online').length,
    offline: routers.filter(r => r.status === 'offline').length,
    totalUsers: routers.reduce((sum, r) => sum + r.connectedUsers, 0),
    totalCapacity: routers.reduce((sum, r) => sum + r.maxUsers, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Wifi className="h-6 w-6 text-blue-600" />
            <Badge variant="outline" className="text-xs">Business Admin</Badge>
          </div>
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
          <div className="flex flex-col flex-grow bg-white border-r pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Wifi className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">WiFiFlex</span>
              <Badge variant="outline" className="ml-2 text-xs">Business</Badge>
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
                <h1 className="text-2xl font-bold text-blue-700">Router Management</h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Router
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add New Router</DialogTitle>
                      <DialogDescription>
                        Register a new WiFi router to your network. Make sure the router is physically connected and powered on.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Router Name *</Label>
                          <Input
                            id="name"
                            placeholder="e.g., WiFi-Router-03"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={formErrors.name ? 'border-red-500' : ''}
                          />
                          {formErrors.name && (
                            <p className="text-sm text-red-500">{formErrors.name}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location *</Label>
                          <Input
                            id="location"
                            placeholder="e.g., Second Floor"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className={formErrors.location ? 'border-red-500' : ''}
                          />
                          {formErrors.location && (
                            <p className="text-sm text-red-500">{formErrors.location}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="macAddress">MAC Address *</Label>
                        <Input
                          id="macAddress"
                          placeholder="AA:BB:CC:DD:EE:FF"
                          value={formData.macAddress}
                          onChange={(e) => handleInputChange('macAddress', e.target.value)}
                          className={formErrors.macAddress ? 'border-red-500' : ''}
                        />
                        {formErrors.macAddress && (
                          <p className="text-sm text-red-500">{formErrors.macAddress}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          Find this on the router label or admin interface
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="model">Router Model *</Label>
                          <Select value={formData.model} onValueChange={(value) => handleInputChange('model', value)}>
                            <SelectTrigger className={formErrors.model ? 'border-red-500' : ''}>
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="TP-Link Archer C7">TP-Link Archer C7</SelectItem>
                              <SelectItem value="TP-Link Archer C9">TP-Link Archer C9</SelectItem>
                              <SelectItem value="Ubiquiti UniFi AC">Ubiquiti UniFi AC</SelectItem>
                              <SelectItem value="Netgear Nighthawk">Netgear Nighthawk</SelectItem>
                              <SelectItem value="ASUS RT-AC68U">ASUS RT-AC68U</SelectItem>
                              <SelectItem value="Linksys EA7500">Linksys EA7500</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {formErrors.model && (
                            <p className="text-sm text-red-500">{formErrors.model}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxUsers">Max Users *</Label>
                          <Input
                            id="maxUsers"
                            type="number"
                            min="1"
                            max="200"
                            value={formData.maxUsers}
                            onChange={(e) => handleInputChange('maxUsers', e.target.value)}
                            className={formErrors.maxUsers ? 'border-red-500' : ''}
                          />
                          {formErrors.maxUsers && (
                            <p className="text-sm text-red-500">{formErrors.maxUsers}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                          id="description"
                          placeholder="Additional notes about this router..."
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddRouter} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Adding...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Router
                          </>
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Routers</CardTitle>
                  <Router className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">Registered devices</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Online</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.online}</div>
                  <p className="text-xs text-muted-foreground">Active connections</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Connected Users</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">of {stats.totalCapacity} capacity</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Network Load</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round((stats.totalUsers / stats.totalCapacity) * 100)}%</div>
                  <p className="text-xs text-muted-foreground">Current utilization</p>
                </CardContent>
              </Card>
            </div>

            {/* Routers List */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <CardTitle className="flex items-center">
                    <Wifi className="h-5 w-5 mr-2" />
                    Router Devices ({routers.length})
                  </CardTitle>
                  <div className="lg:hidden">
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Router
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Add New Router</DialogTitle>
                          <DialogDescription>
                            Register a new WiFi router to your network. Make sure the router is physically connected and powered on.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Router Name *</Label>
                              <Input
                                id="name"
                                placeholder="e.g., WiFi-Router-03"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={formErrors.name ? 'border-red-500' : ''}
                              />
                              {formErrors.name && (
                                <p className="text-sm text-red-500">{formErrors.name}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location">Location *</Label>
                              <Input
                                id="location"
                                placeholder="e.g., Second Floor"
                                value={formData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                className={formErrors.location ? 'border-red-500' : ''}
                              />
                              {formErrors.location && (
                                <p className="text-sm text-red-500">{formErrors.location}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="macAddress">MAC Address *</Label>
                            <Input
                              id="macAddress"
                              placeholder="AA:BB:CC:DD:EE:FF"
                              value={formData.macAddress}
                              onChange={(e) => handleInputChange('macAddress', e.target.value)}
                              className={formErrors.macAddress ? 'border-red-500' : ''}
                            />
                            {formErrors.macAddress && (
                              <p className="text-sm text-red-500">{formErrors.macAddress}</p>
                            )}
                            <p className="text-xs text-gray-500">
                              Find this on the router label or admin interface
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="model">Router Model *</Label>
                              <Select value={formData.model} onValueChange={(value) => handleInputChange('model', value)}>
                                <SelectTrigger className={formErrors.model ? 'border-red-500' : ''}>
                                  <SelectValue placeholder="Select model" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="TP-Link Archer C7">TP-Link Archer C7</SelectItem>
                                  <SelectItem value="TP-Link Archer C9">TP-Link Archer C9</SelectItem>
                                  <SelectItem value="Ubiquiti UniFi AC">Ubiquiti UniFi AC</SelectItem>
                                  <SelectItem value="Netgear Nighthawk">Netgear Nighthawk</SelectItem>
                                  <SelectItem value="ASUS RT-AC68U">ASUS RT-AC68U</SelectItem>
                                  <SelectItem value="Linksys EA7500">Linksys EA7500</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              {formErrors.model && (
                                <p className="text-sm text-red-500">{formErrors.model}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="maxUsers">Max Users *</Label>
                              <Input
                                id="maxUsers"
                                type="number"
                                min="1"
                                max="200"
                                value={formData.maxUsers}
                                onChange={(e) => handleInputChange('maxUsers', e.target.value)}
                                className={formErrors.maxUsers ? 'border-red-500' : ''}
                              />
                              {formErrors.maxUsers && (
                                <p className="text-sm text-red-500">{formErrors.maxUsers}</p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                              id="description"
                              placeholder="Additional notes about this router..."
                              value={formData.description}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              rows={3}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddRouter} disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Adding...
                              </>
                            ) : (
                              <>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Router
                              </>
                            )}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routers.map((router) => (
                    <div key={router.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-medium text-lg">{router.name}</h3>
                            <Badge className={getStatusColor(router.status)}>
                              {router.status}
                            </Badge>
                            {getSignalIcon(router.signalStrength)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Location</p>
                              <p className="text-sm flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {router.location}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">MAC Address</p>
                              <p className="text-sm font-mono">{router.macAddress}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Model</p>
                              <p className="text-sm">{router.model}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Connected Users</p>
                              <p className="text-sm">
                                <span className="font-bold text-blue-600">{router.connectedUsers}</span>
                                <span className="text-gray-500">/{router.maxUsers}</span>
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Uptime</p>
                              <p className="text-sm">{router.uptime}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Last Seen</p>
                              <p className="text-sm">{router.lastSeen}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Signal Strength</p>
                              <p className="text-sm">{router.signalStrength}%</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Data Usage</p>
                              <p className="text-sm">
                                ↑{router.dataUsage.upload}GB ↓{router.dataUsage.download}GB
                              </p>
                            </div>
                          </div>

                          {router.status === 'online' && (
                            <div className="mt-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span>User Capacity</span>
                                <span>{Math.round((router.connectedUsers / router.maxUsers) * 100)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${(router.connectedUsers / router.maxUsers) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col space-y-2 lg:ml-4">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Configure
                          </Button>
                          <Button size="sm" variant="outline">
                            <Activity className="h-4 w-4 mr-1" />
                            Monitor
                          </Button>
                          {router.status === 'offline' && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Zap className="h-4 w-4 mr-1" />
                              Activate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {routers.length === 0 && (
                    <div className="text-center py-8">
                      <Router className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No routers registered</p>
                      <p className="text-sm text-gray-400">Add your first router to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
