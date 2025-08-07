// Mock API functions for development and testing

export interface BusinessAdmin {
  id: number
  name: string
  email: string
  phone: string
  revenue: number
  routers: number
  status: 'active' | 'pending' | 'suspended'
  performance: number
  registrationDate: string
  walletType: 'centralized' | 'decentralized'
  payoutNumber: string
}

export interface Router {
  id: string
  mac: string
  location: string
  status: 'online' | 'offline'
  sessions: number
  maxSessions: number
  heartbeat: string
  lastSeen: string
  businessId: number
}

export interface Voucher {
  id: string
  code: string
  type: string
  price: number
  status: 'active' | 'redeemed' | 'expired'
  createdDate: string
  expiryDate: string
  businessId: number
}

export interface CashOutRequest {
  id: number
  businessId: number
  businessName: string
  amount: number
  method: 'MTN' | 'Airtel'
  status: 'pending' | 'processed' | 'rejected'
  requestDate: string
  processedDate?: string
  fees: number
}

export interface AdSlot {
  id: number
  businessId: number
  businessName: string
  duration: string
  price: number
  status: 'available' | 'active' | 'expired' | 'pending'
  content?: string
  views: number
  clicks: number
  startDate?: string
  endDate?: string
}

// Mock data
const mockBusinessAdmins: BusinessAdmin[] = [
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
    payoutNumber: "+256700123456"
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
    payoutNumber: "+256750123456"
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
    payoutNumber: "+256780123456"
  }
]

const mockRouters: Router[] = [
  {
    id: "RTR001",
    mac: "AA:BB:CC:DD:EE:FF",
    location: "Main Hall",
    status: "online",
    sessions: 24,
    maxSessions: 50,
    heartbeat: "120ms",
    lastSeen: "2024-01-15T10:30:00Z",
    businessId: 1
  },
  {
    id: "RTR002",
    mac: "FF:EE:DD:CC:BB:AA",
    location: "Outdoor Area",
    status: "offline",
    sessions: 0,
    maxSessions: 50,
    heartbeat: "N/A",
    lastSeen: "2024-01-15T08:15:00Z",
    businessId: 1
  }
]

const mockVouchers: Voucher[] = [
  {
    id: "VCH001",
    code: "WIFI-1H-ABC123",
    type: "1 Hour",
    price: 500,
    status: "active",
    createdDate: "2024-01-15",
    expiryDate: "2024-02-15",
    businessId: 1
  },
  {
    id: "VCH002",
    code: "WIFI-3H-DEF456",
    type: "3 Hours",
    price: 1000,
    status: "redeemed",
    createdDate: "2024-01-14",
    expiryDate: "2024-02-14",
    businessId: 1
  }
]

// Mock API functions
export const mockApi = {
  // Business Admin APIs
  async getBusinessAdmins(): Promise<BusinessAdmin[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockBusinessAdmins
  },

  async approveBusinessAdmin(id: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const admin = mockBusinessAdmins.find(a => a.id === id)
    if (admin) {
      admin.status = 'active'
      return true
    }
    return false
  },

  async rejectBusinessAdmin(id: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const admin = mockBusinessAdmins.find(a => a.id === id)
    if (admin) {
      admin.status = 'suspended'
      return true
    }
    return false
  },

  // Router APIs
  async getRouters(businessId?: number): Promise<Router[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    return businessId 
      ? mockRouters.filter(r => r.businessId === businessId)
      : mockRouters
  },

  async updateRouterStatus(routerId: string, status: 'online' | 'offline'): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const router = mockRouters.find(r => r.id === routerId)
    if (router) {
      router.status = status
      router.lastSeen = new Date().toISOString()
      return true
    }
    return false
  },

  // Voucher APIs
  async generateVouchers(businessId: number, packageType: string, quantity: number): Promise<Voucher[]> {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const newVouchers: Voucher[] = []
    
    for (let i = 0; i < quantity; i++) {
      const voucher: Voucher = {
        id: `VCH${Date.now()}-${i}`,
        code: `WIFI-${packageType.toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        type: packageType,
        price: packageType === '1hour' ? 500 : packageType === '3hours' ? 1000 : 2000,
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        businessId
      }
      newVouchers.push(voucher)
    }
    
    return newVouchers
  },

  async redeemVoucher(code: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1500))
    const voucher = mockVouchers.find(v => v.code === code)
    if (voucher && voucher.status === 'active') {
      voucher.status = 'redeemed'
      return true
    }
    return false
  },

  // Cash-out APIs
  async processCashOut(businessId: number, amount: number, method: 'MTN' | 'Airtel'): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 3000))
    // Simulate processing with 90% success rate
    return Math.random() > 0.1
  },

  async getCashOutRequests(): Promise<CashOutRequest[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    return [
      {
        id: 1,
        businessId: 1,
        businessName: "Coffee Corner Ltd",
        amount: 35000,
        method: "MTN",
        status: "pending",
        requestDate: "2024-01-15",
        fees: 525
      },
      {
        id: 2,
        businessId: 2,
        businessName: "Tech Hub Cafe",
        amount: 25000,
        method: "Airtel",
        status: "processed",
        requestDate: "2024-01-14",
        processedDate: "2024-01-14",
        fees: 500
      }
    ]
  },

  // Ad Slot APIs
  async purchaseAdSlot(businessId: number, duration: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return Math.random() > 0.2 // 80% success rate
  },

  async submitAdContent(adSlotId: number, content: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1500))
    return true
  },

  async approveAdContent(adSlotId: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return true
  },

  async rejectAdContent(adSlotId: number, reason: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return true
  },

  // Payment simulation
  async processPayment(amount: number, provider: 'mtn' | 'airtel', phoneNumber: string): Promise<{
    success: boolean
    transactionId?: string
    error?: string
  }> {
    await new Promise(resolve => setTimeout(resolve, 5000)) // Simulate payment processing time
    
    // Simulate payment success/failure
    const success = Math.random() > 0.15 // 85% success rate
    
    if (success) {
      return {
        success: true,
        transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      }
    } else {
      return {
        success: false,
        error: "Payment failed. Please check your mobile money balance and try again."
      }
    }
  },

  // System health
  async getSystemHealth(): Promise<{
    totalRouters: number
    onlineRouters: number
    systemHealth: number
    criticalAlerts: number
  }> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      totalRouters: 156,
      onlineRouters: 142,
      systemHealth: 99.9,
      criticalAlerts: 2
    }
  }
}

// Utility functions
export const formatCurrency = (amount: number): string => {
  return `UGX ${amount.toLocaleString()}`
}

export const calculateSendingCharges = (amount: number, provider: 'mtn' | 'airtel'): number => {
  const rates = {
    mtn: 0.015, // 1.5%
    airtel: 0.02 // 2%
  }
  return Math.round(amount * rates[provider])
}

export const generateQRCode = (voucherCode: string): string => {
  // In a real implementation, this would generate an actual QR code
  return `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="white"/><text x="100" y="100" text-anchor="middle" font-family="monospace" font-size="12">${voucherCode}</text></svg>`)}`
}
