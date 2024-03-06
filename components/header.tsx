type HeaderProps = {
  children?: React.ReactNode
  title: string
}

export const Header = ({ children, title }: HeaderProps) => {
  return (
    <div className="flex justify-between w-full mb-8 mt-10">
      <h1 className="text-2xl text-header">{title}</h1>
      {children}
    </div>
  )
}
