
import React from "react";
import {
  FiTruck,
  FiHome,
  FiDollarSign,
  FiRepeat,
  FiShieldOff,
  FiSun,
  FiMapPin,
} from "react-icons/fi";

import { useShipping } from "../context/ShippingContext";

const iconMap = {
  truck: <FiTruck />,
  home: <FiHome />,
  dollar: <FiDollarSign />,
  repeat: <FiRepeat />,
  shield: <FiShieldOff />,
  sun: <FiSun />,
  map: <FiMapPin />,
};

const ShippingCard = () => {
  const { shippingData } = useShipping();

  return (
    <ul className="my-0">
      {shippingData.map((item) => (
        <li key={item.id} className="flex items-center py-3">
          <span className="text-xl text-gray-400 mr-4">
            {iconMap[item.icon]}
          </span>
          <p className="font-sans leading-5 font-semibold text-sm text-gray-500">
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ShippingCard;
