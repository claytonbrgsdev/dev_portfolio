// src/three/utils/modelUtils.ts

import { Object3D, Material, Mesh, AnimationClip } from 'three';
import { GLTF } from 'three-stdlib'; // Updated import

/**
 * Interface representing a node in the object hierarchy.
 */
export interface HierarchyNode {
  name: string;
  type: string;
  children: HierarchyNode[];
}

/**
 * Extracts the names of all animations available in the model.
 * @param gltf - The loaded GLTF model.
 * @returns An array of animation names.
 */
export const getAnimationNames = (gltf: GLTF): string[] => {
  return gltf.animations.map((animation: AnimationClip) => animation.name);
};

/**
 * Recursively extracts all unique materials used in the model.
 * @param object - The root object (usually gltf.scene).
 * @returns An array of unique materials.
 */
export const getMaterialList = (object: Object3D): Material[] => {
  const materialsSet = new Set<Material>();

  object.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => materialsSet.add(material));
      } else {
        materialsSet.add(mesh.material);
      }
    }
  });

  return Array.from(materialsSet);
};

/**
 * Validates the integrity of a loaded model.
 * @param gltf - The loaded GLTF model.
 * @returns True if the model is valid, false otherwise.
 */
export const validateModel = (gltf: GLTF): boolean => {
  // Basic validation: Check if scene exists
  if (!gltf.scene) {
    console.error('Model validation failed: No scene found in GLTF.');
    return false;
  }

  // Additional validation checks can be added here
  return true;
};

/**
 * Extracts a hierarchical representation of the object's children.
 * @param object - The root object (usually gltf.scene).
 * @returns An array representing the object hierarchy.
 */
export const getObjectHierarchy = (object: Object3D): HierarchyNode[] => {
  const hierarchy: HierarchyNode[] = [];

  object.children.forEach((child) => {
    const node: HierarchyNode = {
      name: child.name,
      type: child.type,
      children: getObjectHierarchy(child),
    };
    hierarchy.push(node);
  });

  return hierarchy;
};