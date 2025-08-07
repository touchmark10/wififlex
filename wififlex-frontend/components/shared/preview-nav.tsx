"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, Shield, Building2, Users, Eye } from 'lucide-react'
import Link from "next/link"

export function PreviewNav() {
  return (
    <Card className="w-full max-w-4xl mx-auto mb-8 border-2 border-blue-200 bg-blue-50">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center text-blue-800">
          <Eye className="h-6 w-6 mr-2" />
          WiFiFlex Preview Navigation
        </CardTitle>
        <p className="text-sm text-blue-600">Quick access to all pages for preview</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Public Pages */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">🌐 Public Pages</h3>
            <Link href="/captive-portal" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Wifi className="h-4 w-4 mr-2" />
                Captive Portal
              </Button>
            </Link>
          </div>

          {/* Business Admin */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">👨‍💼 Business Admin</h3>
            <Link href="/login" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                Login Page
              </Button>
            </Link>
            <Link href="/dashboard" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Super Admin */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">🛡️ Super Admin</h3>
            <Link href="/superadmin/login" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Super Login
              </Button>
            </Link>
            <Link href="/superadmin/dashboard" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Super Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Preview Mode:</strong> Authentication is temporarily disabled. 
            You can access all pages directly for preview purposes.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
