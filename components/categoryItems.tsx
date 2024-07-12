
import { TbArmchair2, TbBeach, TbCameraCheck, TbPool } from "react-icons/tb";
import { MdOutlineCabin, MdTempleBuddhist } from "react-icons/md";
import { FaHouseChimneyCrack } from "react-icons/fa6";

interface iAppProps {
  name: string;
  title: string;
  icon: JSX.Element;
  description: string;
  id: number;
}

export const categoryItems: iAppProps[] = [
  {
    id: 1,
    name: "beach",
    description: "This Property is close to the Beach.",
    title: "Beach",
    icon: <TbBeach className="h-6 w-6" />,
  },

  {
    id: 4,
    name: "luxury",
    description: "This Property is considerd Luxorious",
    title: "Luxury",
    icon: <TbArmchair2 className="h-6 w-6" />,
  },
  {
    id: 5,
    name: "amazingView",
    description: "This property has an amazing View",
    title: "Amazing View",
    icon: <TbCameraCheck className="h-6 w-6" />,
  },
  {
    id: 7,
    name: "pool",
    description: "This property has an amazing Pool",
    title: "Pool",
    icon: <TbPool className="h-6 w-6" />,
  },
  {
    id: 8,
    name: "tiny",
    description: "This property is considered a tiny home",
    title: "Tiny Home",
    icon: <FaHouseChimneyCrack className="h-6 w-6" />,
  },
  {
    id: 9,
    name: "historic",
    description: "This Property is considered historic",
    title: "Historic Home",
    icon: <MdTempleBuddhist className="h-6 w-6" />,
  },
  {
    id: 10,
    name: "countryside",
    description: "This Property is located on the countryside",
    title: "Countryside",
    icon: <MdOutlineCabin className="h-6 w-6" />,
  },
];
