uniform float uTime;
uniform sampler2D uPerlinTexture;
uniform float uWindStrength;
uniform float uWindSpeed;

varying vec2 vUv;
// varying vec3 vNormal;
varying vec3 vModelPosition;

void main()
{
    // Instance Mesh
    vec4 instancePosition = instanceMatrix * vec4(position, 1.0);

    // Wind Effect
    vec4 modelPosition = modelMatrix * instancePosition;
    vec2 perlinUv = modelPosition.xz + uTime * uWindSpeed;
    float windInfluence = texture2D(uPerlinTexture, perlinUv).r - 0.5;
    float displacement = windInfluence * position.y * uWindStrength;
    csm_Position.x += displacement;
    csm_Position.z += displacement;
    vec3 newPosition = modelPosition.xyz + vec3(displacement, 0.0, displacement);
    
    vec4 newModelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * newModelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // vNormal = normalize(normalMatrix * mat3(instanceMatrix) * normal);
    vUv = uv;
    vModelPosition = instancePosition.xyz;

}



