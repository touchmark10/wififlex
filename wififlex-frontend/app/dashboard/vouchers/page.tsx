"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wifi, Menu, Plus, Download, Search, Filter, Copy, Eye, EyeOff, Trash2, RefreshCw, QrCode, Calendar, Clock, Users, DollarSign, TrendingUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Voucher {
  id: string
  code: string
  type: string
  price: number
  status: 'active' | 'redeemed' | 'expired'
  createdDate: string
  expiryDate: string
  redeemedBy?: string
  redeemedAt?: string
}

export default function VouchersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isGenerating, setIsGenerating] = useState<string | null>(null) // Track which package is generating
  const [showCodes, setShowCodes] = useState(false)
  const [quantities, setQuantities] = useState<{[key: string]: number}>({}) // Track quantities for each package
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

  const packageTypes = [
    { id: "1hour", name: "1 Hour", price: 500, duration: "1 hour" },
    { id: "3hours", name: "3 Hours", price: 1000, duration: "3 hours" },
    { id: "6hours", name: "6 Hours", price: 1500, duration: "6 hours" },
    { id: "1day", name: "1 Day", price: 2000, duration: "24 hours" },
    { id: "3days", name: "3 Days", price: 5000, duration: "3 days" },
    { id: "1week", name: "1 Week", price: 10000, duration: "7 days" }
  ]

  // Initialize quantities
  useEffect(() => {
    const initialQuantities: {[key: string]: number} = {}
    packageTypes.forEach(pkg => {
      initialQuantities[pkg.id] = 10
    })
    setQuantities(initialQuantities)
  }, [])

  // Mock data
  useEffect(() => {
    const mockVouchers: Voucher[] = [
      {
        id: "1",
        code: "WIFI-1H-ABC123",
        type: "1 Hour",
        price: 500,
        status: "active",
        createdDate: "2024-01-15",
        expiryDate: "2024-02-15"
      },
      {
        id: "2",
        code: "WIFI-3H-DEF456",
        type: "3 Hours",
        price: 1000,
        status: "redeemed",
        createdDate: "2024-01-14",
        expiryDate: "2024-02-14",
        redeemedBy: "+256700123456",
        redeemedAt: "2024-01-14T10:30:00Z"
      },
      {
        id: "3",
        code: "WIFI-1D-GHI789",
        type: "1 Day",
        price: 2000,
        status: "expired",
        createdDate: "2024-01-10",
        expiryDate: "2024-01-20"
      },
      {
        id: "4",
        code: "WIFI-6H-JKL012",
        type: "6 Hours",
        price: 1500,
        status: "active",
        createdDate: "2024-01-16",
        expiryDate: "2024-02-16"
      }
    ]
    setVouchers(mockVouchers)
    setFilteredVouchers(mockVouchers)
  }, [])

  // Filter vouchers
  useEffect(() => {
    let filtered = vouchers

    if (searchTerm) {
      filtered = filtered.filter(voucher => 
        voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voucher.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(voucher => voucher.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(voucher => voucher.type === typeFilter)
    }

    setFilteredVouchers(filtered)
  }, [vouchers, searchTerm, statusFilter, typeFilter])

  const generateVouchers = async (packageType: string, quantity: number) => {
    console.log(`Generating ${quantity} vouchers for package: ${packageType}`)
    
    if (quantity <= 0 || quantity > 100) {
      console.error("Invalid quantity. Must be between 1 and 100")
      return
    }

    setIsGenerating(packageType)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const packageInfo = packageTypes.find(p => p.id === packageType)
      if (!packageInfo) {
        console.error("Package type not found:", packageType)
        return
      }

      const newVouchers: Voucher[] = []
      
      for (let i = 0; i < quantity; i++) {
        const voucher: Voucher = {
          id: `${Date.now()}-${packageType}-${i}`,
          code: `WIFI-${packageType.toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          type: packageInfo.name,
          price: packageInfo.price,
          status: 'active',
          createdDate: new Date().toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
        newVouchers.push(voucher)
      }
      
      setVouchers(prev => [...newVouchers, ...prev])
      console.log(`Successfully generated ${newVouchers.length} vouchers for ${packageInfo.name}`)
      
    } catch (error) {
      console.error("Error generating vouchers:", error)
    } finally {
      setIsGenerating(null)
    }
  }

  const handleQuantityChange = (packageId: string, value: string) => {
    const quantity = parseInt(value) || 1
    setQuantities(prev => ({
      ...prev,
      [packageId]: Math.max(1, Math.min(100, quantity))
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => console.log("Copied to clipboard:", text))
      .catch(err => console.error("Failed to copy:", err))
  }

  const deleteVoucher = (id: string) => {
    setVouchers(prev => prev.filter(v => v.id !== id))
    console.log("Deleted voucher:", id)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'redeemed':
        return 'bg-blue-100 text-blue-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: vouchers.length,
    active: vouchers.filter(v => v.status === 'active').length,
    redeemed: vouchers.filter(v => v.status === 'redeemed').length,
    expired: vouchers.filter(v => v.status === 'expired').length,
    totalValue: vouchers.reduce((sum, v) => sum + v.price, 0),
    redeemedValue: vouchers.filter(v => v.status === 'redeemed').reduce((sum, v) => sum + v.price, 0)
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
                <h1 className="text-2xl font-bold text-blue-700">Voucher Management</h1>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={() => setShowCodes(!showCodes)}>
                    {showCodes ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                    {showCodes ? 'Hide Codes' : 'Show Codes'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Vouchers</CardTitle>
                  <QrCode className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">All time generated</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Vouchers</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                  <p className="text-xs text-muted-foreground">Ready for use</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Redeemed</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.redeemed}</div>
                  <p className="text-xs text-muted-foreground">Successfully used</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">UGX {stats.totalValue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">UGX {stats.redeemedValue.toLocaleString()} redeemed</p>
                </CardContent>
              </Card>
            </div>

            {/* Generate Vouchers Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Generate New Vouchers
                </CardTitle>
                <CardDescription>
                  Create vouchers for your WiFi packages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {packageTypes.map((pkg) => (
                    <Card key={pkg.id} className="border-2 hover:border-blue-300 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        <CardDescription>
                          UGX {pkg.price.toLocaleString()} • {pkg.duration}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            placeholder="Qty"
                            min="1"
                            max="100"
                            value={quantities[pkg.id] || 10}
                            onChange={(e) => handleQuantityChange(pkg.id, e.target.value)}
                            className="w-20"
                          />
                          <Button
                            onClick={() => generateVouchers(pkg.id, quantities[pkg.id] || 10)}
                            disabled={isGenerating === pkg.id}
                            className="flex-1"
                          >
                            {isGenerating === pkg.id ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Plus className="h-4 w-4 mr-2" />
                            )}
                            {isGenerating === pkg.id ? 'Generating...' : 'Generate'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vouchers List */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <CardTitle className="flex items-center">
                    <QrCode className="h-5 w-5 mr-2" />
                    Voucher List ({filteredVouchers.length})
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search vouchers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="redeemed">Redeemed</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {packageTypes.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.name}>{pkg.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredVouchers.map((voucher) => (
                    <div key={voucher.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                              {showCodes ? voucher.code : '••••••••••••'}
                            </code>
                            <Badge className={getStatusColor(voucher.status)}>
                              {voucher.status}
                            </Badge>
                            <span className="text-sm text-gray-600">{voucher.type}</span>
                            <span className="text-sm font-medium">UGX {voucher.price.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Created: {voucher.createdDate}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Expires: {voucher.expiryDate}
                            </span>
                            {voucher.redeemedBy && (
                              <span className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                Redeemed by: {voucher.redeemedBy}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(voucher.code)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          {voucher.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteVoucher(voucher.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredVouchers.length === 0 && (
                    <div className="text-center py-8">
                      <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No vouchers found</p>
                      <p className="text-sm text-gray-400">Generate some vouchers to get started</p>
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
