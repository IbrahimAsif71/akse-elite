<script setup lang="ts">
import { shallowRef } from 'vue'
import { useMouse } from '@vueuse/core'
import * as THREE from 'three'

const particlePositions = new Float32Array(
  Array.from({ length: 2100 }, () => (Math.random() - 0.5) * 10)
)
const { x, y } = useMouse()
const group = shallowRef<THREE.Group | null>(null)

const onLoop = () => {
  if (!group.value) return
  const w = window.innerWidth || 1
  const h = window.innerHeight || 1
  const nx = (x.value / w) * 2 - 1
  const ny = (y.value / h) * 2 - 1

  // subtle “physics” tilt
  group.value.rotation.y = nx * 0.25
  group.value.rotation.x = -ny * 0.15

  // slow drift
  group.value.rotation.z += 0.002
}
</script>

<template>
  <div class="stage">
    <TresCanvas :alpha="true" :clear-color="null" window-size>
      <TresPerspectiveCamera :position="[0, 0, 7]" :fov="45" />
      <TresAmbientLight :intensity="0.7" />
      <TresDirectionalLight :position="[3, 4, 6]" :intensity="1.2" />

      <TresGroup ref="group" @before-render="onLoop">
        <!-- Portal ring -->
        <TresMesh>
          <TresTorusGeometry :args="[2.1, 0.14, 32, 240]" />
          <TresMeshStandardMaterial
            :metalness="0.9"
            :roughness="0.25"
            color="#C9653D"
            :emissive="new THREE.Color('#C9653D')"
            :emissiveIntensity="0.25"
          />
        </TresMesh>

        <!-- Inner halo -->
        <TresMesh :position="[0,0,-0.1]">
          <TresRingGeometry :args="[1.35, 1.75, 128]" />
          <TresMeshBasicMaterial color="#2C7A83" :transparent="true" :opacity="0.22" />
        </TresMesh>

        <!-- Floating particles (simple points) -->
        <TresPoints :position="[0,0,-0.5]">
          <TresBufferGeometry>
            <TresBufferAttribute
  attach="attributes-position"
  :array="particlePositions"
  :itemSize="3"
/>
          </TresBufferGeometry>
          <TresPointsMaterial color="#F3EDE7" :size="0.03" :transparent="true" :opacity="0.55" />
        </TresPoints>
      </TresGroup>
    </TresCanvas>

    <!-- soft vignette / glass overlay -->
    <div class="veil" />
  </div>
</template>

<style scoped>
.stage{
  position: absolute;
  inset: 0;
  border-radius: 28px;
  overflow: hidden;
  pointer-events: none; /* important so user can click CTA */
}
.veil{
  position:absolute;
  inset:0;
  background:
    radial-gradient(900px 500px at 55% 45%, rgba(201,101,61,0.10), transparent 55%),
    radial-gradient(700px 520px at 30% 65%, rgba(44,122,131,0.08), transparent 58%),
    linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.38));
}
</style>