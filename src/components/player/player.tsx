import * as React from 'react';

interface Props {
  active?: boolean;
  src: string;
  img: string;
}

const Player = ({active, src, img}: Props) => {
  const renderePlayer = (
    <div className="player">
      <video src={src} className="player__video" poster={img} autoPlay muted></video>
    </div>
  );

  return active ? renderePlayer : null;
};

export default React.memo(Player);


