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
import { Users, Wifi, DollarSign, Settings, BarChart3, Menu, Bell, User, Edit, QrCode, Upload, Router, FileText, HelpCircle, LogOut, Globe, Phone, Mail, MessageCircle, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SupportPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
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

  const handleLogout = () => {
    console.log("Logging out...")
  }

  const tickets = [
    { 
      id: "TK-001", 
      subject: "Router connectivity issues", 
      status: "open", 
      priority: "high", 
      created: "2024-01-15", 
      lastUpdate: "2 hours ago",
      category: "Technical"
    },
    { 
      id: "TK-002", 
      subject: "Payment processing delay", 
      status: "in-progress", 
      priority: "medium", 
      created: "2024-01-14", 
      lastUpdate: "1 day ago",
      category: "Billing"
    },
    { 
      id: "TK-003", 
      subject: "Feature request - Multi-language", 
      status: "resolved", 
      priority: "low", 
      created: "2024-01-12", 
      lastUpdate: "3 days ago",
      category: "Feature Request"
    }
  ]

  const faqs = [
    {
      question: "How do I reset my router password?",
      answer: "Go to Router Management, select your router, and click 'Reset Password'. You'll receive a new password via SMS."
    },
    {
      question: "Why are my vouchers not working?",
      answer: "Check if the voucher is still valid and hasn't expired. Also ensure your router is online and properly configured."
    },
    {
      question: "How do I withdraw my earnings?",
      answer: "Go to Settings > Payment Settings and ensure your mobile money details are correct. Withdrawals are processed within 24 hours."
    },
    {
      question: "Can I customize my captive portal?",
      answer: "Yes! Go to Portal Management to customize themes, add your logo, and configure packages."
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600'
      case 'in-progress': return 'text-yellow-600'
      case 'resolved': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
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
          <h1 className="text-lg font-semibold">Support</h1>
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
                <h1 className="text-2xl font-bold text-gray-900">Support & Help</h1>
                <div className="flex items-center space-x-4">
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

          {/* Support Content */}
          <main className="flex-1 p-4 lg:p-8">
            {/* Quick Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Call Support</h3>
                  <p className="text-sm text-gray-600 mb-3">Get immediate help</p>
                  <p className="font-medium text-blue-600">+256 700 123 456</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-gray-600 mb-3">Response within 24hrs</p>
                  <p className="font-medium text-green-600">support@wififlex.com</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-gray-600 mb-3">Chat with our team</p>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create Support Ticket */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Create Support Ticket
                  </CardTitle>
                  <CardDescription>
                    Submit a detailed support request for technical assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ticket-subject">Subject</Label>
                    <Input id="ticket-subject" placeholder="Brief description of your issue" />
                  </div>
                  <div>
                    <Label htmlFor="ticket-category">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="account">Account Management</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ticket-priority">Priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ticket-description">Description</Label>
                    <Textarea 
                      id="ticket-description" 
                      placeholder="Please provide detailed information about your issue..."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </Button>
                </CardContent>
              </Card>

              {/* My Support Tickets */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    My Support Tickets
                  </CardTitle>
                  <CardDescription>
                    Track the status of your submitted support requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{ticket.subject}</h4>
                            <p className="text-sm text-gray-600">#{ticket.id} • {ticket.category}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={
                                ticket.status === 'resolved' ? 'default' : 
                                ticket.status === 'in-progress' ? 'secondary' : 'outline'
                              }
                            >
                              {ticket.status}
                            </Badge>
                            <Badge 
                              variant="outline"
                              className={getPriorityColor(ticket.priority)}
                            >
                              {ticket.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Created: {ticket.created}</span>
                          <span>Updated: {ticket.lastUpdate}</span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Tickets
                  </Button>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Find quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{faq.question}</h4>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All FAQs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>

          {/* Mobile Sticky Bottom Action Bar */}
          <div className="lg:hidden bg-white border-t border-gray-200 p-4 sticky bottom-0">
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm">
                <FileText className="h-4 w-4 mr-1" />
                New Ticket
              </Button>
              <Link href="/dashboard">
                <Button size="sm" variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
