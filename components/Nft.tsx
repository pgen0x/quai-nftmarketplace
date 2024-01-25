import React from "react";
import Image from "next/image";

interface NftProps {
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
}

const Nft: React.FC<NftProps> = ({ name, image, innerRef }) => {
  return (
    <React.Fragment>
      <div ref={innerRef}>
        <div className="flex flex-col cursor-pointer shadow-lg border-2 border-gray-500/30 border-dotted gap-4 items-center p-2 rounded-2xl">
          <div className="rounded-full m-4">
            <Image
              src={image}
              alt="profileImg"
              width={256}
              height={256}
              className="z-10 w-56 h-56 rounded-2xl bg-white object-cover"
            />
          </div>
          <div>
            <span className="text-white">{name}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Nft;
