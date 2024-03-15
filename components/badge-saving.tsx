'use client'

import { useSavingLoading } from '@/store/saving-loading'
import { Badge } from './ui/badge'

export const BadgeSaving = () => {
  const isLoading = useSavingLoading((state) => state.isLoading)

  return <>{isLoading && <Badge loading={true}>Saving...</Badge>}</>
}
