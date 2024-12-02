import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
interface DroppableZoneProps {
  text: string;
  bgColor: string;
}
export const DroppableZone = ({ text, bgColor }: DroppableZoneProps) => {
  return (
    <Card
      className={cn(
        'flex-1 p-4 bg-blue-100 flex justify-center items-center rounded-md w-full',
        bgColor,
      )}
    >
      {text}
    </Card>
  );
};
