import Lottie from "react-lottie";
import animationData from "../assets/tick-lottie";

export default function TickLottie() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={50} width={50} />
    </div>
  );
}
