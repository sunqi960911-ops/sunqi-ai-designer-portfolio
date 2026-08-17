import { useEffect, useRef, useState } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import './SideRays.css'

type Origin = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

interface SideRaysProps {
  speed?: number; rayColor1?: string; rayColor2?: string; intensity?: number; spread?: number
  origin?: Origin; tilt?: number; saturation?: number; blend?: number; falloff?: number; opacity?: number; className?: string
}

const hexToRgb = (hex: string) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return match ? [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255] : [1, 1, 1]
}
const originToFlip = (origin: Origin) => {
  switch (origin) { case 'top-left': return [1, 0]; case 'bottom-right': return [0, 1]; case 'bottom-left': return [1, 1]; default: return [0, 0] }
}

export default function SideRays({ speed = 2.5, rayColor1 = '#D1FD41', rayColor2 = '#1C6158', intensity = 2, spread = 2, origin = 'top-right', tilt = 0, saturation = 1.5, blend = .75, falloff = 1.6, opacity = 1, className = '' }: SideRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const container = containerRef.current
    if (!visible || !container) return
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true })
    const gl = renderer.gl
    gl.canvas.style.cssText = 'width:100%;height:100%;display:block'
    container.replaceChildren(gl.canvas)
    const vert = 'attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}'
    const frag = `precision highp float; uniform float iTime; uniform vec2 iResolution; uniform float iSpeed; uniform vec3 iRayColor1; uniform vec3 iRayColor2; uniform float iIntensity; uniform float iSpread; uniform float iFlipX; uniform float iFlipY; uniform float iTilt; uniform float iSaturation; uniform float iBlend; uniform float iFalloff; uniform float iOpacity;
float rayStrength(vec2 source,vec2 ref,vec2 coord,float a,float b,float speed){vec2 v=coord-source;float angle=dot(normalize(v),ref);return clamp((.45+.15*sin(angle*a+iTime*speed))+(.3+.2*cos(-angle*b+iTime*speed)),0.,1.)*clamp((iResolution.x-length(v))/iResolution.x,.5,1.);}
void main(){vec2 f=gl_FragCoord.xy;if(iFlipX>.5)f.x=iResolution.x-f.x;if(iFlipY>.5)f.y=iResolution.y-f.y;vec2 coord=vec2(f.x,iResolution.y-f.y);vec2 rayPos=vec2(iResolution.x*1.1,-.5*iResolution.y);float r=iTilt*3.14159265/180.;float c=cos(r),s=sin(r);vec2 rel=coord-rayPos;vec2 t=vec2(rel.x*c-rel.y*s,rel.x*s+rel.y*c)+rayPos;float half=iSpread*.275;vec2 ref1=normalize(vec2(cos(.785398+half),sin(.785398+half)));vec2 ref2=normalize(vec2(cos(.785398-half),sin(.785398-half)));vec4 rays1=vec4(iRayColor1,1.)*rayStrength(rayPos,ref1,t,36.2214,21.11349,iSpeed);vec4 rays2=vec4(iRayColor2,1.)*rayStrength(rayPos,ref2,t,22.3991,18.0234,iSpeed*.2);vec4 color=rays1*(1.-iBlend)*.9+rays2*iBlend*.9;float d=length(f-vec2(rayPos.x,iResolution.y-rayPos.y))/iResolution.y;float bright=iIntensity*.4/pow(max(d,.001),iFalloff);color.rgb*=bright;float gray=dot(color.rgb,vec3(.299,.587,.114));color.rgb=mix(vec3(gray),color.rgb,iSaturation);color.a=max(color.r,max(color.g,color.b))*iOpacity;gl_FragColor=color;}`
    const [flipX, flipY] = originToFlip(origin)
    const uniforms = { iTime: { value: 0 }, iResolution: { value: [1, 1] }, iSpeed: { value: speed }, iRayColor1: { value: hexToRgb(rayColor1) }, iRayColor2: { value: hexToRgb(rayColor2) }, iIntensity: { value: intensity }, iSpread: { value: spread }, iFlipX: { value: flipX }, iFlipY: { value: flipY }, iTilt: { value: tilt }, iSaturation: { value: saturation }, iBlend: { value: blend }, iFalloff: { value: falloff }, iOpacity: { value: opacity } }
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex: vert, fragment: frag, uniforms }) })
    const resize = () => { const { clientWidth: width, clientHeight: height } = container; renderer.setSize(width, height); uniforms.iResolution.value = [width * renderer.dpr, height * renderer.dpr] }
    let animationFrame = 0
    const loop = (time: number) => { uniforms.iTime.value = time * .001; renderer.render({ scene: mesh }); animationFrame = requestAnimationFrame(loop) }
    resize(); window.addEventListener('resize', resize); animationFrame = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(animationFrame); window.removeEventListener('resize', resize); gl.getExtension('WEBGL_lose_context')?.loseContext(); container.replaceChildren() }
  }, [visible, speed, rayColor1, rayColor2, intensity, spread, origin, tilt, saturation, blend, falloff, opacity])
  return <div ref={containerRef} className={`side-rays-container ${className}`.trim()} />
}
