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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Building2, Users, DollarSign, Settings, BarChart3, Menu, Bell, User, Plus, Edit, AlertTriangle, Router, FileText, HelpCircle, LogOut, TrendingUp, Database, Globe, Activity, CheckCircle, XCircle, Eye, MapPin, Webhook, CreditCard, Upload, Clock, Search, Zap, Calculator, RefreshCw } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SuperAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false)
  const [language, setLanguage] = useState<'en' | 'lg'>('en')
  const [dashboardData, setDashboardData] = useState<any>(null)
  const pathname = usePathname()

  const text = {
    en: {
      controlPanel: "Super Admin Control Panel",
      platformOverview: "Platform Financial Overview",
      businessManagement: "Business Admin Management",
      feeManagement: "Fee Template Management",
      adApprovals: "Ad Slot Approvals",
      cashOutRequests: "Cash-Out Requests",
      routerHealth: "Router Network Health",
      systemControls: "System Controls & Policies",
      auditLogs: "Audit Logs"
    },
    lg: {
      controlPanel: "Ekitongole ky'Obufuzi",
      platformOverview: "Ensimbi z'Omukutu",
      businessManagement: "Okuddukanya Abasuubuzi",
      feeManagement: "Okuddukanya Ebisale",
      adApprovals: "Okukkiriza Ebitone",
      cashOutRequests: "Okusaba Ensimbi",
      routerHealth: "Obulamu bwa Router",
      systemControls: "Okuddukanya Sisitemu",
      auditLogs: "Ebiwandiiko by'Okukebereza"
    }
  }

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, href: "/superadmin/dashboard" },
    { name: "Admins", icon: Users, href: "/superadmin/admins" },
    { name: "Fees", icon: DollarSign, href: "/superadmin/fees" },
    { name: "Ads", icon: Upload, href: "/superadmin/ads" },
    { name: "Routers", icon: Router, href: "/superadmin/routers" },
    { name: "Policies", icon: FileText, href: "/superadmin/policies" },
    { name: "Settings", icon: Settings, href: "/superadmin/settings" }
  ]

  // Mock API call for super admin dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDashboardData({
        platform: {
          totalRevenue: 2450000,
          vatCollected: 441000,
          platformFees: 245000,
          netPayouts: 1764000,
          activeBusinesses: 156,
          monthlyGrowth: 20.1
        },
        businessAdmins: [
          { id: 1, name: "Coffee Corner Ltd", revenue: 245230, routers: 2, status: "active", performance: 95 },
          { id: 2, name: "Tech Hub Cafe", revenue: 189100, routers: 1, status: "active", performance: 87 },
          { id: 3, name: "Downtown WiFi", revenue: 156500, routers: 3, status: "pending", performance: 0 },
          { id: 4, name: "Mall Connect", revenue: 134200, routers: 2, status: "suspended", performance: 45 }
        ],
        feeTemplates: {
          registrationFee: 50000,
          maintenanceFee: 10000,
          maintenanceFrequency: "monthly",
          adSlotPricing: {
            "3days": 15000,
            "1week": 30000,
            "2weeks": 50000,
            "1month": 80000
          }
        },
        cashOutRequests: [
          { id: 1, business: "Coffee Corner Ltd", amount: 35000, status: "pending", date: "2024-01-15", method: "MTN" },
          { id: 2, business: "Tech Hub Cafe", amount: 25000, status: "processed", date: "2024-01-14", method: "Airtel" },
          { id: 3, business: "Mall Connect", amount: 45000, status: "pending", date: "2024-01-13", method: "MTN" }
        ],
        pendingAds: [
          { id: 1, business: "Coffee Corner", content: "Coffee Promotion", status: "pending", submitted: "2024-01-15" },
          { id: 2, business: "Tech Hub", content: "Laptop Deals", status: "pending", submitted: "2024-01-14" },
          { id: 3, business: "Downtown", content: "Food Menu", status: "rejected", submitted: "2024-01-13" }
        ],
        routerHealth: {
          totalRouters: 156,
          onlineRouters: 142,
          offlineRouters: 14,
          systemHealth: 99.9,
          averageLoad: 65,
          criticalAlerts: 2
        },
        systemActivity: [
          { action: "New business registered", business: "Mall Connect", time: "2 min ago", type: "success" },
          { action: "Cash-out processed", business: "Tech Hub", amount: "UGX 25,000", time: "15 min ago", type: "info" },
          { action: "Ad content approved", business: "Coffee Corner", time: "23 min ago", type: "success" },
          { action: "Router offline alert", router: "RTR-045", time: "45 min ago", type: "warning" },
          { action: "System backup completed", time: "1 hour ago", type: "info" }
        ]
      })
    }

    fetchDashboardData()
  }, [])

  const handleLogout = () => {
    console.log("Super Admin logging out...")
  }

  const handleApproveAdmin = (adminId: number) => {
    console.log(`Approving admin: ${adminId}`)
  }

  const handleRejectAdmin = (adminId: number) => {
    console.log(`Rejecting admin: ${adminId}`)
  }

  const handleApproveCashOut = (requestId: number) => {
    console.log(`Approving cash-out request: ${requestId}`)
  }

  const handleRejectCashOut = (requestId: number) => {
    console.log(`Rejecting cash-out request: ${requestId}`)
  }

  const handleApproveAd = (adId: number) => {
    console.log(`Approving ad: ${adId}`)
  }

  const handleRejectAd = (adId: number) => {
    console.log(`Rejecting ad: ${adId}`)
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading super admin dashboard...</p>
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
          <div className="flex items-center space-x-2">
            <Button
              variant={language === 'lg' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => setLanguage('lg')}
            >
              LG
            </Button>
            <Button
              variant={language === 'en' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
            >
              EN
            </Button>
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
              <div className="px-2 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Low Bandwidth</span>
                  <Switch 
                    checked={lowBandwidthMode} 
                    onCheckedChange={setLowBandwidthMode} 
                  />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant={language === 'lg' ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage('lg')}
                  >
                    LG
                  </Button>
                  <Button
                    variant={language === 'en' ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => setLanguage('en')}
                  >
                    EN
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-white shadow-sm border-b border-red-200 sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-red-700">{text[language].controlPanel}</h1>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <Bell className="h-5 w-5" />
                    {dashboardData.routerHealth.criticalAlerts > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {dashboardData.routerHealth.criticalAlerts}
                      </span>
                    )}
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

          {/* Dashboard Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Platform Financial Overview */}
            <Card className="mb-8 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  {text[language].platformOverview}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-red-700">UGX {dashboardData.platform.totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+{dashboardData.platform.monthlyGrowth}% this month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">VAT Collected</p>
                    <p className="text-2xl font-bold text-red-700">UGX {dashboardData.platform.vatCollected.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">18% VAT rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Platform Fees</p>
                    <p className="text-2xl font-bold text-red-700">UGX {dashboardData.platform.platformFees.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">10% commission</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Net Payouts</p>
                    <p className="text-2xl font-bold text-green-600">UGX {dashboardData.platform.netPayouts.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">To business admins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Active Businesses</p>
                    <p className="text-2xl font-bold text-red-700">{dashboardData.platform.activeBusinesses}</p>
                    <p className="text-xs text-green-600">+12 new this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Control Panel Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Business Admin Management */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-red-700">
                    <span className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      {text[language].businessManagement}
                    </span>
                    <Link href="/superadmin/admins">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View All
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.businessAdmins.slice(0, 3).map((admin: any) => (
                      <div key={admin.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">{admin.name}</p>
                            <p className="text-xs text-gray-600">UGX {admin.revenue.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{admin.routers} routers</p>
                          </div>
                          <Badge 
                            variant={admin.status === 'active' ? 'default' : 
                                   admin.status === 'pending' ? 'secondary' : 'destructive'}
                            className={admin.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {admin.status}
                          </Badge>
                        </div>
                        {admin.status === 'pending' && (
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-6 px-2 flex-1"
                              onClick={() => handleApproveAdmin(admin.id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-6 px-2 flex-1"
                              onClick={() => handleRejectAdmin(admin.id)}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {admin.status === 'active' && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Performance</span>
                              <span>{admin.performance}%</span>
                            </div>
                            <Progress value={admin.performance} className="h-1" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fee Template Management */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <DollarSign className="h-5 w-5 mr-2" />
                    {text[language].feeManagement}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs">Registration Fee</Label>
                      <Input 
                        defaultValue={`UGX ${dashboardData.feeTemplates.registrationFee.toLocaleString()}`} 
                        className="h-8" 
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Maintenance Fee</Label>
                      <Input 
                        defaultValue={`UGX ${dashboardData.feeTemplates.maintenanceFee.toLocaleString()}/${dashboardData.feeTemplates.maintenanceFrequency}`} 
                        className="h-8" 
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Ad Slot Pricing</Label>
                      <div className="space-y-1">
                        <Input 
                          placeholder="3 Days" 
                          defaultValue={`UGX ${dashboardData.feeTemplates.adSlotPricing['3days'].toLocaleString()}`} 
                          className="h-7 text-xs" 
                        />
                        <Input 
                          placeholder="1 Week" 
                          defaultValue={`UGX ${dashboardData.feeTemplates.adSlotPricing['1week'].toLocaleString()}`} 
                          className="h-7 text-xs" 
                        />
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      <Edit className="h-3 w-3 mr-1" />
                      Update Templates
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Cash-Out Requests */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <CreditCard className="h-5 w-5 mr-2" />
                    {text[language].cashOutRequests}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.cashOutRequests.slice(0, 3).map((request: any) => (
                      <div key={request.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">{request.business}</p>
                            <p className="text-xs text-gray-600">UGX {request.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{request.method} • {request.date}</p>
                          </div>
                          <Badge 
                            variant={request.status === 'pending' ? 'secondary' : 'default'}
                            className={request.status === 'processed' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {request.status}
                          </Badge>
                        </div>
                        {request.status === 'pending' && (
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-6 px-2 flex-1"
                              onClick={() => handleApproveCashOut(request.id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-6 px-2 flex-1"
                              onClick={() => handleRejectCashOut(request.id)}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ad Approvals & Router Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Upload className="h-5 w-5 mr-2" />
                    {text[language].adApprovals}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.pendingAds.map((ad: any) => (
                      <div key={ad.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">{ad.business}</p>
                            <p className="text-xs text-gray-600">{ad.content}</p>
                            <p className="text-xs text-gray-500">Submitted: {ad.submitted}</p>
                          </div>
                          <Badge 
                            variant={ad.status === 'pending' ? 'secondary' : 
                                   ad.status === 'rejected' ? 'destructive' : 'default'}
                          >
                            {ad.status}
                          </Badge>
                        </div>
                        {ad.status === 'pending' && (
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-6 px-2 flex-1"
                              onClick={() => handleApproveAd(ad.id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-6 px-2 flex-1"
                              onClick={() => handleRejectAd(ad.id)}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Router className="h-5 w-5 mr-2" />
                    {text[language].routerHealth}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{dashboardData.routerHealth.onlineRouters}</p>
                        <p className="text-xs text-gray-600">Online</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{dashboardData.routerHealth.offlineRouters}</p>
                        <p className="text-xs text-gray-600">Offline</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>System Health</span>
                        <span>{dashboardData.routerHealth.systemHealth}%</span>
                      </div>
                      <Progress value={dashboardData.routerHealth.systemHealth} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Average Load</span>
                        <span>{dashboardData.routerHealth.averageLoad}%</span>
                      </div>
                      <Progress value={dashboardData.routerHealth.averageLoad} className="h-2" />
                    </div>
                    {dashboardData.routerHealth.criticalAlerts > 0 && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          {dashboardData.routerHealth.criticalAlerts} critical alerts require attention
                        </AlertDescription>
                      </Alert>
                    )}
                    <Link href="/superadmin/routers">
                      <Button size="sm" variant="outline" className="w-full">
                        <MapPin className="h-3 w-3 mr-1" />
                        View Router Map
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Controls & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Settings className="h-5 w-5 mr-2" />
                    {text[language].systemControls}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cash-Out Auto-Approval</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ad Auto-Approval</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Maintenance Mode</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SMS Notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Webhook className="h-4 w-4 mr-2" />
                      View Webhook Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Activity className="h-5 w-5 mr-2" />
                    System Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardData.systemActivity.map((activity: any, i: number) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'success' ? 'bg-green-500' : 
                            activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <span className="text-sm">{activity.action}</span>
                            {activity.business && (
                              <p className="text-xs text-gray-500">{activity.business}</p>
                            )}
                            {activity.amount && (
                              <p className="text-xs text-green-600">{activity.amount}</p>
                            )}
                            {activity.router && (
                              <p className="text-xs text-red-600">{activity.router}</p>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <FileText className="h-4 w-4 mr-2" />
                    View Audit Logs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>

          {/* Mobile Sticky Bottom Action Bar */}
          <div className="lg:hidden bg-white border-t border-red-200 p-4 sticky bottom-0">
            <div className="grid grid-cols-3 gap-2">
              <Link href="/superadmin/admins">
                <Button size="sm" variant="outline" className="w-full">
                  <Building2 className="h-4 w-4 mr-1" />
                  Admins
                </Button>
              </Link>
              <Link href="/superadmin/ads">
                <Button size="sm" variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-1" />
                  Ads
                </Button>
              </Link>
              <Button size="sm" className="bg-red-600 hover:bg-red-700 w-full">
                <CreditCard className="h-4 w-4 mr-1" />
                Cash-Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
