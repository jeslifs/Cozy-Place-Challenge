uniform vec3 uColor;

varying float rayNoise;

void main()
{

    gl_FragColor = vec4(uColor, rayNoise);
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}