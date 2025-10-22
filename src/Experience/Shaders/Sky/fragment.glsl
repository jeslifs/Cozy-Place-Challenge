uniform vec3  topColor;
uniform vec3  bottomColor;
uniform float minClamp;
uniform float maxClamp;
uniform float offset;
uniform float multiplier;

varying vec3 vWorldPosition;


void main()
{
    float value = (vWorldPosition.y - offset) / multiplier;
    value = clamp(value, minClamp, maxClamp);
    gl_FragColor = vec4(mix(bottomColor, topColor, value), 1.0);
}