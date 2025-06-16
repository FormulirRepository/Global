"use client"

import { useState } from "react"
import { Copy, Link, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function LinkGenerator() {
  const { toast } = useToast()
  const [adminId] = useState("ADMIN-" + Math.random().toString(36).substr(2, 9))
  const [consentLink] = useState(`${window.location.origin}/consent?ref=${adminId}`)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Link Disalin",
        description: "Link formulir persetujuan telah disalin ke clipboard.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyalin link.",
        variant: "destructive",
      })
    }
  }

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Formulir Persetujuan Pemantauan Perangkat",
          text: "Silakan isi formulir persetujuan untuk pemantauan perangkat",
          url: consentLink,
        })
      } catch (error) {
        copyToClipboard(consentLink)
      }
    } else {
      copyToClipboard(consentLink)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-6 w-6 text-blue-600" />
              Generator Link Formulir Persetujuan
            </CardTitle>
            <CardDescription>
              Buat dan bagikan link formulir persetujuan untuk pengguna yang akan dipantau
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="adminId">ID Admin</Label>
              <Input id="adminId" value={adminId} readOnly className="bg-gray-50" />
              <p className="text-xs text-gray-500 mt-1">ID unik untuk melacak persetujuan dari admin ini</p>
            </div>

            <div>
              <Label htmlFor="consentLink">Link Formulir Persetujuan</Label>
              <div className="flex gap-2">
                <Input id="consentLink" value={consentLink} readOnly className="bg-gray-50" />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(consentLink)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Bagikan link ini kepada pengguna yang perangkatnya akan dipantau
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={shareLink} className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan Link
              </Button>
              <Button variant="outline" onClick={() => copyToClipboard(consentLink)} className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                Salin Link
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Cara Penggunaan:</h3>
              <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                <li>Salin link formulir persetujuan di atas</li>
                <li>Bagikan link kepada pengguna melalui email, WhatsApp, atau cara lain</li>
                <li>Pengguna mengisi formulir dan memberikan persetujuan</li>
                <li>Anda akan menerima notifikasi real-time di dashboard admin</li>
                <li>Pemantauan perangkat akan dimulai secara otomatis</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Penting:</h3>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Pastikan pengguna memahami tujuan pemantauan</li>
                <li>• Jelaskan bahwa ini untuk keperluan legal (parental control/perusahaan)</li>
                <li>• Semua pemantauan dilakukan dengan transparansi penuh</li>
                <li>• Tidak ada fitur tersembunyi dalam sistem ini</li>
              </ul>
            </div>

            <div className="text-center">
              <Button variant="outline" asChild>
                <a href="/admin">Kembali ke Dashboard Admin</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
