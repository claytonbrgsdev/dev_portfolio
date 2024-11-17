import { Group } from "three";
import { useEffect, useState } from "react";
import ModelAnimator from "./ModelAnimator";
import { AnimationClip } from "three";

const AnimatedModel: React.FC<{
    scene: Group;
    animations: AnimationClip[];
    animationNames: string[];
  }> = ({ scene, animations, animationNames }) => {
    const [animationName, setAnimationName] = useState<string | undefined>(undefined);
  
    // Set the animationName to the first available animation if not already set
    useEffect(() => {
      if (animationNames.length > 0 && !animationName) {
        setAnimationName(animationNames[0]);
      }
    }, [animationNames, animationName]);
  
    return (
      <>
        {/* Animation Control Buttons */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {animationNames.map((name) => (
            <button
              key={name}
              onClick={() => setAnimationName(name)}
              style={{
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#444',
                color: '#fff',
              }}
            >
              Play {name} Animation
            </button>
          ))}
          <button
            onClick={() => setAnimationName(undefined)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#444',
              color: '#fff',
            }}
          >
            Stop Animation
          </button>
        </div>
  
        {/* Model Animator */}
        <ModelAnimator
          scene={scene}
          animations={animations}
          animationName={animationName}
          autoPlayAnimation={true}
        />
      </>
    );
  };

  export default AnimatedModel;