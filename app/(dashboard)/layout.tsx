import { Sidebar } from './_components/sidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="p-5">
        {/* breadcrumbs */}
        {children}
      </div>
    </div>
  )
}
