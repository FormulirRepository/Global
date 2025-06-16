import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Simulasi penyimpanan ke database
    console.log("Persetujuan baru diterima:", data)

    // Simulasi notifikasi real-time ke admin
    // Dalam implementasi nyata, gunakan WebSocket atau Server-Sent Events
    console.log("Mengirim notifikasi ke admin...")

    // Simulasi penyimpanan data
    const consentRecord = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      purpose: data.purpose,
      monitoringConsent: data.monitoringConsent,
      deviceId: `DEVICE-${Date.now()}`, // Auto-generate device ID
      timestamp: new Date().toISOString(),
      status: "active",
      permissions: {
        gpsTracking: true,
        batteryMonitoring: true,
        screenSharing: true,
      },
    }

    return NextResponse.json({
      success: true,
      message: "Persetujuan berhasil disimpan",
      consentId: consentRecord.id,
    })
  } catch (error) {
    console.error("Error saving consent:", error)
    return NextResponse.json({ success: false, message: "Gagal menyimpan persetujuan" }, { status: 500 })
  }
}
