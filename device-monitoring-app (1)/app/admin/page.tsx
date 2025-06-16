"use client"

import { useState, useEffect } from "react"
import { Bell, Users, MapPin, Battery, Monitor, Shield, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface Device {
  id: string
  name: string
  email: string
  status: "online" | "offline"
  battery: number
  location: { lat: number; lng: number; address: string }
  consentDate: string
  lastSeen: string
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "online",
      battery: 85,
      location: {
        lat: -6.2088,
        lng: 106.8456,
        address: "Jakarta, Indonesia",
      },
      consentDate: "15 Januari 2024",
      lastSeen: "2 menit yang lalu",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "online",
      battery: 42,
      location: {
        lat: -6.1751,
        lng: 106.865,
        address: "Bekasi, Indonesia",
      },
      consentDate: "14 Januari 2024",
      lastSeen: "5 menit yang lalu",
    },
  ])

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      message: "John Doe memberikan persetujuan pemantauan",
      time: "2 menit yang lalu",
      type: "consent",
    },
    {
      id: "2",
      message: "Baterai Jane Smith rendah (42%)",
      time: "10 menit yang lalu",
      type: "warning",
    },
  ])

  const revokeAccess = async (deviceId: string) => {
    try {
      const response = await fetch("/api/revoke-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId }),
      })

      if (response.ok) {
        setDevices(devices.filter((device) => device.id !== deviceId))
        toast({
          title: "Akses Dicabut",
          description: "Akses pemantauan telah berhasil dicabut.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mencabut akses.",
        variant: "destructive",
      })
    }
  }

  const dismissNotification = (notificationId: string) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId))
  }

  // Simulasi update real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prevDevices) =>
        prevDevices.map((device) => ({
          ...device,
          battery: Math.max(0, device.battery - Math.random() * 2),
          location: {
            ...device.location,
            lat: device.location.lat + (Math.random() - 0.5) * 0.001,
            lng: device.location.lng + (Math.random() - 0.5) * 0.001,
          },
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Dashboard Admin - Pemantauan Perangkat
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Notifikasi Real-time */}
        {notifications.length > 0 && (
          <Card className="mb-6 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Notifikasi Real-time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => dismissNotification(notification.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistik */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Perangkat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{devices.length}</div>
              <p className="text-xs text-gray-500">{devices.filter((d) => d.status === "online").length} online</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Rata-rata Baterai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(devices.reduce((acc, d) => acc + d.battery, 0) / devices.length)}%
              </div>
              <p className="text-xs text-gray-500">Semua perangkat aktif</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Perangkat Aktif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {devices.filter((d) => d.status === "online").length}
              </div>
              <p className="text-xs text-gray-500">Sedang dipantau</p>
            </CardContent>
          </Card>
        </div>

        {/* Daftar Perangkat */}
        <div className="space-y-6">
          {devices.map((device) => (
            <Card key={device.id} className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      {device.name}
                      <Badge variant={device.status === "online" ? "default" : "secondary"}>{device.status}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {device.email} • {device.deviceId}
                    </CardDescription>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => revokeAccess(device.id)}>
                    Cabut Akses
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Status Baterai */}
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Battery className="h-4 w-4" />
                      Status Baterai
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            device.battery > 50 ? "bg-green-500" : device.battery > 20 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${device.battery}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{Math.round(device.battery)}%</span>
                    </div>
                  </div>

                  {/* Lokasi GPS */}
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Lokasi Terkini
                    </h4>
                    <p className="text-sm text-gray-600">{device.location.address}</p>
                    <p className="text-xs text-gray-500">
                      {device.location.lat.toFixed(4)}, {device.location.lng.toFixed(4)}
                    </p>
                  </div>

                  {/* Screen Sharing */}
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      Layar Real-time
                    </h4>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <Monitor className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">Simulasi tampilan layar</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Lihat Layar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    Persetujuan diberikan: {device.consentDate} • Terakhir terlihat: {device.lastSeen}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">Pemantauan Penuh</Badge>
                    <Badge variant="outline">Semua Fitur Aktif</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {devices.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Perangkat Terdaftar</h3>
              <p className="text-gray-500">Perangkat akan muncul di sini setelah pengguna memberikan persetujuan.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
