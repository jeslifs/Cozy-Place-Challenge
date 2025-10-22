uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;

varying float vScale;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix *  viewPosition;

    // scaling
    float scaling = sin(uTime * aScale);
    float scaleprogress = clamp(scaling, 0.3, 1.0) + 0.2;


    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vScale = scaleprogress;
}