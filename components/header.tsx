import { BadgeSaving } from './badge-saving'

type HeaderProps = {
  children?: React.ReactNode
  title: string
}

export const Header = ({ children, title }: HeaderProps) => {
  return (
    <div className="flex justify-between w-full mb-8 mt-10">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl text-header">{title}</h1>
        <BadgeSaving />
      </div>
      {children}
    </div>
  )
}
