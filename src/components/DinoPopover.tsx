import * as Popover from "@radix-ui/react-popover";

type DinoPopoverProps = {
  name: string;
  era: string;
};

export default function DinoPopover({ name, era }: DinoPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger className="bg-white text-black px-2 py-1 rounded shadow">
        {name}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-white p-4 rounded shadow max-w-sm">
          <h3 className="font-bold">{name}</h3>
          <p>Era: {era}</p>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
