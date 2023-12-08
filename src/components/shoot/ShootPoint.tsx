import { Box } from "@mui/material";
import { percent, px } from "csx";
import { Shoot } from "src/models/Shoot";
import { getColorShoot } from "src/utils/calcul";

interface Props {
  shoot: Shoot;
  rotate?: "left" | "right";
}

export const ShootPoint = ({ shoot, rotate }: Props) => {
  const color = getColorShoot(shoot.time);
  let x = shoot.x;
  let y = shoot.y;
  if (rotate) {
    if (rotate === "left") {
      x = shoot.y;
      y = 100 - shoot.x;
    } else {
      x = 100 - shoot.y;
      y = shoot.x;
    }
  }

  return (
    <Box
      sx={{
        position: "absolute",
        left: percent(x),
        top: percent(y),
        transform: "translate(-50%, -50%)",
        backgroundColor: color,
        width: px(12),
        height: px(12),
        border: `3px solid ${color}`,
        borderRadius: px(6),
        boxShadow: "0 0 0 2px #fff",
      }}
    />
  );
};
