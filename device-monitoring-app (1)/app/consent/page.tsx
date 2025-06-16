"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, MapPin, Battery, Monitor, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ConsentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    monitoringConsent: false,
    finalConsent: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.finalConsent) {
      toast({
        title: "Persetujuan Diperlukan",
        description: "Anda harus memberikan persetujuan eksplisit untuk melanjutkan.",
        variant: "destructive",
      })
      return
    }

    if (!formData.monitoringConsent) {
      toast({
        title: "Pilih Minimal Satu Fitur",
        description: "Pilih minimal satu jenis pemantauan yang diizinkan.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Persetujuan Berhasil",
          description: "Admin telah diberitahu dan pemantauan akan dimulai.",
        })
        router.push("/user-dashboard")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan persetujuan.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Website pesan bucin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama yang lagi kangen</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="purpose">Isi Pesan</Label>
                  <Textarea
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="Contoh: Kamu kangen banget sama dia, pengen tahu kabarnya, atau mau kasih tahu sesuatu yang penting."
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Lagi kangen banget…</h3>
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Fungsi: Kalau dicentang, kamu akan tahu bahwa isi pesannya dikirim dengan rasa kangen (bisa tambahkan semacam auto-tag atau efek di tampilannya).</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="monitoring"
                    checked={formData.monitoringConsent}
                    onCheckedChange={(checked) => setFormData({ ...formData, monitoringConsent: checked as boolean })}
                  />
                  <Label htmlFor="monitoring" className="font-medium">
                    Kangen
                  </Label>
                </div>
              </div>


              <div className="flex items-center space-x-2">
                <Checkbox
                  id="finalConsent"
                  checked={formData.finalConsent}
                  onCheckedChange={(checked) => setFormData({ ...formData, finalConsent: checked as boolean })}
                />
                <Label htmlFor="finalConsent" className="text-sm">
                  <strong>Ceklis bila ingin mengirim
                </Label>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Kirim
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
