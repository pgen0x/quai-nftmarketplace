import Image from "next/image";
import React, { useState } from "react";
import { ScrambledAnimation } from "react-scrambled-text";

interface NftProps {
  name: string;
  image: string;
  tokenId: string;
  innerRef?: (node?: Element | null | undefined) => void;
}

interface ScrambleButtonProps {
  texts: string[];
  speed: number;
  pauseDuration: number;
}

const ScrambleButton: React.FC<ScrambleButtonProps> = ({
  texts,
  speed,
  pauseDuration,
}) => {
  const [pause, setPause] = useState(false);

  const handleMouseEnter = () => {
    setPause(true);

    setTimeout(() => {
      setPause(false);
    }, pauseDuration);
  };

  const handleMouseLeave = () => {
    setPause(false);
  };

  return (
    <button
      className="button text-white inline-flex justify-center items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ScrambledAnimation
        texts={texts}
        speed={speed}
        pauseDuration={pauseDuration}
        start={pause}
        style={{ color: "white", fontSize: "12px" }}
      />
    </button>
  );
};

const Nft: React.FC<NftProps> = ({ name, image, tokenId, innerRef }) => {
  const [pause, setPause] = useState(false);

  const handleMouseEnter = () => {
    setPause(true);

    // Automatically set pause back to false after 500ms
    setTimeout(() => {
      setPause(false);
    }, 500);
  };
  return (
    <React.Fragment>
      <div ref={innerRef}>
        <div className="flex flex-col shadow-lg border-[1px] border-white gap-4 items-center p-4 rounded-2xl">
          <div className="rounded-full ">
            <Image
              src={image}
              alt="profileImg"
              width={176}
              height={176}
              className="w-44 h-44 rounded-2xl bg-white object-cover"
            />
          </div>
          <div>
            <span className="text-white">{name}</span>{" "}
            <span className="text-white">#{tokenId}</span>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <ScrambleButton
              texts={["View Detail", "View Detail"]}
              speed={25}
              pauseDuration={500}
            />
            <ScrambleButton
              texts={["Buy Now", "Buy Now"]}
              speed={25}
              pauseDuration={500}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Nft;
