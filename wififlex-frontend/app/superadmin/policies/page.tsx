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
import { Shield, Building2, Users, DollarSign, Settings, BarChart3, Menu, Bell, User, Plus, Edit, Upload, Router, FileText, HelpCircle, LogOut, Save, Clock, AlertTriangle, CheckCircle, Globe, Lock } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function PoliciesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [policiesData, setPoliciesData] = useState<any>(null)
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
    const fetchPoliciesData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPoliciesData({
        cashOutPolicies: {
          minBalanceAfterFees: 50000,
          lockPeriod: 24, // hours
          maxDailyWithdrawal: 500000,
          autoApprovalThreshold: 100000,
          requiresApprovalAbove: 100000
        },
        disbursementPolicies: {
          payoutCycles: "weekly",
          minimumThreshold: 10000,
          maximumHold: 30, // days
          processingTime: 24 // hours
        },
        systemPolicies: {
          maintenanceMode: false,
          autoAdApproval: false,
          autoCashOutApproval: false,
          maxRoutersPerBusiness: 10,
          sessionTimeout: 60, // minutes
          dataLimitPerSession: 1000 // MB
        },
        compliancePolicies: {
          vatEnabled: true,
          vatRate: 18,
          dataRetentionDays: 365,
          auditLogRetention: 730,
          gdprCompliance: true,
          kycRequired: true
        }
      })
    }
    fetchPoliciesData()
  }, [])

  const handleLogout = () => {
    console.log("Super Admin logging out...")
  }

  const handleSavePolicies = () => {
    console.log("Saving policy changes...")
  }

  const handleTogglePolicy = (category: string, policy: string, value: boolean) => {
    console.log(`Toggling ${category}.${policy} to ${value}`)
    setPoliciesData((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [policy]: value
      }
    }))
  }

  if (!policiesData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading policies...</p>
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
          <h1 className="text-lg font-semibold">Policies</h1>
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
                <h1 className="text-2xl font-bold text-red-700">System Policies & Controls</h1>
                <div className="flex items-center space-x-4">
                  <Button onClick={handleSavePolicies}>
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

          {/* Policies Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Cash-Out Policy Enforcement */}
            <Card className="mb-8 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Cash-Out Policy Enforcement
                </CardTitle>
                <CardDescription>
                  Configure withdrawal limits, thresholds, and approval requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="min-balance">Minimum Balance After Fees (UGX)</Label>
                      <Input 
                        id="min-balance" 
                        type="number"
                        defaultValue={policiesData.cashOutPolicies.minBalanceAfterFees}
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum amount that must remain after withdrawal</p>
                    </div>
                    <div>
                      <Label htmlFor="lock-period">Lock Period (Hours)</Label>
                      <Input 
                        id="lock-period" 
                        type="number"
                        defaultValue={policiesData.cashOutPolicies.lockPeriod}
                      />
                      <p className="text-xs text-gray-500 mt-1">Time between withdrawal requests</p>
                    </div>
                    <div>
                      <Label htmlFor="max-daily">Maximum Daily Withdrawal (UGX)</Label>
                      <Input 
                        id="max-daily" 
                        type="number"
                        defaultValue={policiesData.cashOutPolicies.maxDailyWithdrawal}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="auto-approval">Auto-Approval Threshold (UGX)</Label>
                      <Input 
                        id="auto-approval" 
                        type="number"
                        defaultValue={policiesData.cashOutPolicies.autoApprovalThreshold}
                      />
                      <p className="text-xs text-gray-500 mt-1">Amounts below this are auto-approved</p>
                    </div>
                    <div>
                      <Label htmlFor="requires-approval">Requires Approval Above (UGX)</Label>
                      <Input 
                        id="requires-approval" 
                        type="number"
                        defaultValue={policiesData.cashOutPolicies.requiresApprovalAbove}
                      />
                      <p className="text-xs text-gray-500 mt-1">Manual approval required above this amount</p>
                    </div>
                    <div className="pt-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Current Policy Summary</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Min balance: UGX {policiesData.cashOutPolicies.minBalanceAfterFees.toLocaleString()}</li>
                          <li>• Lock period: {policiesData.cashOutPolicies.lockPeriod} hours</li>
                          <li>• Auto-approval: ≤ UGX {policiesData.cashOutPolicies.autoApprovalThreshold.toLocaleString()}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disbursement Threshold Controls */}
            <Card className="mb-8 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Clock className="h-5 w-5 mr-2" />
                  Disbursement Threshold Controls
                </CardTitle>
                <CardDescription>
                  Manage payout cycles, limits, and processing times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="payout-cycles">Payout Cycles</Label>
                      <Select defaultValue={policiesData.disbursementPolicies.payoutCycles}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="min-threshold">Minimum Threshold (UGX)</Label>
                      <Input 
                        id="min-threshold" 
                        type="number"
                        defaultValue={policiesData.disbursementPolicies.minimumThreshold}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="max-hold">Maximum Hold Period (Days)</Label>
                      <Input 
                        id="max-hold" 
                        type="number"
                        defaultValue={policiesData.disbursementPolicies.maximumHold}
                      />
                    </div>
                    <div>
                      <Label htmlFor="processing-time">Processing Time (Hours)</Label>
                      <Input 
                        id="processing-time" 
                        type="number"
                        defaultValue={policiesData.disbursementPolicies.processingTime}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Settings className="h-5 w-5 mr-2" />
                    System Controls
                  </CardTitle>
                  <CardDescription>
                    Global system settings and operational controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-gray-600">Disable all business operations</p>
                    </div>
                    <Switch 
                      checked={policiesData.systemPolicies.maintenanceMode}
                      onCheckedChange={(value) => handleTogglePolicy('systemPolicies', 'maintenanceMode', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Ad Approval</Label>
                      <p className="text-sm text-gray-600">Automatically approve ad content</p>
                    </div>
                    <Switch 
                      checked={policiesData.systemPolicies.autoAdApproval}
                      onCheckedChange={(value) => handleTogglePolicy('systemPolicies', 'autoAdApproval', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Cash-Out Approval</Label>
                      <p className="text-sm text-gray-600">Auto-approve within threshold</p>
                    </div>
                    <Switch 
                      checked={policiesData.systemPolicies.autoCashOutApproval}
                      onCheckedChange={(value) => handleTogglePolicy('systemPolicies', 'autoCashOutApproval', value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-routers">Max Routers Per Business</Label>
                    <Input 
                      id="max-routers" 
                      type="number"
                      defaultValue={policiesData.systemPolicies.maxRoutersPerBusiness}
                    />
                  </div>
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (Minutes)</Label>
                    <Input 
                      id="session-timeout" 
                      type="number"
                      defaultValue={policiesData.systemPolicies.sessionTimeout}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <Lock className="h-5 w-5 mr-2" />
                    Compliance Policies
                  </CardTitle>
                  <CardDescription>
                    Legal compliance and data protection settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>VAT Collection</Label>
                      <p className="text-sm text-gray-600">Enable VAT on transactions</p>
                    </div>
                    <Switch 
                      checked={policiesData.compliancePolicies.vatEnabled}
                      onCheckedChange={(value) => handleTogglePolicy('compliancePolicies', 'vatEnabled', value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vat-rate">VAT Rate (%)</Label>
                    <Input 
                      id="vat-rate" 
                      type="number"
                      defaultValue={policiesData.compliancePolicies.vatRate}
                      disabled={!policiesData.compliancePolicies.vatEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>GDPR Compliance</Label>
                      <p className="text-sm text-gray-600">Enable data protection features</p>
                    </div>
                    <Switch 
                      checked={policiesData.compliancePolicies.gdprCompliance}
                      onCheckedChange={(value) => handleTogglePolicy('compliancePolicies', 'gdprCompliance', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>KYC Required</Label>
                      <p className="text-sm text-gray-600">Require identity verification</p>
                    </div>
                    <Switch 
                      checked={policiesData.compliancePolicies.kycRequired}
                      onCheckedChange={(value) => handleTogglePolicy('compliancePolicies', 'kycRequired', value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="data-retention">Data Retention (Days)</Label>
                    <Input 
                      id="data-retention" 
                      type="number"
                      defaultValue={policiesData.compliancePolicies.dataRetentionDays}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Deduction Audit Logs */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <FileText className="h-5 w-5 mr-2" />
                  Deduction Audit Logs Viewer
                </CardTitle>
                <CardDescription>
                  View and search transaction deduction logs by Transaction ID
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Input placeholder="Enter Transaction ID" className="flex-1" />
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Search Logs
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <p className="text-sm text-gray-600 text-center">
                      Enter a Transaction ID to view detailed deduction audit logs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <Button onClick={handleSavePolicies} size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save All Policy Changes
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
