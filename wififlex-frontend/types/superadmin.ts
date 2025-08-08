export interface BusinessAdmin {
  id: number
  name: string
  email: string
  phone: string
  status: 'pending' | 'active' | 'suspended'
  revenue: number
  routers: number
  performance: number
  registrationDate: string
  walletType: 'centralized' | 'decentralized'
  payoutNumber: string
  lastLogin: string | null
}

export interface PlatformStats {
  totalRevenue: number
  vatCollected: number
  platformFees: number
  netPayouts: number
  activeBusinesses: number
  monthlyGrowth: number
}

export interface RouterHealth {
  totalRouters: number
  onlineRouters: number
  offlineRouters: number
  systemHealth: number
  averageLoad: number
  criticalAlerts: number
}

export interface CashOutRequest {
  id: number
  business: string
  amount: number
  method: string
  date: string
  status: 'pending' | 'processed' | 'rejected'
}