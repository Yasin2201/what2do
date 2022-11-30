import {GiPartyPopper, GiClapperboard, GiParkBench, GiMeal, GiRabbitHead} from "react-icons/gi"

export const activityTypes = [
  {
    id: 1,
    value: "TEST",
    name: "Test",
    description: "Random test activiities Random test activiities Random test activiities",
    icon: <GiRabbitHead size={40} />
  },
  {
    id: 2,
    value: "FUN",
    name: "Fun Seeking",
    description: "Amusement parks to Zoos if it's fun your seeking you'll find it here",
    icon: <GiParkBench size={40} />
  },
  {
    id: 3,
    value: "RELAX",
    name: "Relaxation",
    description: "Nice day to relax at a spa or kick back and enjoy a movie?",
    icon: <GiClapperboard size={40} />
  },
  {
    id: 4,
    value: "NIGHT",
    name: "Night Life",
    description: "Looking for somewhere to party? or just want to enjoy nightout",
    icon: <GiPartyPopper size={40} />
  },
  {
    id: 5,
    value: "FOOD",
    name: "Food & Drink",
    description: "Feeling peckish? Lets see whats available around you!",
    icon: <GiMeal size={40} />
  }
]