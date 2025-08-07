"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wifi, Menu, Users, DollarSign, TrendingUp, QrCode, Eye, AlertCircle, Calendar, Clock, CheckCircle, XCircle, CreditCard, Receipt, AlertTriangle } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BusinessDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState<any>(null)
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

  useEffect(() => {
    const fetchDashboardData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDashboardData({
        revenue: {
          total: 245230,
          thisMonth: 45230,
          lastMonth: 38900,
          growth: 16.3
        },
        vouchers: {
          total: 1250,
          active: 340,
          redeemed: 890,
          expired: 20
        },
        users: {
          total: 2340,
          active: 156,
          newToday: 23
        },
        routers: {
          total: 2,
          online: 2,
          offline: 0
        },
        fees: {
          maintenanceFee: 2500,
          vat: 1800, // 18% VAT
          platformFee: 1200,
          total: 5500,
          status: 'current', // current, overdue
          nextPaymentDate: '2024-02-15',
          lastPaymentDate: '2024-01-15'
        },
        recentActivity: [
          { type: 'voucher_redeemed', message: 'Voucher WIFI-1H-ABC123 redeemed', time: '2 minutes ago' },
          { type: 'user_connected', message: '23 new users connected today', time: '1 hour ago' },
          { type: 'payment_received', message: 'Payment of UGX 15,000 received', time: '3 hours ago' },
          { type: 'router_online', message: 'Router WiFi-Router-01 came online', time: '5 hours ago' }
        ]
      })
    }
    fetchDashboardData()
  }, [])

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
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
                <h1 className="text-2xl font-bold text-blue-700">Business Dashboard</h1>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="text-sm">
                    Coffee Corner Ltd
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Platform Fees Alert */}
            {dashboardData.fees.status === 'overdue' && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Your platform fees are overdue. Please pay UGX {dashboardData.fees.total.toLocaleString()} to avoid service interruption.
                </AlertDescription>
              </Alert>
            )}

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">UGX {dashboardData.revenue.total.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +{dashboardData.revenue.growth}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Vouchers</CardTitle>
                  <QrCode className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.vouchers.active}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData.vouchers.total} total vouchers
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Connected Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.users.active}</div>
                  <p className="text-xs text-muted-foreground">
                    +{dashboardData.users.newToday} new today
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Router Status</CardTitle>
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{dashboardData.routers.online}/{dashboardData.routers.total}</div>
                  <p className="text-xs text-muted-foreground">All routers online</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Platform Fees Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Receipt className="h-5 w-5 mr-2" />
                    Platform Fees
                  </CardTitle>
                  <CardDescription>
                    Monthly fees managed by Super Admin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Maintenance Fee</span>
                      <span className="font-medium">UGX {dashboardData.fees.maintenanceFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">VAT (18%)</span>
                      <span className="font-medium">UGX {dashboardData.fees.vat.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-gray-600">Platform Fee</span>
                      <span className="font-medium">UGX {dashboardData.fees.platformFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-gray-50 px-3 rounded-lg">
                      <span className="font-medium">Total Monthly Fees</span>
                      <span className="font-bold text-lg">UGX {dashboardData.fees.total.toLocaleString()}</span>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge 
                          variant={dashboardData.fees.status === 'current' ? 'default' : 'destructive'}
                          className={dashboardData.fees.status === 'current' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {dashboardData.fees.status === 'current' ? 'Current' : 'Overdue'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Next Payment</span>
                        <span className="text-sm font-medium">{dashboardData.fees.nextPaymentDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Payment</span>
                        <span className="text-sm">{dashboardData.fees.lastPaymentDate}</span>
                      </div>
                    </div>

                    {dashboardData.fees.status === 'overdue' && (
                      <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Revenue Overview
                  </CardTitle>
                  <CardDescription>
                    Monthly revenue performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-bold text-green-600">UGX {dashboardData.revenue.thisMonth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="font-medium">UGX {dashboardData.revenue.lastMonth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Growth</span>
                      <span className="font-medium text-green-600">+{dashboardData.revenue.growth}%</span>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Monthly Target</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest updates from your WiFi business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {activity.type === 'voucher_redeemed' && <QrCode className="h-5 w-5 text-blue-600" />}
                        {activity.type === 'user_connected' && <Users className="h-5 w-5 text-green-600" />}
                        {activity.type === 'payment_received' && <DollarSign className="h-5 w-5 text-green-600" />}
                        {activity.type === 'router_online' && <Wifi className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
