import { AnimationMixer, AnimationAction, AnimationClip, Group } from 'three';

// Props e tipos para o manipulador de animações
interface AnimationHandlerProps {
  animations: AnimationClip[];
  scene: Group;
  animationName?: string;
  autoPlayAnimation?: boolean;
}

interface AnimationHandlerReturn {
  play: (name: string) => void;
  stop: (name: string) => void;
  actions: { [key: string]: AnimationAction };
}

// Função para localizar uma ação de animação com base no nome
export const findAnimationAction = (
  animations: AnimationClip[],
  mixer: AnimationMixer,
  name: string
): AnimationAction | null => {
  const clip = animations.find((clip) => clip.name === name);
  return clip ? mixer.clipAction(clip) : null;
};

// Função para iniciar uma animação
export const playAnimation = (mixer: AnimationMixer, action: AnimationAction) => {
  action.reset().play();
  mixer.update(0);
};

// Função para parar uma animação
export const stopAnimation = (mixer: AnimationMixer, action: AnimationAction) => {
  action.stop();
  mixer.update(0);
};

// Hook para manipular animações
export const useAnimationHandler = ({
  animations,
  scene,
  animationName,
  autoPlayAnimation,
}: AnimationHandlerProps): AnimationHandlerReturn => {
  const mixer = new AnimationMixer(scene);

  // Localiza a ação inicial e a executa, se necessário
  const initialAction = animationName
    ? findAnimationAction(animations, mixer, animationName)
    : null;

  if (autoPlayAnimation && initialAction) {
    playAnimation(mixer, initialAction);
  }

  return {
    play: (name: string) => {
      const action = findAnimationAction(animations, mixer, name);
      if (action) playAnimation(mixer, action);
    },
    stop: (name: string) => {
      const action = findAnimationAction(animations, mixer, name);
      if (action) stopAnimation(mixer, action);
    },
    actions: animations.reduce((acc, clip) => {
      const action = mixer.clipAction(clip);
      if (action) acc[clip.name] = action;
      return acc;
    }, {} as { [key: string]: AnimationAction }),
  };
};