// Motion's animation code, split out so it downloads after the page has
// loaded instead of with it. The menu doesn't need it until it's opened.
import { domAnimation } from "motion/react";

export default domAnimation;
