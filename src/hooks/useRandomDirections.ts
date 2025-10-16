import { useCallback, useRef } from 'react';

export type Direction = 'left' | 'right' | 'top' | 'bottom';

export interface DirectionConfig {
  initial: { x: string; y: string };
  animate: { x: string; y: string };
  exit: { x: string; y: string };
  parallax: {
    initial: { x: string; y: string };
    animate: { x: string; y: string };
    exit: { x: string; y: string };
  };
}

const DIRECTION_CONFIGS: Record<Direction, DirectionConfig> = {
  left: {
    initial: { x: "-110%", y: "0%" },
    animate: { x: "0%", y: "0%" },
    exit: { x: "110%", y: "0%" },
    parallax: {
      initial: { x: "20%", y: "0%" },
      animate: { x: "0%", y: "0%" },
      exit: { x: "-20%", y: "0%" }
    }
  },
  right: {
    initial: { x: "110%", y: "0%" },
    animate: { x: "0%", y: "0%" },
    exit: { x: "-110%", y: "0%" },
    parallax: {
      initial: { x: "-20%", y: "0%" },
      animate: { x: "0%", y: "0%" },
      exit: { x: "20%", y: "0%" }
    }
  },
  top: {
    initial: { x: "0%", y: "-110%" },
    animate: { x: "0%", y: "0%" },
    exit: { x: "0%", y: "110%" },
    parallax: {
      initial: { x: "0%", y: "20%" },
      animate: { x: "0%", y: "0%" },
      exit: { x: "0%", y: "-20%" }
    }
  },
  bottom: {
    initial: { x: "0%", y: "110%" },
    animate: { x: "0%", y: "0%" },
    exit: { x: "0%", y: "-110%" },
    parallax: {
      initial: { x: "0%", y: "-20%" },
      animate: { x: "0%", y: "0%" },
      exit: { x: "0%", y: "20%" }
    }
  }
};

const DIRECTIONS: Direction[] = ['left', 'right', 'top', 'bottom'];

export const useRandomDirections = () => {
  // Memorizza la direzione di uscita per ogni carta (indice)
  const exitDirectionsRef = useRef<Map<number, Direction>>(new Map());
  
  // Memorizza l'ultima direzione di uscita usata
  const lastExitRef = useRef<Direction>('left');
  
  // Flag per sapere se è la prima carta
  const isFirstCardRef = useRef<boolean>(true);

  const generateRandomDirection = useCallback((): Direction => {
    const randomIndex = Math.floor(Math.random() * DIRECTIONS.length);
    return DIRECTIONS[randomIndex];
  }, []);

  // Ottieni o genera la direzione di uscita per una carta
  const getOrCreateExitDirection = useCallback((cardIndex: number, forcedDirection?: Direction): Direction => {
    if (forcedDirection) {
      exitDirectionsRef.current.set(cardIndex, forcedDirection);
      return forcedDirection;
    }
    
    let exitDir = exitDirectionsRef.current.get(cardIndex);
    
    if (!exitDir) {
      exitDir = generateRandomDirection();
      exitDirectionsRef.current.set(cardIndex, exitDir);
    }
    
    return exitDir;
  }, [generateRandomDirection]);

  // Ottieni le configurazioni per la transizione corrente
  const getTransitionConfigs = useCallback((
    currentIndex: number, 
    previousIndex: number | null,
    forcedDirection?: Direction
  ) => {
    // Se è la prima carta, nessuna animazione di entrata
    if (isFirstCardRef.current && previousIndex === null) {
      isFirstCardRef.current = false;
      const exitDirection = getOrCreateExitDirection(currentIndex, forcedDirection);
      
      return {
        enter: {
          initial: { x: "0%", y: "0%" },
          animate: { x: "0%", y: "0%" },
          exit: { x: "0%", y: "0%" },
          parallax: {
            initial: { x: "0%", y: "0%" },
            animate: { x: "0%", y: "0%" },
            exit: { x: "0%", y: "0%" }
          }
        },
        exit: DIRECTION_CONFIGS[exitDirection]
      };
    }
    
    // Direzione di entrata: STESSA direzione dell'uscita precedente per continuità
    let enterDirection: Direction;
    
    if (previousIndex !== null) {
      const previousExitDir = getOrCreateExitDirection(previousIndex, forcedDirection);
      enterDirection = previousExitDir; // USA LA STESSA DIREZIONE, NON L'OPPOSTA!
      lastExitRef.current = previousExitDir;
    } else {
      enterDirection = lastExitRef.current;
    }
    
    // Direzione di uscita: forced o random per questa carta
    const exitDirection = getOrCreateExitDirection(currentIndex, forcedDirection);
    
    return {
      enter: DIRECTION_CONFIGS[enterDirection],
      exit: DIRECTION_CONFIGS[exitDirection]
    };
  }, [getOrCreateExitDirection]);

  // Reset delle direzioni memorizzate (utile se vuoi rigenerare)
  const resetDirections = useCallback(() => {
    exitDirectionsRef.current.clear();
    lastExitRef.current = 'left';
  }, []);

  return {
    getTransitionConfigs,
    resetDirections
  };
};