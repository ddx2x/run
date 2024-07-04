import { useDrag } from 'react-dnd';

const ItemTypes = {
  ITEM: 'chat'
}

const DraggableItem = ({ id, left, top, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { id, left, top, children },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <div
      ref={drag}
      className='rounded-2xl'
      style={{
        position: 'absolute',
        left,
        top,
        cursor: 'move',
        opacity: isDragging ? 0 : 1
      }}
    >
      {children}
    </div>
  )
}

export default DraggableItem