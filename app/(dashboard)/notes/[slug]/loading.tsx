import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <Skeleton className="h-8 w-64 mb-28" />
      <div className="flex flex-col justify-center items-center pb-14">
        <div className="xl:max-w-6xl lg:max-w-2xl w-full">
          <Skeleton className="h-14 w-full mb-5" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </>
  )
}
