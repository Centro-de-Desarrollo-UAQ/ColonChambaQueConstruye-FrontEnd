interface NoteRemoveProps {
  width: number;
  height: number;
  color: string;
}

const NoteRemove = ({ width, height, color }: NoteRemoveProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 171 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M118.833 6.66602V23.3327M77.1663 6.66602V23.3327M35.4997 6.66602V23.3327M148 94.166V73.3327C148 
        45.8327 148 32.0827 139.458 23.541C130.916 14.9993 117.166 14.9993 89.6663 14.9993H64.6663C37.1663 14.9993 
        23.4163 14.9993 14.8747 23.541C6.33301 32.0827 6.33301 45.8327 6.33301 73.3327V114.999C6.33301 142.499 6.33301 
        156.249 14.8747 164.791C23.4163 173.333 37.1663 173.333 64.6663 173.333H81.333M164.666 114.999L135.5 144.166M135.5 
        144.166L106.333 173.333M135.5 144.166L164.666 173.333M135.5 144.166L106.333 114.999M43.833 114.999H77.1663M43.833 
        73.3327H110.5"
        stroke={color}
        strokeWidth="12.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NoteRemove;
