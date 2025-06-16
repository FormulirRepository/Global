"use client"

import { useState } from "react"
import { Shield, MapPin, Battery, Monitor } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UserDashboard() {
  const [monitoringStatus] = useState({
    isActive: true,
    startDate: "15 Januari 2024",
    permissions: ["GPS Tracking", "Battery Monitoring", "Screen Sharing"],
  })

  const [isMonitoring] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Dashboard Pengguna - Kontrol Pemantauan
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Status Pemantauan */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Status Pemantauan
              <Badge variant={isMonitoring ? "default" : "secondary"}>{isMonitoring ? "Aktif" : "Nonaktif"}</Badge>
            </CardTitle>
            <CardDescription>Anda memiliki kontrol penuh untuk mengelola izin pemantauan</CardDescription>
          </CardHeader>
          <CardContent>
            {isMonitoring ? (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-green-800 text-sm">
                  Pemantauan perangkat sedang aktif sesuai dengan izin yang Anda berikan. Anda dapat mencabut izin kapan
                  saja menggunakan kontrol di bawah.
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Pemantauan perangkat tidak aktif. Semua izin telah dicabut.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Kontrol Izin Individual */}
        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-semibold">Status Pemantauan Aktif</h2>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-700 mb-2">Pemantauan Aktif</h3>
                <p className="text-gray-600 mb-4">
                  Semua jenis pemantauan telah diaktifkan sejak {monitoringStatus.startDate}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">GPS Tracking</p>
                    <Badge className="mt-1">Aktif</Badge>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <Battery className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Battery Monitor</p>
                    <Badge className="mt-1">Aktif</Badge>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <Monitor className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Screen Sharing</p>
                    <Badge className="mt-1">Aktif</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informasi Kontak */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informasi Pemantauan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Pemantauan perangkat aktif sesuai persetujuan yang telah diberikan</p>
              <p>• Semua aktivitas pemantauan dilakukan dengan transparansi penuh</p>
              <p>• Data pemantauan hanya digunakan sesuai tujuan yang telah disepakati</p>
              <p>• Untuk pertanyaan atau bantuan, hubungi administrator</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
