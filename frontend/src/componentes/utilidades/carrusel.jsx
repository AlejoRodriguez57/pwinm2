import { useState } from "react";

export default function useCarrusel(array) {
  const [posActual, setPosActual] = useState(0);

  const siguiente = () => {
    setPosActual((prev) =>
      prev < array.length - 1 ? prev + 1 : 0
    );
  };

  const anterior = () => {
    setPosActual((prev) =>
      prev > 0 ? prev - 1 : array.length - 1
    );
  };

  return {
    posActual,
    setPosActual,
    siguiente,
    anterior,
  };
}