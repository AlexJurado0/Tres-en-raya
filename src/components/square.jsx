export const Square = ({ children, isSelectd, updateBoard, index }) => {
  const className = `square ${isSelectd ? 'is-selected' : ''} `

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}