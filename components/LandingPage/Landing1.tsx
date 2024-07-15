import GradualSpacing from "../magicui/gradual-spacing";
import TextComponent from "../TextComp";

export default function LandingPart1() {
  return (
    <div className="flex justify-center">
      <GradualSpacing
        text="Discover, Apply"
        className="text-8xl font-kanit mt-28"
      />
      <GradualSpacing
        text=",Grow"
        className="text-8xl font-kanit mt-28"
        duration={3}
      />
    </div>
  );
}
