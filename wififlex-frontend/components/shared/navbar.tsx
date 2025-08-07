import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, Shield, Settings } from 'lucide-react'

interface NavbarProps {
  title: string
  userRole: "business-admin" | "super-admin"
  onSettingsClick?: () => void
}

export function Navbar({ title, userRole, onSettingsClick }: NavbarProps) {
  const isSuper = userRole === "super-admin"
  
  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick()
    } else {
      console.log('Settings clicked')
    }
  }
  
  return (
    <header className={`bg-white shadow-sm border-b ${isSuper ? 'border-red-200' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {isSuper ? (
              <Shield className="h-8 w-8 text-red-600 mr-3" />
            ) : (
              <Wifi className="h-8 w-8 text-blue-600 mr-3" />
            )}
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={isSuper ? "destructive" : "outline"}>
              {isSuper ? "Super Admin" : "Business Admin"}
            </Badge>
            <Button variant="outline" size="sm" onClick={handleSettingsClick}>
              <Settings className="h-4 w-4 mr-2" />
              {isSuper ? "System Settings" : "Settings"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
