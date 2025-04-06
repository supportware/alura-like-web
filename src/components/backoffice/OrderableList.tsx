
import React, { useState } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface OrderableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem = ({ id, children }: OrderableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

interface OrderableListProps {
  items: { id: string; [key: string]: any };
  renderItem: (item: any) => React.ReactNode;
  onOrderUpdate: (orderedIds: string[]) => Promise<boolean>;
}

export const OrderableList: React.FC<OrderableListProps> = ({ 
  items, 
  renderItem, 
  onOrderUpdate 
}) => {
  const [localItems, setLocalItems] = useState(items);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = localItems.findIndex((item) => item.id === active.id);
      const newIndex = localItems.findIndex((item) => item.id === over?.id);

      const reorderedItems = arrayMove(localItems, oldIndex, newIndex);
      setLocalItems(reorderedItems);

      try {
        const success = await onOrderUpdate(reorderedItems.map(item => item.id));
        if (!success) {
          toast.error('Falha ao atualizar a ordem');
          // Revert to original order if update fails
          setLocalItems(items);
        } else {
          toast.success('Ordem atualizada com sucesso');
        }
      } catch (error) {
        console.error('Error updating order:', error);
        toast.error('Erro ao atualizar a ordem');
        setLocalItems(items);
      }
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={localItems.map(item => item.id)} 
        strategy={verticalListSortingStrategy}
      >
        {localItems.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            {renderItem(item)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};
