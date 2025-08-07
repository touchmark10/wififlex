"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Shield, Building2, Users, DollarSign, Settings, BarChart3, Menu, Bell, User, Plus, Edit, AlertTriangle, Router, FileText, HelpCircle, LogOut, TrendingUp, Database, Globe, Activity, CheckCircle, XCircle, Eye, MapPin, Search, Calendar, Clock, Upload } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false)
  const [adminsData, setAdminsData] = useState<any>(null)
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
    const fetchAdminsData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAdminsData({
        businessAdmins: [
          { 
            id: 1, 
            name: "Coffee Corner Ltd", 
            email: "admin@coffeecorner.com",
            phone: "+256700123456",
            revenue: 245230, 
            routers: 2, 
            status: "active", 
            performance: 95,
            registrationDate: "2024-01-01",
            walletType: "decentralized",
            payoutNumber: "+256700123456",
            lastLogin: "2024-01-15T10:30:00Z"
          },
          { 
            id: 2, 
            name: "Tech Hub Cafe", 
            email: "admin@techhub.com",
            phone: "+256750123456",
            revenue: 189100, 
            routers: 1, 
            status: "active", 
            performance: 87,
            registrationDate: "2024-01-05",
            walletType: "centralized",
            payoutNumber: "+256750123456",
            lastLogin: "2024-01-15T09:15:00Z"
          },
          { 
            id: 3, 
            name: "Downtown WiFi", 
            email: "admin@downtown.com",
            phone: "+256780123456",
            revenue: 156500, 
            routers: 3, 
            status: "pending", 
            performance: 0,
            registrationDate: "2024-01-15",
            walletType: "decentralized",
            payoutNumber: "+256780123456",
            lastLogin: null
          },
          { 
            id: 4, 
            name: "Mall Connect", 
            email: "admin@mall.com",
            phone: "+256790123456",
            revenue: 134200, 
            routers: 2, 
            status: "suspended", 
            performance: 45,
            registrationDate: "2023-12-20",
            walletType: "centralized",
            payoutNumber: "+256790123456",
            lastLogin: "2024-01-10T14:20:00Z"
          }
        ]
      })
    }
    fetchAdminsData()
  }, [])

  const handleLogout = () => {
    console.log("Super Admin logging out...")
  }

  const handleApproveAdmin = (adminId: number) => {
    console.log(`Approving admin: ${adminId}`)
    setAdminsData((prev: any) => ({
      ...prev,
      businessAdmins: prev.businessAdmins.map((admin: any) => 
        admin.id === adminId ? { ...admin, status: 'active' } : admin
      )
    }))
  }

  const handleRejectAdmin = (adminId: number) => {
    console.log(`Rejecting admin: ${adminId}`)
    setAdminsData((prev: any) => ({
      ...prev,
      businessAdmins: prev.businessAdmins.map((admin: any) => 
        admin.id === adminId ? { ...admin, status: 'suspended' } : admin
      )
    }))
  }

  const handleSuspendAdmin = (adminId: number) => {
    console.log(`Suspending admin: ${adminId}`)
    setAdminsData((prev: any) => ({
      ...prev,
      businessAdmins: prev.businessAdmins.map((admin: any) => 
        admin.id === adminId ? { ...admin, status: 'suspended' } : admin
      )
    }))
  }

  const handleReactivateAdmin = (adminId: number) => {
    console.log(`Reactivating admin: ${adminId}`)
    setAdminsData((prev: any) => ({
      ...prev,
      businessAdmins: prev.businessAdmins.map((admin: any) => 
        admin.id === adminId ? { ...admin, status: 'active' } : admin
      )
    }))
  }

  if (!adminsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admins...</p>
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
          <h1 className="text-lg font-semibold">Business Admins</h1>
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
                <h1 className="text-2xl font-bold text-red-700">Business Admin Management</h1>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search admins..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Admins Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
                  <Building2 className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-700">{adminsData.businessAdmins.length}</div>
                  <p className="text-xs text-muted-foreground">Registered businesses</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {adminsData.businessAdmins.filter((a: any) => a.status === 'active').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Operating normally</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {adminsData.businessAdmins.filter((a: any) => a.status === 'pending').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Awaiting approval</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Suspended</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {adminsData.businessAdmins.filter((a: any) => a.status === 'suspended').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Business Admins List */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Users className="h-5 w-5 mr-2" />
                  Business Administrators
                </CardTitle>
                <CardDescription>
                  Manage business admin accounts, approvals, and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminsData.businessAdmins.map((admin: any) => (
                    <div key={admin.id} className="border rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-medium text-lg">{admin.name}</h3>
                            <Badge 
                              variant={admin.status === 'active' ? 'default' : 
                                     admin.status === 'pending' ? 'secondary' : 'destructive'}
                              className={admin.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                            >
                              {admin.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Email</p>
                              <p className="text-sm">{admin.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Phone</p>
                              <p className="text-sm">{admin.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Revenue</p>
                              <p className="text-sm font-bold text-green-600">UGX {admin.revenue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Routers</p>
                              <p className="text-sm">{admin.routers} devices</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Registered</p>
                              <p className="text-sm">{admin.registrationDate}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Wallet Type</p>
                              <p className="text-sm capitalize">{admin.walletType}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Payout Number</p>
                              <p className="text-sm">{admin.payoutNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Last Login</p>
                              <p className="text-sm">
                                {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}
                              </p>
                            </div>
                          </div>

                          {admin.status === 'active' && (
                            <div className="mt-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Performance Score</span>
                                <span>{admin.performance}%</span>
                              </div>
                              <Progress value={admin.performance} className="h-2" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col space-y-2 lg:ml-4">
                          {admin.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveAdmin(admin.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleRejectAdmin(admin.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          
                          {admin.status === 'active' && (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleSuspendAdmin(admin.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Suspend
                            </Button>
                          )}
                          
                          {admin.status === 'suspended' && (
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleReactivateAdmin(admin.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Reactivate
                            </Button>
                          )}
                          
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
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
