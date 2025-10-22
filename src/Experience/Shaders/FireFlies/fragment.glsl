uniform vec3 uColor;

varying float vScale;
// varying float vStrength;


void main()
{
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    // strength = min(strength, sin(uTime) * strength);
    gl_FragColor = vec4(uColor, strength * vScale);
}