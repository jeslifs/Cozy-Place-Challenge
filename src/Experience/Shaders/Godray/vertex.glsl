uniform sampler2D uTexture;
uniform float uTime;
uniform float uGodrayStrength;
uniform float uGodraySpeed;
uniform float uGodrayTreshold;

varying float rayNoise;

void main()
{
    

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Normal
    vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    
    // Ray Noise
    vec2 rayUv = uv;
    rayUv.y -= uTime * uGodraySpeed;
    float noise = texture(uTexture, rayUv).r;

    // Smooth Noise
    noise *= smoothstep(0.0, 0.2, uv.y);
    // noise *= smoothstep(1.0, 0.8, uv.y);
    noise *= pow(noise, uGodrayTreshold);

    // Fresnel
    vec3 viewDirection = normalize(modelPosition.xyz - cameraPosition);
    float invertedFresnel = abs(dot(viewDirection, normal));
    invertedFresnel *= pow(invertedFresnel, 2.0);

    // Varyings
    rayNoise = noise * modelPosition.y * uGodrayStrength * invertedFresnel;

}