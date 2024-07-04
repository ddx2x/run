
import { useState } from 'react'
import { useDrop } from 'react-dnd'
import Chat from '../chat/chat'
import DraggableItem from './draggable-item'

const ItemTypes = {
  ITEM: 'chat'
}

const DroppableContainer = ({children}) => {
  const [left, setLeft] = useState(100)
  const [top, setTop] = useState(50)

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      setLeft(left)
      setTop(top)
    }
  })

  return (
    <div  ref={drop} style={{width: '100%', height: '100%'}}>
      {children}
      <DraggableItem
        key={ItemTypes.ITEM} id={ItemTypes.ITEM} left={left} top={top}>
        <div className='bg-slate-300' >
          <Chat />
        </div>
      </DraggableItem>
    </div>
  )
}

export default DroppableContainer