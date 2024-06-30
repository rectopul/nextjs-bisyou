import { AccountItem } from "@/components/AccountItem"
import { Aside } from "@/components/panel/Sidebar"
import prisma from "@/lib/client"
import { UserByToken } from "@/util/auth"
import { LogOut } from "lucide-react"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import React from "react"

export const metadata = {
  title: "Painel administrativo BisYou",
  description: "Painel para administração do tema bisyou",
}

async function isLogged() {
  try {
    const cookieStore = cookies()

    const token: any = cookieStore.get("auth")

    const cookieResponse = token.value as string

    const userByToken = new UserByToken()

    const isValid = await userByToken.checkToken(cookieResponse)

    return isValid
  } catch (error) {
    return redirect("/panel/login")
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await prisma.settings.findFirst()
  const header = await headers()

  const keys = await header.get("x-pathname")

  const finalPath = keys?.split("/").at(-1)

  let pageName = ""

  switch (finalPath) {
    case "config":
      pageName = "Configurações"
      break

    case "banners":
      pageName = "Gerenciamento de Banners"
      break

    case "pages":
      pageName = "Gerenciamento de Páginas"
      break

    case "category":
      pageName = "Gerenciamento de Categoria de páginas"
      break

    case "partners":
      pageName = "Gerenciamento de Categoria de Parceiros"
      break

    case "collections":
      pageName = "Gerenciamento de Collections"
      break

    case "shops":
      pageName = "Gerenciamento de Lojas"
      break

    default:
      break
  }

  const isOnLoginPage = keys && keys.includes("panel/login")

  let userData = null

  if (!isOnLoginPage) {
    userData = await isLogged()
  }
  return (
    <html>
      <body>
        {!isOnLoginPage && userData ? (
          <div className="p-4 xl:ml-80">
            <nav className="block mb-10 border-b border-blue-gray-500/20 pb-4 w-full max-w-full bg-transparent text-white shadow-none transition-all px-0 py-1">
              <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                <div className="capitalize">
                  <nav aria-label="breadcrumb" className="w-max">
                    <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                      <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                        <a href="#/dashboard">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                            dashboard
                          </p>
                        </a>
                        <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                          /
                        </span>
                      </li>

                      <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          category
                        </p>
                      </li>
                    </ol>
                  </nav>

                  <h6 className="block mt-3 antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
                    {pageName}
                  </h6>
                </div>

                <div className="flex items-center">
                  <AccountItem user={userData} />
                  <a
                    className="align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 relative overflow-hidden"
                    type="button"
                    href="/panel/config"
                  >
                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5 text-blue-gray-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                  <a
                    className="align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 relative overflow-hidden"
                    type="button"
                    href="/panel/logout"
                  >
                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                      <LogOut size={16} strokeWidth={3} />
                    </span>
                  </a>
                </div>
              </div>
            </nav>

            <div className="min-h-screen bg-blue-gray-50/50">
              {userData && settings && (
                <Aside name={userData.name} settings={settings} />
              )}
              <div className="w-full flex flex-col">{children}</div>
            </div>
          </div>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  )
}
