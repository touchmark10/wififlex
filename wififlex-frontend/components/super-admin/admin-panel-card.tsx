import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TypeIcon as type, LucideIcon } from 'lucide-react'

interface AdminPanelCardProps {
  title: string
  description: string
  icon: LucideIcon
  actions: Array<{
    label: string
    icon: LucideIcon
    onClick: () => void
  }>
}

export function AdminPanelCard({ title, description, icon: Icon, actions }: AdminPanelCardProps) {
  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center text-red-700">
          <Icon className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <Button 
              key={index}
              className="w-full justify-start" 
              variant="outline"
              onClick={action.onClick}
            >
              <action.icon className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
