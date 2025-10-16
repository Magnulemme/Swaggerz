declare module 'three-stdlib' {
  import * as THREE from 'three';

  export namespace SkeletonUtils {
    export function clone(source: THREE.Object3D): THREE.Object3D;
  }
}
