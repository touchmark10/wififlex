"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Building2, Users, DollarSign, Settings, BarChart3, Menu, Bell, User, Plus, Edit, Upload, Router, FileText, HelpCircle, LogOut, Eye, Zap, MapPin, AlertTriangle, CheckCircle, XCircle, Activity, Clock, Search, Globe } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SuperAdminRoutersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [routersData, setRoutersData] = useState<any>(null)
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
    const fetchRoutersData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setRoutersData({
        networkStats: {
          totalRouters: 156,
          onlineRouters: 142,
          offlineRouters: 14,
          systemHealth: 99.9,
          averageLoad: 65,
          criticalAlerts: 2,
          totalSessions: 1247,
          dataTransferred: "2.8TB"
        },
        routers: [
          { 
            id: "RTR001", 
            businessName: "Coffee Corner Ltd",
            businessId: 1,
            mac: "AA:BB:CC:DD:EE:FF", 
            location: "Main Hall", 
            status: "online", 
            sessions: 24, 
            maxSessions: 50,
            heartbeat: "120ms",
            lastSeen: "2024-01-15T10:30:00Z",
            uptime: "99.5%",
            dataTransferred: "2.5GB",
            coordinates: { lat: 0.3476, lng: 32.5825 }
          },
          { 
            id: "RTR002", 
            businessName: "Coffee Corner Ltd",
            businessId: 1,
            mac: "FF:EE:DD:CC:BB:AA", 
            location: "Outdoor Area", 
            status: "offline", 
            sessions: 0, 
            maxSessions: 50,
            heartbeat: "N/A",
            lastSeen: "2024-01-15T08:15:00Z",
            uptime: "87.2%",
            dataTransferred: "1.8GB",
            coordinates: { lat: 0.3476, lng: 32.5825 }
          },
          { 
            id: "RTR003", 
            businessName: "Tech Hub Cafe",
            businessId: 2,
            mac: "11:22:33:44:55:66", 
            location: "VIP Lounge", 
            status: "online", 
            sessions: 8, 
            maxSessions: 25,
            heartbeat: "95ms",
            lastSeen: "2024-01-15T10:32:00Z",
            uptime: "98.1%",
            dataTransferred: "1.2GB",
            coordinates: { lat: 0.3136, lng: 32.5811 }
          }
        ],
        alerts: [
          { id: 1, router: "RTR002", business: "Coffee Corner Ltd", message: "Router offline for 2 hours", severity: "high", time: "2 hours ago" },
          { id: 2, router: "RTR045", business: "Mall Connect", message: "High session load detected", severity: "medium", time: "30 min ago" },
          { id: 3, router: "RTR078", business: "Downtown WiFi", message: "Intermittent connectivity", severity: "low", time: "1 hour ago" }
        ]
      })
    }
    fetchRoutersData()
  }, [])

  const handleLogout = () => {
    console.log("Super Admin logging out...")
  }

  const handleRestartRouter = (routerId: string) => {
    console.log(`Restarting router: ${routerId}`)
  }

  const handleViewMap = () => {
    console.log("Opening router map view...")
  }

  if (!routersData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading router network...</p>
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
          <h1 className="text-lg font-semibold">Router Network</h1>
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
                <h1 className="text-2xl font-bold text-red-700">Router Network Health</h1>
                <div className="flex items-center space-x-4">
                  <Button onClick={handleViewMap}>
                    <MapPin className="h-4 w-4 mr-2" />
                    View Map
                  </Button>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search routers..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Router Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Critical Alerts */}
            {routersData.alerts.filter((alert: any) => alert.severity === 'high').length > 0 && (
              <div className="mb-6 space-y-2">
                {routersData.alerts.filter((alert: any) => alert.severity === 'high').map((alert: any) => (
                  <Alert key={alert.id} className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>{alert.router} ({alert.business}):</strong> {alert.message} ({alert.time})
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {/* Network Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Routers</CardTitle>
                  <Router className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-700">{routersData.networkStats.totalRouters}</div>
                  <p className="text-xs text-muted-foreground">Network devices</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Online</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{routersData.networkStats.onlineRouters}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((routersData.networkStats.onlineRouters / routersData.networkStats.totalRouters) * 100)}% uptime
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{routersData.networkStats.totalSessions}</div>
                  <p className="text-xs text-muted-foreground">Connected users</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Transfer</CardTitle>
                  <Globe className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{routersData.networkStats.dataTransferred}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* System Health Overview */}
            <Card className="mb-8 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Activity className="h-5 w-5 mr-2" />
                  Network Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>System Health</span>
                      <span>{routersData.networkStats.systemHealth}%</span>
                    </div>
                    <Progress value={routersData.networkStats.systemHealth} className="h-3 mb-4" />
                    
                    <div className="flex justify-between text-sm mb-2">
                      <span>Average Load</span>
                      <span>{routersData.networkStats.averageLoad}%</span>
                    </div>
                    <Progress value={routersData.networkStats.averageLoad} className="h-3" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Critical Alerts</span>
                      <Badge variant={routersData.networkStats.criticalAlerts > 0 ? "destructive" : "default"}>
                        {routersData.networkStats.criticalAlerts}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Offline Routers</span>
                      <Badge variant={routersData.networkStats.offlineRouters > 0 ? "destructive" : "default"}>
                        {routersData.networkStats.offlineRouters}
                      </Badge>
                    </div>
                    <Button className="w-full" onClick={handleViewMap}>
                      <MapPin className="h-4 w-4 mr-2" />
                      View Geographic Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Router List */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Router className="h-5 w-5 mr-2" />
                  Router Network Status
                </CardTitle>
                <CardDescription>
                  Monitor all routers across the network with real-time status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routersData.routers.map((router: any) => (
                    <div key={router.id} className="border rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="font-medium text-lg">{router.id}</h3>
                            <Badge 
                              variant={router.status === 'online' ? 'default' : 'destructive'}
                              className={router.status === 'online' ? 'bg-green-100 text-green-800' : ''}
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              {router.status}
                            </Badge>
                            <Badge variant="outline">
                              {router.businessName}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">MAC Address</p>
                              <p className="text-sm font-mono">{router.mac}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Location</p>
                              <p className="text-sm">{router.location}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Heartbeat</p>
                              <p className={`text-sm ${router.status === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                                {router.heartbeat}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Uptime</p>
                              <p className="text-sm">{router.uptime}</p>
                            </div>
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-sm">
                              <span>Session Load ({router.sessions}/{router.maxSessions})</span>
                              <span>{Math.round((router.sessions / router.maxSessions) * 100)}%</span>
                            </div>
                            <Progress value={(router.sessions / router.maxSessions) * 100} className="h-2" />
                          </div>

                          <div className="text-sm text-gray-600">
                            <p>Data Transferred: {router.dataTransferred}</p>
                            <p>Last Seen: {new Date(router.lastSeen).toLocaleString()}</p>
                            <p>Coordinates: {router.coordinates.lat}, {router.coordinates.lng}</p>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 lg:ml-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRestartRouter(router.id)}
                            disabled={router.status === 'offline'}
                          >
                            <Activity className="h-4 w-4 mr-1" />
                            Restart
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <MapPin className="h-4 w-4 mr-1" />
                            Locate
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
