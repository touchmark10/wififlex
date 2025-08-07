"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Building2, Users, DollarSign, Settings, BarChart3, Menu, Bell, User, Plus, Edit, Upload, Router, FileText, HelpCircle, LogOut, CheckCircle, XCircle, Eye, TrendingUp, Calendar, Clock, Search } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SuperAdminAdsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [adsData, setAdsData] = useState<any>(null)
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
    const fetchAdsData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAdsData({
        pendingAds: [
          { 
            id: 1, 
            business: "Coffee Corner Ltd", 
            businessId: 1,
            title: "Coffee Special Offer",
            content: "50% off all coffee drinks this week!", 
            status: "pending", 
            submitted: "2024-01-15",
            duration: "1 Week",
            price: 30000,
            imageUrl: "/placeholder.svg?height=200&width=400&text=Coffee+Special"
          },
          { 
            id: 2, 
            business: "Tech Hub Cafe", 
            businessId: 2,
            title: "Laptop Deals",
            content: "Best prices on laptops and accessories", 
            status: "pending", 
            submitted: "2024-01-14",
            duration: "2 Weeks",
            price: 50000,
            imageUrl: "/placeholder.svg?height=200&width=400&text=Laptop+Deals"
          },
          { 
            id: 3, 
            business: "Downtown WiFi", 
            businessId: 3,
            title: "Food Menu",
            content: "Try our new delicious menu items", 
            status: "rejected", 
            submitted: "2024-01-13",
            duration: "3 Days",
            price: 15000,
            rejectionReason: "Image quality too low",
            imageUrl: "/placeholder.svg?height=200&width=400&text=Food+Menu"
          }
        ],
        activeAds: [
          {
            id: 4,
            business: "Mall Connect",
            businessId: 4,
            title: "Shopping Discounts",
            content: "Up to 70% off selected items",
            status: "active",
            startDate: "2024-01-10",
            endDate: "2024-01-24",
            views: 15420,
            clicks: 892,
            ctr: 5.8,
            revenue: 80000
          }
        ],
        adStats: {
          totalRevenue: 450000,
          activeAds: 12,
          pendingApprovals: 3,
          rejectedAds: 8,
          averageCTR: 4.2
        }
      })
    }
    fetchAdsData()
  }, [])

  const handleLogout = () => {
    console.log("Super Admin logging out...")
  }

  const handleApproveAd = (adId: number) => {
    console.log(`Approving ad: ${adId}`)
    setAdsData((prev: any) => ({
      ...prev,
      pendingAds: prev.pendingAds.map((ad: any) => 
        ad.id === adId ? { ...ad, status: 'approved' } : ad
      )
    }))
  }

  const handleRejectAd = (adId: number, reason: string) => {
    console.log(`Rejecting ad: ${adId}, reason: ${reason}`)
    setAdsData((prev: any) => ({
      ...prev,
      pendingAds: prev.pendingAds.map((ad: any) => 
        ad.id === adId ? { ...ad, status: 'rejected', rejectionReason: reason } : ad
      )
    }))
  }

  if (!adsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ads...</p>
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
                <h1 className="text-2xl font-bold text-red-700">Ad Content Management</h1>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search ads..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Ads Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Ad Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-700">UGX {adsData.adStats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">From ad slots</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Ads</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{adsData.adStats.activeAds}</div>
                  <p className="text-xs text-muted-foreground">Currently running</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{adsData.adStats.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground">Awaiting approval</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{adsData.adStats.rejectedAds}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg CTR</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{adsData.adStats.averageCTR}%</div>
                  <p className="text-xs text-muted-foreground">Click-through rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Pending Ad Approvals */}
            <Card className="mb-8 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Clock className="h-5 w-5 mr-2" />
                  Pending Ad Approvals
                </CardTitle>
                <CardDescription>
                  Review and approve ad content submissions from business admins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {adsData.pendingAds.filter((ad: any) => ad.status === 'pending').map((ad: any) => (
                    <div key={ad.id} className="border rounded-lg p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                          <img 
                            src={ad.imageUrl || "/placeholder.svg"} 
                            alt={ad.title}
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                        </div>
                        <div className="lg:col-span-2">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">{ad.title}</h3>
                              <p className="text-sm text-gray-600">{ad.business}</p>
                            </div>
                            <Badge variant="secondary">
                              {ad.status}
                            </Badge>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-gray-700 mb-2">{ad.content}</p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                            <div>
                              <span className="font-medium">Duration:</span>
                              <p>{ad.duration}</p>
                            </div>
                            <div>
                              <span className="font-medium">Price:</span>
                              <p>UGX {ad.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">Submitted:</span>
                              <p>{ad.submitted}</p>
                            </div>
                            <div>
                              <span className="font-medium">Business ID:</span>
                              <p>{ad.businessId}</p>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveAd(ad.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRejectAd(ad.id, "Content does not meet guidelines")}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Ads Performance */}
            <Card className="mb-8 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Active Ads Performance
                </CardTitle>
                <CardDescription>
                  Monitor engagement and performance of approved ads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adsData.activeAds.map((ad: any) => (
                    <div key={ad.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium">{ad.title}</h3>
                            <Badge className="bg-green-100 text-green-800">
                              {ad.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{ad.business}</p>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Views:</span>
                              <p>{ad.views.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">Clicks:</span>
                              <p>{ad.clicks}</p>
                            </div>
                            <div>
                              <span className="font-medium">CTR:</span>
                              <p>{ad.ctr}%</p>
                            </div>
                            <div>
                              <span className="font-medium">Revenue:</span>
                              <p>UGX {ad.revenue.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">Expires:</span>
                              <p>{ad.endDate}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rejected Ads */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <XCircle className="h-5 w-5 mr-2" />
                  Rejected Ads
                </CardTitle>
                <CardDescription>
                  Ads that were rejected and their reasons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adsData.pendingAds.filter((ad: any) => ad.status === 'rejected').map((ad: any) => (
                    <div key={ad.id} className="border rounded-lg p-4 bg-red-50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium">{ad.title}</h3>
                            <Badge variant="destructive">
                              {ad.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{ad.business}</p>
                          <p className="text-sm text-red-600">
                            <strong>Rejection Reason:</strong> {ad.rejectionReason}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </div>
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
