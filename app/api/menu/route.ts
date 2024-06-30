import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/client"
import { Prisma, MenuPosition } from "@prisma/client"
import { ApiErrorHandler } from "@/@types/ApiError"

/**
 *
 * @param request
 * @returns
 *
 */

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Prisma.MenusCreateInput

  try {
    if (!Object.values(MenuPosition).includes(data.position as MenuPosition)) {
      const error: ApiErrorHandler = {
        message: `position is invalid`,
        name: `error`,
      }

      return NextResponse.json(error, { status: 406 })
    }

    const menu = await prisma.menus.create({ data })

    return NextResponse.json(menu, { status: 201 })
  } catch (error) {
    console.log(`erro ao criar menu`, error)
    return Response.json(error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET() {
  try {
    const menus = await prisma.menus.findMany()
    return NextResponse.json(menus, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 })
  }
}
