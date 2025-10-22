uniform sampler2D uMatcap;
uniform sampler2D uAlphaMap;
uniform vec3 uAmbientLight;
uniform float uAmbientLightIntensity;
uniform vec3 uDirectionalLigt1;
uniform float uDirectionalLigt1Intensity;
uniform vec3 uDirectionalLigt1Position;
uniform vec3 uDirectionalLigt2;
uniform float uDirectionalLigt2Intensity;
uniform vec3 uDirectionalLigt2Position;
uniform vec3 uCampLight;
uniform float uCampLightIntensity;
uniform vec3 uCampLightPosition;
uniform float uCampLightSpecular;
uniform float uCampLightDecay;

varying vec2 vUv;
// varying vec3 vNormal;
varying vec3 vModelPosition;


#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl


void main()
{
    vec3 viewDirection = normalize(vModelPosition - cameraPosition);

    vec2 matcapUv = vNormal.xy * 0.5 + 0.5;
    vec3 color = texture2D(uMatcap, matcapUv).rgb;

    float alpha = texture2D(uAlphaMap, vUv).r;


    // lights
    vec3 light = vec3(0.0);
    light += ambientLight(uAmbientLight, uAmbientLightIntensity);
    light += directionalLight(uDirectionalLigt1, uDirectionalLigt1Intensity, vNormal, uDirectionalLigt1Position, viewDirection);
    light += directionalLight(uDirectionalLigt2, uDirectionalLigt2Intensity, vNormal, uDirectionalLigt2Position, viewDirection);
    color *= light;

    // gl_FragColor = vec4(color, alpha);

    // gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
    csm_DiffuseColor = vec4(color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
