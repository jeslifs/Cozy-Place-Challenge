uniform sampler2D uPerlinTexture;
uniform float uTime;

varying float vPosition;

void main()
{

    vec3 newPosition = position;

    // noise
    float noise = texture(uPerlinTexture, uv - uTime * 0.07).r - 0.5;

    newPosition.z += sin((noise * newPosition.y));
    newPosition.x += sin((noise * newPosition.y));

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vPosition = modelPosition.y;

}