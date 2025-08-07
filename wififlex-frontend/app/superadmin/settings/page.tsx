"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Building2, Users, DollarSign, Settings, BarChart3, Menu, Bell, User, Plus, Edit, Upload, Router, FileText, HelpCircle, LogOut, Save, Key, Mail, Globe, Webhook, Database, Activity, AlertTriangle } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SuperAdminSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsData, setSettingsData] = useState<any>(null)
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
    const fetchSettingsData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSettingsData({
        superAdminAccounts: [
          { id: 1, name: "Primary Super Admin", email: "superadmin@wififlex.com", role: "primary", lastLogin: "2024-01-15T10:30:00Z", active: true },
          { id: 2, name: "Secondary Admin", email: "admin2@wififlex.com", role: "secondary", lastLogin: "2024-01-14T15:20:00Z", active: true },
          { id: 3, name: "Technical Admin", email: "tech@wififlex.com", role: "technical", lastLogin: "2024-01-13T09:45:00Z", active: false }
        ],
        webhookSettings: {
          enabled: true,
          url: "https://api.wififlex.com/webhooks",
          secret: "wh_secret_key_123",
          events: ["payment.completed", "router.offline", "admin.registered"],
          retryAttempts: 3,
          timeout: 30
        },
        notificationSettings: {
          emailNotifications: true,
          smsNotifications: true,
          webhookNotifications: true,
          criticalAlertsOnly: false,
          emailRecipients: ["alerts@wififlex.com", "admin@wififlex.com"],
          smsRecipients: ["+256700123456", "+256750123456"]
        },
        systemSettings: {
          systemName: "WiFiFlex Management System",
          timezone: "Africa/Kampala",
          currency: "UGX",
          language: "en",
          maintenanceMode: false,
          debugMode: false,
          logLevel: "info"
        }
      })
    }
    fetchSettingsData()
  }, [])

  const handleLogout = () => {
    console.log("Super Admin logging out...")
  }

  const handleSaveSettings = () => {
    console.log("Saving system settings...")
  }

  const handleToggleSetting = (category: string, setting: string, value: boolean) => {
    console.log(`Toggling ${category}.${setting} to ${value}`)
    setSettingsData((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))
  }

  const handleTestWebhook = () => {
    console.log("Testing webhook connection...")
  }

  if (!settingsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
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
          <h1 className="text-lg font-semibold">System Settings</h1>
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
                <h1 className="text-2xl font-bold text-red-700">System Settings</h1>
                <div className="flex items-center space-x-4">
                  <Button onClick={handleSaveSettings}>
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

          {/* Settings Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Super Admin Accounts */}
            <Card className="mb-8 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Key className="h-5 w-5 mr-2" />
                  Manage Super Admin Accounts
                </CardTitle>
                <CardDescription>
                  Add, remove, and manage super administrator access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {settingsData.superAdminAccounts.map((admin: any) => (
                    <div key={admin.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium">{admin.name}</h3>
                            <Badge 
                              variant={admin.active ? 'default' : 'secondary'}
                              className={admin.active ? 'bg-green-100 text-green-800' : ''}
                            >
                              {admin.active ? 'Active' : 'Inactive'}
                            </Badge>
                            <Badge variant="outline">
                              {admin.role}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Email: {admin.email}</p>
                            <p>Last Login: {new Date(admin.lastLogin).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant={admin.active ? "destructive" : "default"}
                          >
                            {admin.active ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Super Admin
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Webhook Settings */}
            <Card className="mb-8 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Webhook className="h-5 w-5 mr-2" />
                  Webhook Logs & Retry Manager
                </CardTitle>
                <CardDescription>
                  Configure webhook endpoints and manage retry policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Enable Webhooks</Label>
                      <Switch 
                        checked={settingsData.webhookSettings.enabled}
                        onCheckedChange={(value) => handleToggleSetting('webhookSettings', 'enabled', value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input 
                        id="webhook-url" 
                        defaultValue={settingsData.webhookSettings.url}
                        disabled={!settingsData.webhookSettings.enabled}
                      />
                    </div>
                    <div>
                      <Label htmlFor="webhook-secret">Secret Key</Label>
                      <Input 
                        id="webhook-secret" 
                        type="password"
                        defaultValue={settingsData.webhookSettings.secret}
                        disabled={!settingsData.webhookSettings.enabled}
                      />
                    </div>
                    <div>
                      <Label htmlFor="retry-attempts">Retry Attempts</Label>
                      <Input 
                        id="retry-attempts" 
                        type="number"
                        defaultValue={settingsData.webhookSettings.retryAttempts}
                        disabled={!settingsData.webhookSettings.enabled}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Webhook Events</Label>
                      <div className="space-y-2 mt-2">
                        {settingsData.webhookSettings.events.map((event: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">{event}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="timeout">Timeout (seconds)</Label>
                      <Input 
                        id="timeout" 
                        type="number"
                        defaultValue={settingsData.webhookSettings.timeout}
                        disabled={!settingsData.webhookSettings.enabled}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleTestWebhook}
                      disabled={!settingsData.webhookSettings.enabled}
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      Test Webhook
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Bell className="h-5 w-5 mr-2" />
                    SMS/Email Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure alert notifications and recipients
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <Switch 
                      checked={settingsData.notificationSettings.emailNotifications}
                      onCheckedChange={(value) => handleToggleSetting('notificationSettings', 'emailNotifications', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>SMS Notifications</Label>
                    <Switch 
                      checked={settingsData.notificationSettings.smsNotifications}
                      onCheckedChange={(value) => handleToggleSetting('notificationSettings', 'smsNotifications', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Critical Alerts Only</Label>
                    <Switch 
                      checked={settingsData.notificationSettings.criticalAlertsOnly}
                      onCheckedChange={(value) => handleToggleSetting('notificationSettings', 'criticalAlertsOnly', value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email-recipients">Email Recipients</Label>
                    <Textarea 
                      id="email-recipients" 
                      defaultValue={settingsData.notificationSettings.emailRecipients.join('\n')}
                      placeholder="Enter email addresses, one per line"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sms-recipients">SMS Recipients</Label>
                    <Textarea 
                      id="sms-recipients" 
                      defaultValue={settingsData.notificationSettings.smsRecipients.join('\n')}
                      placeholder="Enter phone numbers, one per line"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Globe className="h-5 w-5 mr-2" />
                    System Configuration
                  </CardTitle>
                  <CardDescription>
                    Global system settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="system-name">System Name</Label>
                    <Input 
                      id="system-name" 
                      defaultValue={settingsData.systemSettings.systemName}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue={settingsData.systemSettings.timezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Kampala">Africa/Kampala (UTC+3)</SelectItem>
                        <SelectItem value="Africa/Nairobi">Africa/Nairobi (UTC+3)</SelectItem>
                        <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue={settingsData.systemSettings.currency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UGX">UGX - Ugandan Shilling</SelectItem>
                        <SelectItem value="KES">KES - Kenyan Shilling</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Maintenance Mode</Label>
                    <Switch 
                      checked={settingsData.systemSettings.maintenanceMode}
                      onCheckedChange={(value) => handleToggleSetting('systemSettings', 'maintenanceMode', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Debug Mode</Label>
                    <Switch 
                      checked={settingsData.systemSettings.debugMode}
                      onCheckedChange={(value) => handleToggleSetting('systemSettings', 'debugMode', value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="log-level">Log Level</Label>
                    <Select defaultValue={settingsData.systemSettings.logLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="debug">Debug</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Database className="h-5 w-5 mr-2" />
                  System Status & Health
                </CardTitle>
                <CardDescription>
                  Monitor system performance and health metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <p className="text-sm text-gray-600">System Uptime</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2.3GB</div>
                    <p className="text-sm text-gray-600">Database Size</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">45ms</div>
                    <p className="text-sm text-gray-600">Avg Response Time</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <Button variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Database Backup
                  </Button>
                  <Button variant="outline">
                    <Activity className="h-4 w-4 mr-2" />
                    System Diagnostics
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <Button onClick={handleSaveSettings} size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
