import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { deviceId } = await request.json()

    // Simulasi pencabutan akses dari database
    console.log("Mencabut akses untuk device:", deviceId)

    // Simulasi notifikasi ke pengguna
    console.log("Mengirim notifikasi pencabutan akses ke pengguna...")

    return NextResponse.json({
      success: true,
      message: "Akses berhasil dicabut",
    })
  } catch (error) {
    console.error("Error revoking access:", error)
    return NextResponse.json({ success: false, message: "Gagal mencabut akses" }, { status: 500 })
  }
}
