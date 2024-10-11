import Image from "next/image";

export const Footer: React.FC = (): React.ReactNode => {
  return (
    <div className="col-span-2">
      <Image
        src={"https://i.scdn.co/image/ab67616d0000485126f20b4d67c0c7b0f137ce4f"}
        width={56}
        height={56}
        alt="Album Image"
      />
    </div>
  );
};
