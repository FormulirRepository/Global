import Link from "next/link"
import { Shield, Users, Monitor, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sistem Pemantauan Perangkat Legal</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform pemantauan perangkat yang transparan dengan sistem persetujuan eksplisit untuk parental control dan
            pemantauan perangkat perusahaan
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                Untuk Pengguna
              </CardTitle>
              <CardDescription>Berikan izin pemantauan dengan persetujuan eksplisit</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Sistem persetujuan yang jelas dan transparan. Pemantauan mencakup GPS, baterai, dan layar.
              </p>
              <Link href="/consent">
                <Button className="w-full">Formulir Persetujuan</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-6 w-6 text-green-600" />
                Untuk Admin
              </CardTitle>
              <CardDescription>Dashboard pemantauan dan manajemen perangkat</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Pantau perangkat yang telah memberikan izin eksplisit dengan dashboard real-time yang komprehensif.
              </p>
              <Link href="/admin">
                <Button variant="outline" className="w-full">
                  Dashboard Admin
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-600" />
                Generator Link
              </CardTitle>
              <CardDescription>Buat link formulir untuk dibagikan ke pengguna</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Generate link formulir persetujuan yang dapat dibagikan kepada pengguna melalui berbagai platform.
              </p>
              <Link href="/link-generator">
                <Button variant="outline" className="w-full">
                  Buat Link
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Fitur Utama
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Persetujuan Sederhana</h3>
              <p className="text-gray-600 text-sm">Satu checkbox untuk semua jenis pemantauan</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Monitor className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Dashboard Real-time</h3>
              <p className="text-gray-600 text-sm">Pemantauan baterai, GPS, dan layar secara real-time</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Settings className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Kontrol Akses</h3>
              <p className="text-gray-600 text-sm">Pencabutan akses kapan saja oleh pengguna</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Penting: Penggunaan Legal</h3>
          <p className="text-yellow-700 text-sm">
            Aplikasi ini dirancang untuk penggunaan legal seperti parental control atau pemantauan perangkat perusahaan
            dengan persetujuan eksplisit. Tidak ada fitur tersembunyi atau penyamaran. Semua aktivitas pemantauan
            dilakukan dengan transparansi penuh.
          </p>
        </div>
      </div>
    </div>
  )
}
