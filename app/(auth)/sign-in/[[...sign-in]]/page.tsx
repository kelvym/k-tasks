import { SignIn } from '@clerk/nextjs'

type PageProps = {
  searchParams: Record<string, string>
}

export default function Page({ searchParams }: PageProps) {
  const isTestingMode = searchParams?.test === 'true'

  return (
    <div>
      {!!isTestingMode && (
        <div className="flex flex-col items-center text-left bg-background-secondary mb-3 p-2">
          <span>email: test@gmail.com</span>
          <span>password: test</span>
        </div>
      )}
      <SignIn />
    </div>
  )
}
